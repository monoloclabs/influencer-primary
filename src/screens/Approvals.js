import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const REQUESTS = [
  { id: 'r1', creator: 'creator_a', item: 'Post approval for Summer Drop' },
  { id: 'r2', creator: 'creator_b', item: 'Story approval for Launch' },
];

export default function Approvals() {
  const [items, setItems] = useState(REQUESTS);

  const approve = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    Alert.alert('Approved', 'Approval completed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approvals</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.item}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => approve(item.id)}>
              <Text style={{ color: '#fff' }}>Approve</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 15 },
  btn: { backgroundColor: '#28a745', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
});
