<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <!-- <img src="https://vuematerial.io/assets/logo-color.png"> -->
        <div class="md-title">Want ETL Login</div>
      </div>

      <div class="form">
        <md-field>
          <label>User ID</label>
          <md-input v-model="login.userId" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-right">
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loading: false,
      login: {
        userId: "",
        password: ""
      }
    };
  },
  methods: {
    auth() {
      this.loading = true;
      this.$http({
        method: "post",
        url: "login/passwordLogin",
        data: JSON.stringify({
          userId: this.login.userId,
          password: this.login.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          const respData = resp.data;
          if (respData.returnCode === 1) {
            // 請求成功
            const results = respData.data;
            localStorage.setItem("authorization", respData.data.authorization);
            localStorage.setItem("userId", respData.data.userId);
            localStorage.setItem("userName", respData.data.userName);
            this.$router.push({ name: "Home" });
          } else {
            // 請求失敗
            this.alert.content = "取得紀錄詳情失敗";
            this.alert.visible = true;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
.centered-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .title {
    margin-bottom: 30px;
    text-align: center;

    img {
      max-width: 80px;
      margin-bottom: 16px;
    }
  }

  .actions {
    .md-button {
      margin: 0;
    }
  }

  .form {
    margin-bottom: 60px;
  }

  .background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }

  .md-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 400px;
    padding: 40px;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>