<template>
  <section>
    <div id="loginPage" class="bg-yellow">
      <div class="conatiner loginPage vhContainer">
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
          <form class="formControls" @submit.prevent="login">
            <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
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
            <span>此欄位不可留空</span>
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
            <input class="formControls_btnSubmit" type="submit" value="登入" />
            <a class="formControls_btnLink" href="/signUp">註冊帳號</a>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie' // 引入 js-cookie

const url = 'https://todolist-api.hexschool.io'

const account = ref('')
const password = ref('')
const isLogin = ref(false)
const token = ref('')

const login = async () => {
  try {
    const response = await axios.post(`${url}/users/sign_in`, {
      email: account.value,
      password: password.value,
    })
    token.value = response.data.token
    Cookies.set('token', token.value, {
      secure: true,
      sameSite: 'Strict',
      expires: 7,
    })
    alert('登入成功')
    account.value = ''
    password.value = ''
    isLogin.value = true
    window.location.href = '/todolist'
  } catch (error) {
    alert('登入失敗: ' + error.response.data.message)
  }
}
</script>

<style></style>
