import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Telas
import RegisterPesqueiroScreen from './screens/RegisterPesqueiroScreen';
import EditScreen from './screens/EditScreen';

export type RootStackParamList = {
  Register: undefined;
  Editar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#2B8AF6' }, // azul
            headerTintColor: '#fff', // cor do texto (branco)
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Register" component={RegisterPesqueiroScreen} />
          <Stack.Screen name="Editar" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
