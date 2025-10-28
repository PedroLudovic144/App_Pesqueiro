import React, { JSX } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from "react-native";

// Telas
import LoginScreen from "./screens/LoginScreen";
import RegisterPesqueiroScreen from "./screens/RegisterPesqueiroScreen";
import RecordPesqueiroScreen from "./screens/RecordPesqueiroScreen";
import EditScreen from "./screens/EditScreen";
import MovementsScreen from "./screens/MovementsScreen";
import SideMenu from "./screens/SideMenu"; 
import RecordClienteScreen from "./screens/RecordClienteScreen";
import ListOfNextFishers from "./screens/ListOfNextFishers";
import DetailsFisher from "./screens/DetailsFisherScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AdicionarEquipamentoScreen from "./screens/AdicionarEquipamentoScreen";
import ListaEquipamentosScreen from "./screens/ListaEquipamentosScreen";
import AdicionarPeixeScreen from "./screens/AdicionarPeixeScreen";
import ListaPeixesScreen from "./screens/ListaPeixesScreen";

LogBox.ignoreAllLogs(true);

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  DrawerApp: undefined;
};

export type RootDrawerParamList = {
  Movimentacoes: undefined;
  Record: undefined;
  Editar: undefined;
  RecordCliente: undefined;
  PesqueirosProximos: undefined;
  Favoritos: undefined;

  // 🐟 Peixes
  ListaPeixes: undefined;
  AdicionarPeixe: undefined;

  // 🎣 Equipamentos
  ListaEquipamentos: undefined;
  AdicionarEquipamento: undefined;
};


const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

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
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
          drawerLabel: "Favoritos" }}
      />
      <Drawer.Screen
        name="PesqueirosProximos"
        component={ListOfNextFishers}
        options={{ title: "Pesqueiros Próximos", drawerLabel: "Pesqueiros Próximos" }}
      />
      <Drawer.Screen
        name="RecordCliente"
        component={RecordClienteScreen}
        options={{ title: "Cadastro Cliente", drawerLabel: "Cadastro Cliente" }}
      />
      <Drawer.Screen
        name="Record"
        component={RecordPesqueiroScreen}
        options={{ title: "Registrar Movimentação", drawerLabel: "Registrar Movimentação" }}
      />
      <Drawer.Screen
        name="Editar"
        component={EditScreen}
        options={{ title: "Editar Pesqueiro", drawerLabel: "Editar Pesqueiro" }}
      />
      <Drawer.Screen
        name="ListaPeixes"
        component={ListaPeixesScreen}
        options={{ title: "Lista de Peixes" }}
      />
      <Drawer.Screen
        name="AdicionarPeixe"
        component={AdicionarPeixeScreen}
        options={{ title: "Adicionar Peixe" }}
      />
      <Drawer.Screen
        name="ListaEquipamentos"
        component={ListaEquipamentosScreen}
        options={{ title: "Lista de Equipamentos" }}
      />
      <Drawer.Screen
        name="AdicionarEquipamento"
        component={AdicionarEquipamentoScreen}
        options={{ title: "Adicionar Equipamento" }}
      />

    </Drawer.Navigator>
  );
}

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterPesqueiroScreen} />
          <Stack.Screen name="DrawerApp" component={DrawerNavigator} />
          {/* Detalhes acessados via Stack a partir do Drawer */}
          <Stack.Screen name="DetailsFisher" component={DetailsFisher} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="ListOfNextFishers" component={ListOfNextFishers} />
          <Stack.Screen name="RecordCliente" component={RecordClienteScreen} />
          <Stack.Screen name="ListaPeixes" component={ListaPeixesScreen} />
          <Stack.Screen name="AdicionarPeixe" component={AdicionarPeixeScreen} />
          <Stack.Screen name="ListaEquipamentos" component={ListaEquipamentosScreen} />
          <Stack.Screen name="AdicionarEquipamento" component={AdicionarEquipamentoScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
