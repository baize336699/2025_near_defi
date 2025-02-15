<template>
  <div class="home-container">
    <!-- 左侧内容 -->
    <div class="left-panel">
      <h2 class="title">{{ title }}</h2>
      <p class="description">{{ description }}</p>
      <el-input
        v-model="postContent"
        type="textarea"
        :rows="10"
        placeholder="Write your blog post here..."
      />
    </div>

    <!-- 右侧聊天界面 -->
    <div class="right-panel">
      <div class="chat-messages">
        <ChatMessage
          v-for="(msg, index) in messages"
          :key="index"
          :message="msg"
          :is-user="msg.role === 'user'"
        />
      </div>
      
      <div class="chat-input">
        <el-input
          v-model="newMessage"
          placeholder="Type your message..."
          @keyup.enter="sendMessage"
        >
          <template #append>
            <el-button @click="sendMessage">
              <el-icon><Promotion /></el-icon>
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'
import { Promotion } from '@element-plus/icons-vue'

const title = 'The Future of Artificial Intelligence'
const description = `Artificial Intelligence has become an integral part of our daily lives...`

const messages = ref([
  { role: 'ai', content: 'How can I assist you today?' }
])
const newMessage = ref('')
const postContent = ref('')

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
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100%;
  gap: 2rem;
}

.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #eee;
  padding-left: 1rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-input {
  margin-top: auto;
  padding: 1rem;
}
</style>