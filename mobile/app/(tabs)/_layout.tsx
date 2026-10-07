import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#121212', borderTopColor: '#1E1E1E' },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#888888',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Exercícios',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22, lineHeight: 24 }}>🏋️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: 'Treinos',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22, lineHeight: 24 }}>📝</Text>
          ),
        }}
      />
    </Tabs>
  );
}