import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../src/services/api';

interface RoutineExercise {
  id: number;
  exercise_details: { name: string; category: string };
  target_sets: number;
  target_reps: string;
}

interface Routine {
  id: number;
  name: string;
  description: string;
  exercises: RoutineExercise[];
}

export default function RoutinesScreen() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('routines/')
      .then((response) => setRoutines(response.data))
      .catch((error) => console.error("Erro ao buscar rotinas:", error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: Routine }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Text style={styles.routineName}>{item.name}</Text>
        <Text style={{ fontSize: 24, color: '#888888' }}>›</Text>
      </View>
      
      {item.description ? <Text style={styles.routineDesc}>{item.description}</Text> : null}
      
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item.exercises.length} Exercícios</Text>
      </View>
      
      {/* Mostra uma prévia dos primeiros 3 exercícios */}
      <View style={styles.previewContainer}>
        {item.exercises.slice(0, 3).map((ex, index) => (
          <Text key={index} style={styles.previewText}>
            {ex.target_sets}x {ex.exercise_details.name}
          </Text>
        ))}
        {item.exercises.length > 3 && (
          <Text style={styles.previewText}>+ {item.exercises.length - 3} mais...</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Meus Treinos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      ) : (
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum treino criado.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', paddingTop: 60 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', paddingHorizontal: 20, marginBottom: 20 },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { backgroundColor: '#121212', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#1E1E1E' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  routineName: { fontSize: 20, fontWeight: '600', color: '#FFFFFF' },
  routineDesc: { fontSize: 14, color: '#888888', marginTop: 4 },
  badgeContainer: { backgroundColor: '#1E1E1E', alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, marginTop: 12, marginBottom: 8 },
  badgeText: { color: '#AAAAAA', fontSize: 12, fontWeight: 'bold' },
  previewContainer: { marginTop: 8 },
  previewText: { color: '#888888', fontSize: 14, lineHeight: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888888', textAlign: 'center', marginTop: 40 }
});