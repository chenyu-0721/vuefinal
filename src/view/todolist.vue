<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"><span>王小明的代辦</span></a>
        </li>
        <li><a href="/" @click="logout">登出</a></li>
      </ul>
    </nav>
    <div class="container todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" v-model="newTodo" placeholder="請輸入待辦事項" />
          <a
            href="#"
            @click.prevent="addTodo"
            class="d-flex justify-content-center align-items-center"
          >
            <span class="material-symbols-outlined"> add </span>
          </a>
        </div>
        <div v-if="filteredTodos.length === 0" class="text-center pb-2">
          <p class="fs-5 mt-5">目前尚無待辦事項</p>
          <img
            class="img-fluid"
            src="https://firebasestorage.googleapis.com/v0/b/homework2-4f72e.appspot.com/o/empty%201.png?alt=media&token=fc6551f6-a0f7-4b88-8a28-765e2eb83925"
            alt=""
          />
        </div>
        <div v-else class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a
                href="#"
                :class="{ active: currentTab === 'all' }"
                @click.prevent="currentTab = 'all'"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: currentTab === 'pending' }"
                @click.prevent="currentTab = 'pending'"
                >待完成</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: currentTab === 'completed' }"
                @click.prevent="currentTab = 'completed'"
                >已完成</a
              >
            </li>
          </ul>

          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="todo in filteredTodos" :key="todo.id">
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    v-model="todo.status"
                    @change="updateTodoStatus(todo)"
                  />
                  <span :class="{ completed: todo.status }">
                    <span v-if="!todo.isEditing">{{ todo.content }}</span>
                    <input
                      v-else
                      v-model="todo.content"
                      @blur="toggleEdit(todo)"
                    />
                  </span>
                </label>
                <a href="#" @click.prevent="removeTodo(todo.id)">
                  <span class="material-symbols-outlined"> close </span>
                </a>
                <a href="#" @click.prevent="toggleEdit(todo)">
                  <span class="material-symbols-outlined"> edit </span>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ pendingCount }} 個待完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const token = ref(Cookies.get('token'))
const url = 'https://todolist-api.hexschool.io'

const todoList = ref([])
const newTodo = ref('')
const currentTab = ref('all')

const getTodo = async () => {
  try {
    const response = await axios.get(`${url}/todos`, {
      headers: {
        Authorization: token.value,
      },
    })
    todoList.value = response.data.data.map((todo) => ({
      ...todo,
      isEditing: false,
    }))
  } catch (error) {
    alert('取得待辦事項失敗:' + error.message)
  }
}

const addTodo = async () => {
  try {
    const todo = { content: newTodo.value }
    const response = await axios.post(`${url}/todos`, todo, {
      headers: {
        Authorization: token.value,
      },
    })

    todoList.value.push(response.data.newTodo)
    alert('新增成功')
    newTodo.value = ''
    getTodo()
  } catch (error) {
    alert('新增失敗:' + error.message)
  }
}

const removeTodo = async (id) => {
  try {
    await axios.delete(`${url}/todos/${id}`, {
      headers: {
        Authorization: token.value,
      },
    })

    todoList.value = todoList.value.filter((todo) => todo.id !== id)
    alert('刪除成功')
    getTodo()
  } catch (error) {
    alert('刪除失敗:' + error.message)
  }
}

const toggleEdit = (todo) => {
  if (todo.isEditing) {
    updateTodo(todo.id)
  } else {
    todo.isEditing = true
  }
}

const updateTodo = async (id) => {
  try {
    const todo = todoList.value.find((todo) => todo.id === id)
    await axios.put(`${url}/todos/${id}`, todo, {
      headers: {
        Authorization: token.value,
      },
    })

    todo.isEditing = false
    alert('編輯成功')
    getTodo()
  } catch (error) {
    alert('編輯失敗:' + error.message)
  }
}

const updateTodoStatus = async (todo) => {
  try {
    await axios.patch(
      `${url}/todos/${todo.id}/toggle`,
      {},
      {
        headers: {
          Authorization: token.value,
        },
      }
    )
    todo.status = !todo.status
    alert('更新成功')
    getTodo()
  } catch (error) {
    alert('更新失敗: ' + error.message)
  }
}

const filteredTodos = computed(() => {
  if (currentTab.value === 'all') {
    return todoList.value
  } else if (currentTab.value === 'pending') {
    return todoList.value.filter((todo) => !todo.status)
  } else if (currentTab.value === 'completed') {
    return todoList.value.filter((todo) => todo.status)
  }
  return todoList.value
})

const pendingCount = computed(() => {
  return todoList.value.filter((todo) => !todo.status).length
})

onMounted(() => {
  getTodo()
})

const logout = () => {
  Cookies.remove('token')
  window.location.href = '/'
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #cccccc;
}
</style>
