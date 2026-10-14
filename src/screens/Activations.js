import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ITEMS = [
  { id: 'a1', name: 'Activate Campaign: New Launch' },
  { id: 'a2', name: 'Activate Offer: Influencer Pack' },
];

export default function Activations() {
  const activate = (name) => {
    Alert.alert('Activation', `${name} activated`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activations</Text>
      <FlatList
        data={ITEMS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => activate(item.name)}>
              <Text style={{ color: '#fff' }}>Activate</Text>
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
  btn: { backgroundColor: '#007bff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
});
