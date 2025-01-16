import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      {/* 背景區塊 */}
      <ImageBackground
        source={{
          uri: 'https://github.com/choulinc/Musicgram/blob/main/assets/bg.JPEG?raw=true',
        }}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        {/* 大頭貼圓形區塊 */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: 'https://github.com/choulinc/Musicgram/blob/main/assets/profilepic.jpg?raw=true',
            }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
      </ImageBackground>

      {/* 用戶基本資訊 */}
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>User, 25</Text>
        <Text style={styles.bio}>
          自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹
        </Text>

        {/* 操作按鈕區塊 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>聊天</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.buttonText}>追蹤</Text>
          </TouchableOpacity>
        </View>

        {/* 歌曲資訊區塊 */}
        <View style={styles.musicContainer}>
          <Image
            source={{
              uri: 'https://github.com/choulinc/Musicgram/blob/main/assets/jcole.jpg?raw=true',
            }}
            style={styles.recordImage}
          />
          <View style={styles.musicInfo}>
            <Text style={styles.musicTitle}>No Role Modelz</Text>
            <Text style={styles.musicArtist}>J. Cole</Text>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonText}>▶</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 喜歡的創作者區塊 */}
        <View style={styles.favoritesContainer}>
          <Text style={styles.favoritesTitle}>喜歡的創作者</Text>
          <View style={styles.favoritesList}>
            <Image
              source={{ uri: 'https://github.com/choulinc/Musicgram/blob/main/assets/band1.jpeg?raw=true' }}
              style={styles.favoritesAvatar}
            />
            <Image
              source={{ uri: 'https://github.com/choulinc/Musicgram/blob/main/assets/singer.jpeg?raw=true' }}
              style={styles.favoritesAvatar}
            />
            <Image
              source={{ uri: 'https://github.com/choulinc/Musicgram/blob/main/assets/band3.png?raw=true' }}
              style={styles.favoritesAvatar}
            />
            <Image
              source={{ uri: 'https://github.com/choulinc/Musicgram/blob/main/assets/band2.JPG?raw=true' }}
              style={styles.favoritesAvatar}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /* 整體可捲動容器 */
  container: {
    flex: 1,
    backgroundColor: '#eaf9fa',
  },
  /* 上方背景區塊 */
  headerBackground: {
    width: '100%',
    height: 250,
    // 記得加上 position: 'relative' 才能讓子元素絕對定位
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  /* 大頭貼外層容器 */
  profileImageContainer: {
    // 改為絕對定位，並向右側偏移 15%
    position: 'absolute',
    right: '15%',
    bottom: -50, // 往下偏移，蓋住背景一些
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* 大頭貼樣式 */
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  /* 主要資訊區塊 */
  infoContainer: {
    // 注意 marginTop 不要太大，讓大頭貼自然疊在上面
    marginTop: 70, 
    // 讓內文靠左
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  /* 用戶名稱 */
  userName: {
    fontSize: 28, // 放大字體
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  /* 個人簡介 */
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left', // 靠左
    marginBottom: 12,
    lineHeight: 20,
  },
  /* 按鈕列容器 */
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  /* 按鈕樣式 */
  chatButton: {
    backgroundColor: '#c8f5c8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  /* 按鈕文字 */
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  /* 音樂資訊容器 */
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  /* 唱片圖片 */
  recordImage: {
    width: 90,
    height: 90,
    marginRight: 20,
  },
  /* 歌曲文字/播放按鈕容器 */
  musicInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  /* 歌曲標題 */
  musicTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  /* 歌手名稱 */
  musicArtist: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  /* 播放按鈕 */
  playButton: {
    backgroundColor: '#c8f5c8',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    fontSize: 18,
    color: '#333',
  },
  /* 喜歡的創作者區塊 */
  favoritesContainer: {
    width: '100%',
    backgroundColor: '#b6e0ff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 40,
  },
  favoritesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  /* 創作者頭像 */
  favoritesList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  favoritesAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
