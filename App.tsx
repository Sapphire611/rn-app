import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ThemeProvider,
  createTheme,
  Card,
  ListItem,
  Avatar,
  Header,
  Badge,
} from '@rneui/themed';

// ─── 主题 ────────────────────────────────────────────────

const theme = createTheme({
  lightColors: {
    primary: '#4A90D9',
    secondary: '#8E8E93',
    background: '#F2F2F7',
    white: '#FFFFFF',
    grey0: '#1C1C1E',
    grey1: '#3A3A3C',
    grey2: '#636366',
    grey3: '#AEAEB2',
    grey4: '#C7C7CC',
    grey5: '#E5E5EA',
    greyOutline: '#E5E5EA',
  },
  components: {
    Header: {
      backgroundColor: '#FFFFFF',
      centerContainerStyle: { justifyContent: 'center' },
    },
  },
});

// ─── 自定义底部 Tab 栏 ───────────────────────────────────

function CustomTabBar({
  tabs,
  activeIndex,
  onPress,
}: {
  tabs: readonly { key: string; title: string; emoji: string }[];
  activeIndex: number;
  onPress: (index: number) => void;
}) {
  return (
    <View style={tabStyles.bar}>
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        return (
          <TouchableOpacity
            key={tab.key}
            style={tabStyles.item}
            activeOpacity={0.6}
            onPress={() => onPress(i)}
          >
            <Text style={[tabStyles.emoji, isActive && tabStyles.emojiActive]}>
              {tab.emoji}
            </Text>
            <Text style={[tabStyles.label, isActive && tabStyles.labelActive]}>
              {tab.title}
            </Text>
            {isActive && <View style={tabStyles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5EA',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  emoji: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.4,
  },
  emojiActive: {
    opacity: 1,
  },
  label: {
    fontSize: 11,
    color: '#999',
  },
  labelActive: {
    color: '#333',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 3,
    backgroundColor: '#4A90D9',
    borderRadius: 2,
  },
});

// ─── Tab 配置 ────────────────────────────────────────────

const TABS = [
  { key: 'home', title: '首页', emoji: '🏠' },
  { key: 'discover', title: '发现', emoji: '🔍' },
  { key: 'profile', title: '我的', emoji: '👤' },
] as const;

// ─── 图标文本组件 ────────────────────────────────────────

function EmojiIcon({ emoji, size = 22 }: { emoji: string; size?: number }) {
  return <Text style={{ fontSize: size }}>{emoji}</Text>;
}

// ─── 各页面组件 ──────────────────────────────────────────

function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F2F2F7' }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1C1E', marginBottom: 2 }}>欢迎回来</Text>
      <Text style={{ color: '#8E8E93', marginBottom: 20 }}>今天是个好天气 ☀️</Text>

      {/* 数据概览 */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
        <Card containerStyle={{ flex: 1, borderRadius: 12, margin: 0, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '700' }}>128</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: '#8E8E93', marginTop: 4 }}>今日步数</Text>
        </Card>
        <Card containerStyle={{ flex: 1, borderRadius: 12, margin: 0, backgroundColor: '#E3F2FD', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '700' }}>3</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: '#8E8E93', marginTop: 4 }}>待办事项</Text>
        </Card>
        <Card containerStyle={{ flex: 1, borderRadius: 12, margin: 0, backgroundColor: '#FFF3E0', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '700' }}>92</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: '#8E8E93', marginTop: 4 }}>积分</Text>
        </Card>
      </View>

      {/* 快捷入口 */}
      <Text style={{ fontSize: 13, fontWeight: '600', color: '#AEAEB2', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>快捷入口</Text>
      {[
        { label: '消息中心', desc: '3 条未读消息', emoji: '✉️', badge: '3' },
        { label: '每日签到', desc: '已连续签到 7 天', emoji: '✅' },
        { label: '我的订单', desc: '2 个订单进行中', emoji: '📦' },
        { label: '设置', desc: '账户安全、通知偏好', emoji: '⚙️' },
      ].map((item) => (
        <ListItem key={item.label} containerStyle={{ borderRadius: 12, marginBottom: 8, paddingVertical: 12 }} bottomDivider={false}>
          <EmojiIcon emoji={item.emoji} />
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 15, fontWeight: '500' }}>{item.label}</ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 12 }}>{item.desc}</ListItem.Subtitle>
          </ListItem.Content>
          {item.badge ? <Badge value={item.badge} status="error" /> : null}
          <Text style={{ fontSize: 20, color: '#C7C7CC', marginLeft: 8 }}>›</Text>
        </ListItem>
      ))}
    </ScrollView>
  );
}

