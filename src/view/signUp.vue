<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#">
          <img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
          />
        </a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" @submit.prevent="signUp">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            v-model="account"
            placeholder="請輸入 email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            v-model="nickname"
            placeholder="請輸入您的暱稱"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            v-model="password"
            placeholder="請輸入密碼"
            required
          />
          <label class="formControls_label" for="confirmPwd"
            >再次輸入密碼</label
          >
          <input
            class="formControls_input"
            type="password"
            name="confirmPwd"
            id="confirmPwd"
            v-model="confirmPassword"
            placeholder="請再次輸入密碼"
            required
          />
          <input
            class="formControls_btnSubmit"
            type="submit"
            value="註冊帳號"
          />
          <a class="formControls_btnLink" href="/">登入</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const url = 'https://todolist-api.hexschool.io'

const account = ref('')
const password = ref('')
const confirmPassword = ref('')
const nickname = ref('')

const signUp = async () => {
  if (password.value !== confirmPassword.value) {
    alert('密碼不一致，請重新輸入。')
    return
  }

  try {
    const response = await axios.post(`${url}/users/sign_up`, {
      email: account.value,
      password: password.value,
      nickname: nickname.value,
    })
    alert('註冊成功')
    window.location.href = '#'
  } catch (error) {
    alert('註冊失敗: ' + error.response.data.message)
  }
}
</script>

<style></style>
