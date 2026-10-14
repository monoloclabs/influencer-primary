import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const SAMPLE = [
  { id: '1', name: 'Campaign: New Launch', status: 'Active' },
  { id: '2', name: 'Campaign: Summer Drop', status: 'Draft' },
  { id: '3', name: 'Campaign: Brand Collab', status: 'Paused' },
];

export default function Campaigns() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campaigns</Text>
      <FlatList
        data={SAMPLE}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8 },
  name: { fontSize: 16 },
  status: { marginTop: 4, color: '#666' },
});
