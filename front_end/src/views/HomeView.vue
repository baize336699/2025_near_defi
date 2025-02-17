<template>
  <div class="home-container">
    <startCreat @updateSearchQuery="handleSearchQueryUpdate" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'
import { Promotion } from '@element-plus/icons-vue'
import startCreat from './subHomeView/startCreat.vue'

const title = 'The Future of Artificial Intelligence'
const description = `Artificial Intelligence has become an integral part of our daily lives...`

const messages = ref([
  { role: 'ai', content: 'How can I assist you today?' }
])
const newMessage = ref('')
const article = ref('')

const handleSearchQueryUpdate = async (newQuery: string) => {
  console.log("newQuery", newQuery)

  const prompt = `请根据关键词 "${newQuery}" 写一篇高质量的文章。`

  try {
    // 安全警告：实际开发中应通过后端调用，避免暴露API Key
    const apiKey = '' // 从环境变量获取（后端方案）
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // 确保使用可用模型
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    const data = await response.json()
    if (!response.ok) {
      const errorMessage = data.error?.message || '未知错误'
      throw new Error(`API 请求失败：${errorMessage}`)
    }

    // 修正响应内容提取路径
    const content = data.choices[0]?.message?.content
    if (!content) throw new Error('未获取到有效内容')

    article.value = content.trim()
    console.log("生成内容：", article.value)
  } catch (error) {
    console.error('生成文章失败：', error)
    article.value = `生成失败：${error.message}`
  }
  return
}
</script>

<style scoped>
.home-container {
  display: flex;
  height: 90%;
  gap: 2rem;
  /*   border: 1px solid gray; */
  padding: 15px
}

.left-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #eee;
  padding-left: 1rem;
  background-color: white;
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
