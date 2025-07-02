// src/screens/Home.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

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

const ALL_DATA: NewsItem[] = [
  {
    id: '1',
    category: 'Latest News',
    title: 'Clean cloud act targets AI, cryptomining emissions with new standards',
    summary: 'The Clean Cloud Act, introduced by U.S. Senators Whitehouse and Fetterman, proposes federal emissions standards for AI and cryptomining operations.',
    author: 'By Mariam Merchant',
    date: 'Jun 7, 2025',
    likes: '1.6K',
    comments: '15',
    image: require('../assets/images/home1.png'),
  },
  {
    id: '2',
    category: 'Latest News',
    title: 'Reducing carbon footprint: Role of sustainable interior in green office fitouts',
    summary: 'An interior designer explores sustainable materials and layouts to minimize environmental impacts in modern offices.',
    author: 'By Architect Rebecca',
    date: 'Dec 5, 2024',
    likes: '980',
    comments: '8',
    image: require('../assets/images/home2.png'),
  },
  {
    id: '3',
    category: 'Latest News',
    title: 'Mahindra expands electric vehicle network to Tier 2 & Tier 3 cities in India',
    summary: 'Mahindra is expanding its EV charging infrastructure to rural and semi-urban regions, aiming for sustainable mobility.',
    author: 'By Industry Insider',
    date: 'Jan 15, 2025',
    likes: '2.3K',
    comments: '22',
    image: require('../assets/images/home3.png'),
  },
];

const CATEGORIES = ['Latest News', 'Popular posts', 'Investigations'];

