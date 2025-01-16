import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Animated, 
  PanResponder,
  Dimensions,
  StyleSheet 
} from 'react-native';

interface Profile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  photo: string;
  distance: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const DUMMY_PROFILES: Profile[] = [
  {
    id: '1',
    name: '馬卡巴卡瓦卡',
    age: 20,
    occupation: '學生',
    photo: require('../../assets/images/hachou.jpg'),
    distance: 2.3
  },
  {
    id: '2',
    name: 'Un醬',
    age: 25,
    occupation: '女僕',
    photo: require('../../assets/images/un_se0n.jpg'),
    distance: 3.1
  },
  {
    id: '3',
    name: 'llblue',
    age: 20,
    occupation: '學生',
    photo: require('../../assets/images/llblue.jpeg'),
    distance: 230
  }
];

export default function SwipeableCard() {
  const [profiles] = useState<Profile[]>(DUMMY_PROFILES);
  const position = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else {
        resetPosition();
      }
    }
  });

  const forceSwipe = (direction: 'right' | 'left') => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left') => {
    const item = profiles[currentIndex];
    direction === 'right' ? console.log('Liked', item) : console.log('Passed', item);
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(currentIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
  
    return {
      transform: [...position.getTranslateTransform(), { rotate }],
    };
  };

  const renderCards = () => {
    if (currentIndex >= profiles.length) {
      return (
        <View style={[styles.cardStyle, styles.noMoreCards]}>
          <Text style={styles.noMoreCardsText}>No more profiles!</Text>
        </View>
      );
    }

    return profiles.map((profile, index) => {
      if (index < currentIndex) return null;

      if (index === currentIndex) {
        return (
          <Animated.View
            key={profile.id}
            style={[styles.cardStyle, getCardStyle()]}
            {...panResponder.panHandlers}
          >
            <Image 
              source={
                typeof profile.photo === 'number'
                ? profile.photo // 本地圖片，直接使用 require 的結果
                : { uri: profile.photo } // 遠端圖片
              }
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profile.name}, {profile.age}</Text>
              <Text style={styles.occupation}>{profile.occupation}</Text>
              <Text style={styles.distance}>{profile.distance} km away</Text>
            </View>
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={profile.id}
          style={[
            styles.cardStyle,
            {
              top: 10 * (index - currentIndex),
              transform: [{ scale: 0.95 }]
            }
          ]}
        >
          <Image 
            source={{ uri: profile.photo }} 
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{profile.name}, {profile.age}</Text>
            <Text style={styles.occupation}>{profile.occupation}</Text>
            <Text style={styles.distance}>{profile.distance} km away</Text>
          </View>
        </Animated.View>
      );
    }).reverse();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {renderCards()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.7,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    //left: (SCREEN_WIDTH - (SCREEN_WIDTH * 0.9)) / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileInfo: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  occupation: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  distance: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  noMoreCards: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noMoreCardsText: {
    fontSize: 18,
    color: '#999',
  }
});