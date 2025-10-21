import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Telas
import LoginScreen from "./screens/LoginScreen";
import RegisterPesqueiroScreen from "./screens/RegisterPesqueiroScreen";
import RecordPesqueiroScreen from "./screens/RecordPesqueiroScreen";
import EditScreen from "./screens/EditScreen";
import MovementsScreen from "./screens/MovementsScreen";
import SideMenu from "./screens/SideMenu"; 
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  DrawerApp: undefined;
};

export type RootDrawerParamList = {
  Movimentacoes: undefined;
  Record: undefined;
  Editar: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Drawer (com o menu lateral)
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Movimentacoes"
      drawerContent={(props) => <SideMenu {...props} />} 
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#2B8AF6" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ paddingLeft: 12 }}
            accessibilityLabel="Abrir menu"
          >
            <Ionicons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen
        name="Movimentacoes"
        component={MovementsScreen}
        options={{ title: "Movimentações" }}
      />

      <Drawer.Screen
        name="Record"
        component={RecordPesqueiroScreen}
        options={{ title: "Registrar Movimentação" }}
      />

      <Drawer.Screen
        name="Editar"
        component={EditScreen}
        options={{ title: "Editar Pesqueiro" }}
      />
    </Drawer.Navigator>
  );
}

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          {/* Telas sem menu */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterPesqueiroScreen} />

          {/* App com menu lateral */}
          <Stack.Screen name="DrawerApp" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
