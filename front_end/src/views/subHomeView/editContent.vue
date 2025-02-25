<template>
  <div class="home-container">
    <!-- 左侧内容 -->
    <div class="left-panel">
      <!--       <h2 class="title">{{ title }}</h2> -->
      <el-input v-model="postTitle" :rows="10" placeholder="Write your blog post here..." />
      <p class="description">{{ description }}</p>
      <!--       <el-input v-model="postContent" type="textarea" :rows="10" placeholder="Write your blog post here..." /> -->

      <!--      <TinyMCEEditor v-model="postContent" /> -->
      <TEditor v-model="postContent" ref="editorRef" />
    </div>

    <!-- 右侧聊天界面 -->
    <div class="right-panel">
      <div class="chat-messages">
        <ChatMessage v-for="(msg, index) in messages" :key="index" :message="msg" :is-user="msg.role === 'user'"
          @onClickContent="onClickContent" />
      </div>

      <div class="chat-input">
        <el-input v-model="newMessage" placeholder="Type your message..." @keyup.enter="sendMessage">
          <template #append>
            <el-button @click="sendMessage">
              <el-icon>
                <Promotion />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, defineEmits, watch, nextTick } from 'vue'
import { ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'
import { Promotion } from '@element-plus/icons-vue'
/* import TinyMCEEditor from '../../components/TinyMCEEditor.vue' */
import TEditor from "@/components/TEditor.vue";
const emit = defineEmits<{
  (e: 'updateSearchQuery', searchQuery: string): void;
}>()

// 定义 props 接收的数据类型
const props = defineProps<{
  concent: string, // 这里定义 concent 作为一个字符串类型的 prop
  userInput: string, // 这里定义 concent 作为一个字符串类型的 prop
}>()

const title = 'The Future of Artificial Intelligence'
const description = `Artificial Intelligence has become an integral part of our daily lives...`

// 监听 props.concent 的变化
watch(() => props.concent, (newConcent) => {
  messages.push({ role: 'AI Assistant', content: newConcent })
})

const messages = reactive([
  { role: 'user', content: props.userInput },
  { role: 'AI Assistant', content: props.concent },
])
const newMessage = ref('')
const postContent = ref('222')
const postTitle = ref('')
const editorRef = ref<any>(null);

const onClickContent = (content: string) => {
  postContent.value = content;  // 更新响应式数据
  editorRef.value.handleSetContent(content);
  /*   nextTick(() => {
      const editor = getEditorInstance();
      editor.update();  // 如果有更新的方法，强制更新
    }); */
  /*   console.log('Content clicked:', content); */
  // Here you can do anything with the content passed from the child
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.push({
    role: 'user',
    content: newMessage.value
  })

  emit('updateSearchQuery', newMessage.value)

  /*   // 模拟AI回复
    setTimeout(() => {
      messages.push({
        role: 'AI Assistant',
        content: props.concent
      })
    }, 1000) */

  newMessage.value = ''
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
