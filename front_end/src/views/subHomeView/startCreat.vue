<template>
  <div class="home_page">
    <div class="title_text">Let's start creating!</div>

    <el-input v-model="searchQuery" placeholder="What do you want to create today?" class="search-input">
      <template #prepend>
        <el-button :icon="Search" />
      </template>
      <template #append>
        <el-button @click="goChat" :icon="Promotion" />
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import {
  Search,
  Bell,
  House,
  Document,
  DataAnalysis
} from '@element-plus/icons-vue'
import ChatMessage from '@/components/ChatMessage.vue'
import { Promotion } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const title = 'The Future of Artificial Intelligence'
const description = `Artificial Intelligence has become an integral part of our daily lives...`

const emit = defineEmits<{
  (e: 'updateSearchQuery', searchQuery: string): void;
}>()

const messages = ref([
  { role: 'ai', content: 'How can I assist you today?' }
])
const newMessage = ref('')
const postContent = ref('')

const searchQuery = ref('')

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    role: 'user',
    content: newMessage.value
  })

  // 模拟AI回复
  setTimeout(() => {
    messages.value.push({
      role: 'ai',
      content: 'This is a sample response from AI...'
    })
  }, 1000)

  newMessage.value = ''
}

const goChat = () => {
  if (!searchQuery.value) {
    ElMessage.error('Please enter the content you want to create...')
    return
  }
  emit('updateSearchQuery', searchQuery.value)
  console.log(999)
}
</script>

<style lang="scss" scoped>
.home_page {
  width: 100%;
  /*   background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 95px;

  .title_text {
    margin-bottom: 25px;
    font-size: 34px;
    color: #8E6FF7;
  }

  .search-input {
    width: 80%;
  }
}
</style>
