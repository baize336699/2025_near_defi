<template>
  <div :class="['message', isUser ? 'user' : 'ai']">
    <el-avatar :src="avatarUrl" size="small" />
    <div class="content">
      {{ message.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({
  message: { type: Object, required: true },
  isUser: { type: Boolean, default: false }
})

// 使用 toRefs 解构保持响应性
const { isUser } = toRefs(props)

const avatarUrl = computed(() => 
  isUser.value ? './assets/user-avatar.png' : './assets/ai-avatar.png'
)
</script>

<style scoped>
.message {
  display: flex;
  gap: 1rem;
  align-items: start;
  max-width: 80%;
}

.user {
  flex-direction: row-reverse;
  margin-left: auto;
}

.content {
  padding: 0.8rem;
  border-radius: 8px;
  background: #f5f7fa;
}

.user .content {
  background: #409eff;
  color: white;
}
</style>