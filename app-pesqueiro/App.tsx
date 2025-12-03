// App.tsx
import React, { JSX } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from "react-native";

// ===== TELAS (COLOQUE TODOS ESTES ARQUIVOS NA PASTA screens/) =====
import LoginScreen from "./screens/LoginScreen";
import RoleSelectionScreen from "./screens/RoleSelectionScreen";
import RegisterPesqueiroScreen from "./screens/RegisterPesqueiroScreen";

import DrawerHomePlaceholder from "./screens/RecordPesqueiroScreen"; // manter compatibilidade
import EditScreen from "./screens/EditScreen";
import MovementsScreen from "./screens/MovementsScreen";
import SideMenu from "./screens/SideMenu";
import RecordClienteScreen from "./screens/RecordClienteScreen";

import ExplorerScreen from "./screens/ExplorerScreen";
import DetailsFisher from "./screens/DetailsFisherScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

import PesqueiroInfoScreen from "./screens/PesqueiroInfoScreen";

// equipamentos / aluguel
import ListaEquipamentosScreen from "./screens/ListaEquipamentosScreen";
import AdicionarEquipamentoScreen from "./screens/AdicionarEquipamentoScreen";
import AluguelScreen from "./screens/AluguelScreen";

// peixes / lagos
import ListaPeixesScreen from "./screens/ListaPeixesScreen"; // (legacy, pode apontar para PeixesDoLago)
import AdicionarPeixeScreen from "./screens/AdicionarPeixeScreen"; // (legacy)
import ListaLagosScreen from "./screens/ListaLagosScreen";
import AdicionarLagoScreen from "./screens/AdicionarLagoScreen";
import PeixesDoLagoScreen from "./screens/PeixesDoLagoScreen";
import VendaPeixeModal from "./screens/VendaPeixeModal"; // opcional: modal para vender quantidade

LogBox.ignoreAllLogs(true);

// ===== TYPE DEFINITIONS =====
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RoleSelection: undefined;
  DrawerApp: undefined;
  ClienteApp: undefined;
};

export type RootDrawerParamList = {
  Movimentacoes: undefined;
  Record: undefined;
  Editar: undefined;
  RecordCliente: undefined;
  Favoritos: undefined;
  ListaPeixes: undefined;
  ListaEquipamentos: undefined;
  AdicionarEquipamento: undefined;
  PesqueiroInfo: { pesqueiroId?: string } | undefined;
  Aluguel: { equipamentoId?: string } | undefined;
  Lagos: { pesqueiroId?: string } | undefined;
  AdicionarLago: { pesqueiroId?: string } | undefined;
  PeixesDoLago: { lagoId?: string } | undefined;
};

export type ClienteStackParamList = {
  SearchPesqueiros: undefined;
  DetailsFisher: { pesqueiro: any };
  Favoritos: { user?: any } | undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const ClienteStack = createNativeStackNavigator<ClienteStackParamList>();

// ===== DRAWER (Gerente) =====
function DrawerNavigator() {
  return (
    <Drawer.Navigator
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
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      })}
      drawerContent={(props) => <SideMenu {...props} />}
    >
      <Drawer.Screen
        name="Movimentacoes"
        component={MovementsScreen}
        options={{
          title: "💰 Movimentações",
          drawerIcon: ({ color }) => <Ionicons name="swap-vertical" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Record"
        component={RegisterPesqueiroScreen}
        options={{
          title: "🎣 Registrar Pesqueiro",
          drawerIcon: ({ color }) => <Ionicons name="add-circle" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Editar"
        component={EditScreen}
        options={{
          title: "✏️ Editar Perfil",
          drawerIcon: ({ color }) => <Ionicons name="pencil" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="RecordCliente"
        component={RecordClienteScreen}
        options={{
          title: "👤 Registrar Cliente",
          drawerIcon: ({ color }) => <Ionicons name="person-add" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{
          title: "❤️ Favoritos",
          drawerIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="PesqueiroInfo"
        component={PesqueiroInfoScreen}
        options={{
          title: "📊 Informações do Pesqueiro",
          drawerIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Aluguel"
        component={AluguelScreen}
        options={{
          title: "🏷️ Gerenciar Aluguéis",
          drawerIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="ListaPeixes"
        component={ListaPeixesScreen}
        options={{
          title: "🐟 Peixes",
          drawerIcon: ({ color }) => <Ionicons name="water" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="ListaEquipamentos"
        component={ListaEquipamentosScreen}
        options={{
          title: "🎣 Equipamentos",
          drawerIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="AdicionarEquipamento"
        component={AdicionarEquipamentoScreen}
        options={{
          title: "➕ Adicionar Equipamento",
          drawerIcon: ({ color }) => <Ionicons name="add" size={24} color={color} />,
        }}
      />

      {/* Lagos (Gerente) */}
      <Drawer.Screen
        name="Lagos"
        component={ListaLagosScreen}
        options={{
          title: "🌊 Lagos",
          drawerIcon: ({ color }) => <Ionicons name="water" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="AdicionarLago"
        component={AdicionarLagoScreen}
        options={{
          title: "➕ Adicionar Lago",
          drawerIcon: ({ color }) => <Ionicons name="add" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="PeixesDoLago"
        component={PeixesDoLagoScreen}
        options={{
          title: "🐠 Peixes do Lago",
          drawerIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

// ===== CLIENTE NAVIGATOR =====
function ClienteNavigator() {
  return (
    <ClienteStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#2B8AF6" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
      }}
    >
      <ClienteStack.Screen
        name="SearchPesqueiros"
        component={ExplorerScreen}
        options={{ headerShown: false }}
      />
      <ClienteStack.Screen
        name="DetailsFisher"
        component={DetailsFisher}
        options={{ title: "Detalhes do Pesqueiro" }}
      />
      <ClienteStack.Screen
        name="Favoritos"
        component={FavoritesScreen}
        options={{ title: "Meus Favoritos" }}
      />
    </ClienteStack.Navigator>
  );
}

// ===== APP PRINCIPAL =====
export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterPesqueiroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ headerShown: false }} />

          {/* Rota para o Drawer (Gerente) */}
          <Stack.Screen name="DrawerApp" component={DrawerNavigator} options={{ headerShown: false }} />

          {/* Rota para o Cliente (stack aninhado) */}
          <Stack.Screen name="ClienteApp" component={ClienteNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
