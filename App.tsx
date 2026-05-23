import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native + Web</Text>
      <Text style={styles.subtitle}>一套代码，多端运行</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>当前平台</Text>
        <Text style={styles.platform}>
          {Platform.OS === 'web' ? '🖥 Web (浏览器)' : '📱 移动端'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>构建信息</Text>
        <Text style={styles.info}>expo export:web → GitHub Pages</Text>
        <Text style={styles.info}>push 代码 → 自动部署 → 单位电脑查看</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 360,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  platform: {
    fontSize: 18,
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
