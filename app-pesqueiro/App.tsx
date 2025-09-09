import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterPesqueiroScreen from './screens/RegisterPesqueiroScreen'

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RegisterPesqueiroScreen />
    </SafeAreaView>
  );
}

