<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="left-header">
        <img src="./assets/logo.png" class="logo" />
        <el-button link @click="toggleMenu">
          <el-icon><Menu /></el-icon>
        </el-button>
      </div>
      
      <el-input
        v-model="searchQuery"
        placeholder="Search"
        class="search-input"
        :prefix-icon="Search"
      />
      
      <div class="right-header">
        <el-icon><Bell /></el-icon>
        <el-avatar :size="30" src="./assets/avatar.png" />
      </div>
    </header>

    <div class="main-layout">
      <!-- 左侧菜单 -->
      <el-menu
        class="side-menu"
        :collapse="isCollapsed"
        router
        :default-active="$route.path"
      >
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <template #title>Home</template>
        </el-menu-item>
        
        <el-menu-item index="/posts">
          <el-icon><Document /></el-icon>
          <template #title>Posts</template>
        </el-menu-item>
        
        <el-menu-item index="/analytics">
          <el-icon><DataAnalysis /></el-icon>
          <template #title>Analytics</template>
        </el-menu-item>
      </el-menu>

      <!-- 主内容区 -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Menu,
  Search,
  Bell,
  House,
  Document,
  DataAnalysis
} from '@element-plus/icons-vue'

const isCollapsed = ref(false)
const searchQuery = ref('')

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.left-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.logo {
  height: 30px;
}

.search-input {
  flex: 2;
  max-width: 600px;
  margin: 0 2rem;
}

.right-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.side-menu {
  width: 200px;
  border-right: 1px solid #eee;
  transition: width 0.3s;
  
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  
  &.el-menu--collapse {
    width: 64px;
  }
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.el-menu-item {
  display: flex;
  align-items: center;
  height: 48px;
}
</style>