export default function Home() {
  // Drawer & avatar dropdown
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  // Login modal
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);

  // Step 1: phone & OTP
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

  // Step 3: details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');

  // Logged‑in user
  const [user, setUser] = useState<{ initial: string; bgColor: string } | null>(null);

  // Animations & refs
  const drawerAnim = useRef(new Animated.Value(-width * 0.7)).current;
  const inputs = useRef<Array<TextInput | null>>([]);

  // Slide drawer
  useEffect(() => {
    Animated.timing(drawerAnim, {
      toValue: drawerOpen ? 0 : -width * 0.7,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [drawerOpen]);

  // Reset step‑3 fields when modal opens
  useEffect(() => {
    if (showVerifyModal) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setUsername('');
      setEmailError('');
    }
  }, [showVerifyModal]);

  // Welcome alert
  useEffect(() => {
    const id = setTimeout(() => {
      Alert.alert('Welcome 👋', 'Responsible living, informed by stories that matter.');
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  // Helper: close overlays
  const closeOverlays = () => {
    setDrawerOpen(false);
    setAvatarMenuOpen(false);
  };

  // Open login modal
  const onSignInPress = () => {
    setAvatarMenuOpen(false);
    setPhone('');
    setPhoneError('');
    setOtp(['', '', '', '', '', '']);
    setModalStep(1);
    setShowVerifyModal(true);
  };

  // Send OTP
  const sendOTP = () => {
    if (phone.length !== 10) {
      setPhoneError('Mobile number must have 10 digits');
      return;
    }
    setPhoneError('');
    Alert.alert(
      'OTP Sent',
      `6-digit OTP sent to +91 ${phone}`,
      [{ text: 'OK', onPress: () => setModalStep(2) }],
      { cancelable: false }
    );
  };

  // Move focus among OTP inputs
  const focusNext = (i: number, v: string) => {
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };

  // Verify OTP
  const verifyOTP = () => {
    if (otp.join('') !== '123456') {
      Alert.alert('Oops', 'That code is incorrect.');
      return;
    }
    setModalStep(3);
  };

  // Email validation
  const validateEmail = (e: string) => /^\S+@\S+\.\S+$/.test(e);
  const isFormValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    username.trim() !== '' &&
    validateEmail(email);

  // Generate a pastel random color
  const randomColor = () => {
    const r = Math.floor(Math.random() * 128 + 127);
    const g = Math.floor(Math.random() * 128 + 127);
    const b = Math.floor(Math.random() * 128 + 127);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer */}
      <Animated.View style={[styles.drawer, { left: drawerAnim }]}>
        <TouchableOpacity style={styles.drawerItem} onPress={() => setDrawerOpen(false)}>
          <Icon name="chevron-left" size={20} />
          <Text style={styles.drawerText}>Collapse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Icon name="mic" size={20} />
          <Text style={styles.drawerText}>Interview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Icon name="calendar" size={20} />
          <Text style={styles.drawerText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Icon name="image" size={20} />
          <Text style={styles.drawerText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Icon name="phone" size={20} />
          <Text style={styles.drawerText}>Contact us</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Overlay */}
      {(drawerOpen || avatarMenuOpen) && (
        <TouchableWithoutFeedback onPress={closeOverlays}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="bell" size={20} color="#333" />
          </TouchableOpacity>

          {user ? (
            <TouchableOpacity
              style={[styles.avatarIcon, { backgroundColor: user.bgColor, borderColor: user.bgColor }]}
              onPress={() => setAvatarMenuOpen((p) => !p)}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>{user.initial}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.avatarIcon} onPress={() => setAvatarMenuOpen((p) => !p)}>
              <Icon name="user" size={18} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Avatar Menu */}
      {avatarMenuOpen && (
        <View style={styles.avatarMenu}>
          {user ? (
            <TouchableOpacity
              style={styles.avatarMenuItem}
              onPress={() => {
                setUser(null);
                setAvatarMenuOpen(false);
              }}
            >
              <Icon name="log-out" size={16} color="#333" />
              <Text style={styles.avatarMenuText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.avatarMenuItem} onPress={onSignInPress}>
                <Icon name="log-in" size={16} color="#333" />
                <Text style={styles.avatarMenuText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.avatarMenuItem} onPress={() => {}}>
                <Icon name="user-plus" size={16} color="#333" />
                <Text style={styles.avatarMenuText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* Categories */}
      <View style={styles.categoriesRow}>
        <TouchableOpacity style={styles.plusIcon}>
          <Icon name="plus" size={20} color="#333" />
        </TouchableOpacity>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat} style={styles.categoryTab}>
            <Text style={styles.categoryTabText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* News List */}
      <FlatList
        data={ALL_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="home" size={24} color="#63CBB2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="search" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="briefcase" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="star" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="bookmark" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* VERIFY / ENTER OTP Modal */}
      <Modal
        visible={showVerifyModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowVerifyModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowVerifyModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowVerifyModal(false)}>
              <Text style={styles.backText}>&lt; Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {modalStep === 1
                ? 'Verification'
                : modalStep === 2
                ? 'Enter OTP'
                : 'Log‑In'}
            </Text>
            <TouchableOpacity onPress={() => setShowVerifyModal(false)}>
              <Icon name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalBody} keyboardShouldPersistTaps="handled">
            {/* Step 1 */}
            {modalStep === 1 && (
              <>
                <View style={styles.stepsRow}>
                  <View style={styles.stepCircleActive}>
                    <Text style={styles.stepNumberActive}>1</Text>
                  </View>
                  <View style={styles.stepLine} />
                  <View style={styles.stepCircle}>
                    <Text style={styles.stepNumber}>2</Text>
                  </View>
                </View>
                <View style={styles.phoneInputRow}>
                  <Text style={styles.countryCode}>🇮🇳 +91</Text>
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="Mobile number"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={(t) => {
                      const digits = t.replace(/[^0-9]/g, '');
                      setPhone(digits);
                      setPhoneError('');
                    }}
                  />
                </View>
                <Text style={styles.noteText}>We'll use this to verify the OTP.</Text>
                {!!phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    phone.length === 10 ? styles.sendButtonActive : styles.sendButtonDisabled,
                  ]}
                  onPress={sendOTP}
                  disabled={phone.length !== 10}
                >
                  <Text
                    style={[
                      styles.sendButtonText,
                      phone.length === 10 ? styles.sendButtonTextActive : styles.sendButtonTextDisabled,
                    ]}
                  >
                    Send OTP
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Step 2 */}
            {modalStep === 2 && (
              <>
                <View style={styles.stepsRow}>
                  <View style={styles.stepCircleActive}>
                    <Text style={styles.stepNumberActive}>1</Text>
                  </View>
                  <View style={styles.stepLine} />
                  <View style={styles.stepCircle}>
                    <Text style={styles.stepNumber}>2</Text>
                  </View>
                </View>
                <Text style={styles.sentText}>We’ve sent a 6‑digit code to +91 {phone}</Text>
                <View style={styles.otpRow}>
                  {otp.map((d, i) => (
                    <TextInput
                      key={i}
                      ref={(ref) => (inputs.current[i] = ref)}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={d}
                      onChangeText={(v) => {
                        const digits = v.replace(/[^0-9]/g, '');
                        const next = [...otp];
                        next[i] = digits;
                        setOtp(next);
                        focusNext(i, digits);
                      }}
                    />
                  ))}
                </View>
                <TouchableOpacity onPress={sendOTP}>
                  <Text style={styles.resendText}>Didn’t get the code? Resend in 10s</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    otp.every((d) => d) ? styles.verifyButtonActive : styles.verifyButtonDisabled,
                  ]}
                  onPress={verifyOTP}
                  disabled={!otp.every((d) => d)}
                >
                  <Text
                    style={[
                      styles.verifyButtonText,
                      otp.every((d) => d) ? styles.verifyButtonTextActive : styles.verifyButtonTextDisabled,
                    ]}
                  >
                    Verify
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Step 3 */}
            {modalStep === 3 && (
              <>
                <View style={styles.stepsRow}>
                  <View style={styles.stepCircleActive}>
                    <Text style={styles.stepNumberActive}>1</Text>
                  </View>
                  <View style={styles.stepLine} />
                  <View style={isFormValid ? styles.stepCircleActive : styles.stepCircle}>
                    <Text style={isFormValid ? styles.stepNumberActive : styles.stepNumber}>2</Text>
                  </View>
                </View>

                <TextInput
                  style={styles.detailInput}
                  placeholder="First name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <TextInput
                  style={styles.detailInput}
                  placeholder="Last name"
                  value={lastName}
                  onChangeText={setLastName}
                />
                <TextInput
                  style={styles.detailInput}
                  placeholder="Email address"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    setEmailError(t && !validateEmail(t) ? 'Invalid email syntax' : '');
                  }}
                />
                {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
                <TextInput
                  style={styles.detailInput}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />

                <TouchableOpacity
                  style={[styles.finalButton, isFormValid ? styles.finalButtonActive : styles.finalButtonDisabled]}
                  disabled={!isFormValid}
                  onPress={() => {
                    const initial = email.trim()[0].toUpperCase();
                    const bgColor = randomColor();
                    setUser({ initial, bgColor });
                    setShowVerifyModal(false);
                    Alert.alert('Login successful');
                  }}
                >
                  <Text style={isFormValid ? styles.finalButtonTextActive : styles.finalButtonTextDisabled}>
                    Login
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Drawer
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 40 : 30,
    zIndex: 2,
    elevation: 5,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  drawerText: {
    marginLeft: 12,
    fontSize: 16,
  },

  // Overlay
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000040',
    zIndex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? 40 : 30,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12,
  },
  avatarIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Avatar Menu
  avatarMenu: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 80 : 70,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    zIndex: 3,
    paddingVertical: 4,
  },
  avatarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatarMenuText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },

  // Categories
  categoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  plusIcon: { marginRight: 12 },
  categoryTab: { marginRight: 16 },
  categoryTabText: { fontSize: 14, color: '#333', fontWeight: '500' },

  // News List
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: { fontSize: 12, color: '#999' },
  statsRow: { flexDirection: 'row' },
  statsItem: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  statsText: { fontSize: 12, color: '#999', marginLeft: 4 },
  thumbnail: {
    width: width * 0.28,
    height: width * 0.28 * 0.7,
    resizeMode: 'cover',
  },

  // Bottom Tab Bar
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  // Modal Overlay & Container
  modalOverlay: { flex: 1, backgroundColor: '#00000050' },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },

  // Modal Header
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backText: { fontSize: 16, color: '#007AFF' },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#000' },

  // Modal Body & Step Indicator
  modalBody: { paddingBottom: 20 },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepCircleActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#62CBB2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberActive: { color: '#fff', fontWeight: '600' },
  stepNumber: { color: '#999', fontWeight: '600' },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
    marginHorizontal: 8,
  },

  // Phone Input (Step 1)
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
  },
  countryCode: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 16,
    color: '#333',
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },

  // Send OTP Button (Step 1)
  sendButton: {
    width: 140,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  sendButtonDisabled: { backgroundColor: '#E5E5EA' },
  sendButtonActive: { backgroundColor: '#3C3C43' },
  sendButtonText: { fontSize: 16, fontWeight: '600' },
  sendButtonTextDisabled: { color: '#000' },
  sendButtonTextActive: { color: '#FFF' },

  // OTP Inputs (Step 2)
  sentText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DDD',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },

  // Verify Button (Step 2)
  verifyButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 20,
    marginBottom: 12,
  },
  verifyButtonActive: { backgroundColor: '#3C3C43' },
  verifyButtonDisabled: { backgroundColor: '#E5E5EA' },
  verifyButtonText: { fontSize: 16, fontWeight: '600' },
  verifyButtonTextActive: { color: '#FFF' },
  verifyButtonTextDisabled: { color: '#000' },

  // Details form (Step 3)
  detailInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  // Final login button styles
  finalButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  finalButtonDisabled: { backgroundColor: '#E5E5EA' },
  finalButtonTextDisabled: { color: '#000', fontWeight: '600', fontSize: 16 },
  finalButtonActive: { backgroundColor: '#3C3C43' },
  finalButtonTextActive: { color: '#FFF', fontWeight: '600', fontSize: 16 },
});


