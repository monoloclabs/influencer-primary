import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Home from './src/screens/Home';
import Campaigns from './src/screens/Campaigns';
import Approvals from './src/screens/Approvals';
import Activations from './src/screens/Activations';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [route, setRoute] = useState('Home');

  useEffect(() => {
    // Request notification permissions (local scheduling will work in Expo Go; push tokens require a build)
    (async () => {
      try {
        const settings = await Notifications.getPermissionsAsync();
        if (settings.granted === false) {
          await Notifications.requestPermissionsAsync();
        }
      } catch (e) {
        console.log('Notification permission error', e);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Influencer — Mobile</Text>
      </View>

      <View style={styles.content}>
        {route === 'Home' && <Home />}
        {route === 'Campaigns' && <Campaigns />}
        {route === 'Approvals' && <Approvals />}
        {route === 'Activations' && <Activations />}
      </View>

      <View style={styles.footer}>
        {['Home', 'Campaigns', 'Approvals', 'Activations'].map((r) => (
          <TouchableOpacity key={r} onPress={() => setRoute(r)} style={styles.tab}>
            <Text style={styles.tabText}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, backgroundColor: '#1e90ff' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  footer: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee' },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  tabText: { color: '#333' },
});
