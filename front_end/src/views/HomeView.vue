<template>
  <div class="home-container">
    <startCreat v-if="page == 1" @updateSearchQuery="handleSearchQueryUpdate" />

    <editContent :concent="concent" @updateSearchQuery="handleSearchQueryUpdate" :userInput="userInput"
      v-if="page == 2" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'
import { Promotion } from '@element-plus/icons-vue'
import startCreat from './subHomeView/startCreat.vue'
import editContent from './subHomeView/editContent.vue'

const title = 'The Future of Artificial Intelligence'
const description = `Artificial Intelligence has become an integral part of our daily lives...`

const messages = ref([
  { role: 'ai', content: 'How can I assist you today?' }
])
const userInput = ref('')
const concent = ref('')
const page = ref(1)

const handleSearchQueryUpdate = async (newQuery: string) => {
  userInput.value = newQuery
  console.log("newQuery", newQuery)

  const prompt = `请根据关键词"${newQuery}"写一篇高质量的文章。`

  try {
    // 安全警告：实际开发中应通过后端调用，避免暴露API Key
    const apiKey = import.meta.env.VITE_API_KEY; // 从环境变量获取（后端方案）
    const response = await fetch('https://api.055ai.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V3",
        messages: [{ role: "user", content: prompt }],
      }),
    })

    const data = await response.json();
    page.value = 2
    concent.value = data.choices?.[0]?.message?.content || "No response";

    /*     return data.choices?.[0]?.message?.content || "No response"; */
  } catch (error) {
    console.error("Error:", error);
    return "Error occurred, please try again.";
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100%;
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
