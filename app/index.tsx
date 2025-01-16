// app/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 你原本的元件
import SwipeableCard from './components/SwipeableCard';
import Profile from './components/Profile';

export default function App() {
  // 透過 state 來記錄目前的「頁面選擇」
  const [activeTab, setActiveTab] = useState<'profile' | 'cards'>('cards');

  return (
    <SafeAreaView style={styles.container}>
      {/* 主要內容區塊：根據 activeTab 切換畫面 */}
      <View style={styles.content}>
        {activeTab === 'profile' ? (
          <Profile />
        ) : (
          <SwipeableCard />
        )}
      </View>

      {/* 底部導覽列 */}
      <View style={styles.bottomTab}>
        {/* Profile Tab */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('profile')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'profile' && styles.activeTabText,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>

        {/* Cards Tab */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('cards')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'cards' && styles.activeTabText,
            ]}
          >
            Cards
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// 樣式設定
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // 主要內容
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 底部導覽列容器
  bottomTab: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  // 每個 tab 按鈕
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 按鈕文字
  tabButtonText: {
    fontSize: 16,
    color: '#666',
  },
  // 被選取時的文字樣式
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
});