function DiscoverScreen() {
  const cards = [
    { title: '热门推荐', desc: '为你精选优质内容', emoji: '🔥', color: '#FFF0F0' },
    { title: '附近的人', desc: '发现身边的有趣灵魂', emoji: '📍', color: '#F0F8FF' },
    { title: '活动中心', desc: '精彩活动等你参与', emoji: '🎉', color: '#FFF8F0' },
    { title: '限时优惠', desc: '超值好货限时抢购', emoji: '⚡', color: '#F5F0FF' },
    { title: '排行榜', desc: '看看大家都在看什么', emoji: '🏆', color: '#F0FFF4' },
    { title: '话题广场', desc: '热门话题实时讨论', emoji: '💬', color: '#FFF5F0' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F2F2F7' }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1C1E', marginBottom: 2 }}>发现精彩</Text>
      <Text style={{ color: '#8E8E93', marginBottom: 20 }}>探索更多有趣内容</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {cards.map((card) => (
          <Card key={card.title} containerStyle={{ width: '46%', flexGrow: 1, borderRadius: 14, margin: 0, padding: 0, overflow: 'hidden' }}>
            <View style={{ height: 72, backgroundColor: card.color, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 30 }}>{card.emoji}</Text>
            </View>
            <View style={{ padding: 14 }}>
              <Text style={{ fontWeight: '600', fontSize: 14, marginBottom: 3 }}>{card.title}</Text>
              <Text style={{ fontSize: 11, color: '#8E8E93' }}>{card.desc}</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F2F2F7' }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      {/* 头像区 */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Avatar
          size={80}
          rounded
          title="我"
          containerStyle={{ backgroundColor: '#E0E0E0', marginBottom: 12 }}
        />
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#1C1C1E', marginBottom: 2 }}>用户昵称</Text>
        <Text style={{ color: '#AEAEB2', fontSize: 13 }}>还没有填写简介</Text>
      </View>

      {/* 数据统计 */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
        <Card containerStyle={{ flex: 1, borderRadius: 12, margin: 0 }}>
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '700' }}>32</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: '#8E8E93', marginTop: 4 }}>关注</Text>
        </Card>
        <Card containerStyle={{ flex: 1, borderRadius: 12, margin: 0 }}>
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '700' }}>56</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: '#8E8E93', marginTop: 4 }}>粉丝</Text>
        </Card>
        <Card containerStyle={{ flex: 1, borderRadius: 12, margin: 0 }}>
          <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '700' }}>18</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: '#8E8E93', marginTop: 4 }}>收藏</Text>
        </Card>
      </View>

      {/* 菜单 */}
      <Text style={{ fontSize: 13, fontWeight: '600', color: '#AEAEB2', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>更多</Text>
      {[
        { label: '我的收藏', emoji: '⭐' },
        { label: '浏览记录', emoji: '🕐' },
        { label: '帮助与反馈', emoji: '❓' },
        { label: '关于应用', emoji: '📋' },
      ].map((item) => (
        <ListItem key={item.label} containerStyle={{ borderRadius: 12, marginBottom: 8, paddingVertical: 12 }} bottomDivider={false}>
          <EmojiIcon emoji={item.emoji} />
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 15, fontWeight: '500' }}>{item.label}</ListItem.Title>
          </ListItem.Content>
          <Text style={{ fontSize: 20, color: '#C7C7CC', marginLeft: 8 }}>›</Text>
        </ListItem>
      ))}
    </ScrollView>
  );
}

// ─── 主 App ──────────────────────────────────────────────

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const isWeb = Platform.OS === 'web';

  const renderScreen = () => {
    switch (tabIndex) {
      case 0: return <HomeScreen />;
      case 1: return <DiscoverScreen />;
      case 2: return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  const innerContent = (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar style="dark" />

      <Header
        centerComponent={{ text: TABS[tabIndex].title, style: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' } }}
        containerStyle={{ borderBottomColor: '#E5E5EA', borderBottomWidth: StyleSheet.hairlineWidth }}
      />

      <View style={{ flex: 1 }}>{renderScreen()}</View>

      <CustomTabBar tabs={TABS} activeIndex={tabIndex} onPress={setTabIndex} />
    </View>
  );

  if (isWeb) {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <View style={webStyles.wrapper}>
            <View style={webStyles.phone}>{innerContent}</View>
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>{innerContent}</ThemeProvider>
    </SafeAreaProvider>
  );
}

const webStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E8ECF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    height: '100%',
    maxHeight: 900,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
});
