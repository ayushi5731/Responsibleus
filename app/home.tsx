// src/screens/Home.tsx

import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

// News item type
interface NewsItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  likes: string;
  comments: string;
  image: any;
}

// Sample data
const ALL_DATA: NewsItem[] = [
  {
    id: '1',
    category: 'Latest News',
    title: 'Clean cloud act targets AI, cryptomining emissions with new standards',
    summary:
      'The Clean Cloud Act, introduced by U.S. Senators Whitehouse and Fetterman, proposes federal emissions standards for AI and cryptomining operations.',
    author: 'By Mariam Merchant',
    date: 'Jun 7, 2025',
    likes: '1.6K',
    comments: '15',
    image: require('../assets/images/home1.png'),
  },
  {
    id: '2',
    category: 'Popular posts',
    title: 'Reducing carbon footprint: Role of sustainable interior in green office fitouts',
    summary:
      'An interior designer explores sustainable materials and layouts to minimize environmental impacts in modern offices.',
    author: 'By Architect Rebecca',
    date: 'Dec 5, 2024',
    likes: '980',
    comments: '8',
    image: require('../assets/images/home2.png'),
  },
  {
    id: '3',
    category: 'Investigations',
    title: 'Mahindra expands electric vehicle network to Tier 2 & Tier 3 cities in India',
    summary:
      'Mahindra is expanding its EV charging infrastructure to rural and semi-urban regions, aiming for sustainable mobility.',
    author: 'By Industry Insider',
    date: 'Jan 15, 2025',
    likes: '2.3K',
    comments: '22',
    image: require('../assets/images/home3.png'),
  },
];

// Available categories
const CATEGORIES = ['Latest News', 'Popular posts', 'Investigations'];

// Card component
const Card: React.FC<{ item: NewsItem }> = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardText}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.date}>{item.date}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statsItem}>
            <Icon name="heart" size={16} color="#999" />
            <Text style={styles.statsText}>{item.likes}</Text>
          </View>
          <View style={styles.statsItem}>
            <Icon name="message-square" size={16} color="#999" />
            <Text style={styles.statsText}>{item.comments}</Text>
          </View>
          <TouchableOpacity style={styles.statsItem}>
            <Icon name="share-2" size={16} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.statsItem}>
            <Icon name="bookmark" size={16} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.statsItem}>
            <Icon name="more-horizontal" size={16} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <Image source={item.image} style={styles.thumbnail} />
  </View>
);

// Home screen
const Home: React.FC = () => {
  const [selectedCategory] = useState<string>('Latest News');

  // Show welcome alert after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      Alert.alert(
        'Welcome 👋',
        'Responsible living, informed by stories that matter.',
        [
          {
            text: 'ResponsibleUs',
            onPress: () => {
              /* simply dismiss */
            },
          },
        ],
        { cancelable: false }
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Icon name="menu" size={24} color="#333" />
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="search" size={20} color="#333" />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://placekitten.com/40/40' }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* CATEGORY TABS */}
      <View style={styles.categoriesRow}>
        <TouchableOpacity style={styles.plusIcon}>
          <Icon name="plus" size={20} color="#333" />
        </TouchableOpacity>
        {CATEGORIES.map(cat => (
          <TouchableOpacity key={cat} style={styles.categoryTab}>
            <Text
              style={[
                styles.categoryTabText,
                cat === 'Latest News' && styles.categoryTabTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* NEWS LIST */}
      <FlatList
        data={ALL_DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Card item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home" size={24} color="#63CBB2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="archive" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="search" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="user" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 40 : 30, // pushed down from top
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 16,
    color: '#63CBB2',
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { marginRight: 12 },
  avatar: { width: 32, height: 32, borderRadius: 16 },

  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  plusIcon: {
    marginRight: 12,
  },
  categoryTab: {
    marginRight: 16,
  },
  categoryTabText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#63CBB2',
  },

  listContent: { padding: 16, paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
    padding: 12,
  },
  cardText: { flex: 1 },
  category: { fontSize: 12, color: '#2D9CDB', fontWeight: '500' },
  title: { fontSize: 16, color: '#333', fontWeight: '600', marginVertical: 6 },
  summary: { fontSize: 14, color: '#555', marginBottom: 6 },
  author: { fontSize: 12, color: '#999', marginBottom: 4 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 12, color: '#999' },
  statsRow: { flexDirection: 'row' },
  statsItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  statsText: { fontSize: 12, color: '#999', marginLeft: 4 },
  thumbnail: {
    width: width * 0.28,
    height: width * 0.28 * 0.7,
    resizeMode: 'cover',
  },

  tabBar: {
    position: 'absolute',
    bottom: 10, // lifted up a bit
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
