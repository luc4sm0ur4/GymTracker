import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../src/services/api';

// Tipagem básica para o TypeScript não reclamar
interface Exercise {
  id: number;
  name: string;
  category: string;
}

export default function HomeScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os exercícios no Django assim que a tela abre
    api.get('exercises/')
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Componente visual de cada item da lista
  const renderItem = ({ item }: { item: Exercise }) => (
    <View style={styles.card}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseCategory}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Exercícios</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum exercício encontrado.</Text>}
        />
      )}
    </View>
  );
}

// Design System Minimalista (Estilo Hevy/BeFit)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // True Black
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#121212', // Cinza muito escuro
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#888888', // Texto secundário
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888888',
    textAlign: 'center',
    marginTop: 40,
  }
});