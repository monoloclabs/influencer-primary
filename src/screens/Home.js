import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function Home() {
  const sendTestNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Influencer App',
          body: 'This is a test local notification (scheduled in 5s).',
        },
        trigger: { seconds: 5 },
      });
      alert('Scheduled a local notification in 5 seconds.');
    } catch (e) {
      alert('Scheduling failed: ' + String(e));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back 👋</Text>
      <Text style={styles.p}>Quick overview of your influencer dashboard. Use the bottom tabs to navigate.</Text>
      <View style={{ marginTop: 16 }}>
        <Button title="Send test notification (local)" onPress={sendTestNotification} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: '600' },
  p: { marginTop: 8, color: '#444' },
});
