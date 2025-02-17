<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="left-header">
        <img src="./assets/logo.png" class="logo" />
        <el-button link @click="toggleMenu">
          <el-icon>
            <Fold v-if="!isCollapsed" />
          </el-icon>
        </el-button>
      </div>

      <el-input v-model="searchQuery" placeholder="Search" class="search-input" :prefix-icon="Search" />

      <div class="right-header">
        <el-icon>
          <Bell />
        </el-icon>
        <el-button v-if="!isConnected" color="#626aef" @click="connectWallet">Connect</el-button>
        <el-avatar :size="30" v-else src="./assets/avatar.png" />
      </div>
    </header>

    <div class="main-layout">
      <!-- 左侧菜单 -->
      <el-menu class="side-menu" :collapse="isCollapsed" router :default-active="$route.path">
        <el-menu-item index="/" v-if="isCollapsed" @click="toggleMenu">
          <el-icon>
            <Expand />
          </el-icon>
          <template #title>Expand</template>
        </el-menu-item>

        <el-menu-item index="/">
          <el-icon>
            <House />
          </el-icon>
          <template #title>Home</template>
        </el-menu-item>

        <el-menu-item index="/posts">
          <el-icon>
            <Document />
          </el-icon>
          <template #title>Posts</template>
        </el-menu-item>

        <el-menu-item index="/analytics">
          <el-icon>
            <DataAnalysis />
          </el-icon>
          <template #title>Analytics</template>
        </el-menu-item>

        <el-menu-item index="/analytics" class="bottom-item">
          <el-button v-if="!isConnected" color="#626aef" @click="connectWallet">Connect wallet</el-button>

          <img v-if="isConnected" src="./assets/logo.png" class="logo" />
          <template v-if="isConnected" #title>Analytics</template>
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
import { ref, onMounted } from 'vue'
import {
  Search,
  Bell,
  House,
  Document,
  DataAnalysis
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
//import { ethers } from 'ethers'; // 导入 ethers.js

interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>
  on: (event: string, callback: (...args: any[]) => void) => void
  removeListener: (event: string, callback: (...args: any[]) => void) => void
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

// 响应式数据
const isConnected = ref(false)
const isConnecting = ref(false)
const account = ref('')
const chainId = ref('')
const balance = ref('')
//const avatarUrl = ref('./assets/avatar.png') // 默认头像

interface WalletInfo {
  chainId: string
  networkVersion: string
  account: string
  balance: string
  blockNumber: string
  gasPrice: string
  transactionCount: string
  clientVersion: string
  syncingStatus: any
  peerCount: string
  protocolVersion: string
  miningStatus: any
  hashrate: string
  accounts: string[]
  permissions: any
  chainMetadata: any
}

const isCollapsed = ref(false)
const searchQuery = ref('')

const toggleMenu = () => {
  isCollapsed.value = !isCollapsed.value
}

// 连接钱包
const connectWallet = async () => {
  if (!window.ethereum) { //没有安装metamask 提醒安装
    ElMessage.error('Please install MetaMask!')
    return
  }

  try {
    isConnecting.value = true
    const accounts: string[] = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })

    if (accounts.length > 0) {
      account.value = accounts[0]
      isConnected.value = true

      console.log("account", account)
      await fetchWalletInfo()
    }
  } catch (error) {
    console.error('Connection error:', error)
    ElMessage.error('User denied account access')
  } finally {
    isConnecting.value = false
  }
}

// 获取钱包信息
const fetchWalletInfo = async () => {
  if (!window.ethereum || !account.value) return

  try {
    // 获取链ID
    chainId.value = await window.ethereum.request({ method: 'eth_chainId' })

    // 获取余额
    const balanceHex = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account.value, 'latest']
    })
    balance.value = (parseInt(balanceHex, 16) / 1e18).toFixed(4)

    // 可以继续添加其他信息获取逻辑...
    console.log("chainId", chainId)
    console.log("balanceHex", balanceHex)
    console.log("balance", balance)

  } catch (error) {
    console.error('Fetch info error:', error)
    ElMessage.error('Failed to get wallet information')
  }
}

// 监听账户和网络变化
const setupListeners = () => {
  if (!window.ethereum) return

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      resetWallet()
    } else {
      account.value = accounts[0]
      fetchWalletInfo()
    }
  }

  const handleChainChanged = () => {
    fetchWalletInfo()
    window.location.reload() // 推荐刷新页面来处理网络变更
  }

  window.ethereum.on('accountsChanged', handleAccountsChanged)
  window.ethereum.on('chainChanged', handleChainChanged)

  // 清理监听器
  onBeforeUnmount(() => {
    window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
    window.ethereum?.removeListener('chainChanged', handleChainChanged)
  })
}

// 重置钱包状态
const resetWallet = () => {
  isConnected.value = false
  account.value = ''
  chainId.value = ''
  balance.value = ''
}

// 地址缩写
const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.left-header {
  display: flex;
  align-items: center;
  gap: 9rem;
  flex: 1;
}

.logo {
  height: 36px;
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
  display: flex;
  flex-direction: column;
  /* 垂直排列菜单项 */
  height: 98%;
  /* 确保菜单容器占满父容器 */
  width: 200px;
  border-right: 1px solid #eee;
  transition: width 0.3s;

  &:not(.el-menu--collapse) {
    width: 200px;
  }

  &.el-menu--collapse {
    width: 64px;
  }

  .bottom-item {
    margin-top: auto;
  }
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9fafb;
}

.el-menu-item {
  display: flex;
  align-items: center;
  height: 48px;
}
</style>
