// App.tsx — versão final (OFFLINE)
import React, { JSX } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LogBox } from "react-native";

// telas (assuma que existam em screens/)
import LoginScreen from "./screens/LoginScreen";
import RoleSelectionScreen from "./screens/RoleSelectionScreen";
import RegisterPesqueiroScreen from "./screens/RegisterPesqueiroScreen";
import EditScreen from "./screens/EditScreen";
import MovementsScreen from "./screens/MovementsScreen";
import SideMenu from "./screens/SideMenu";
import RecordClienteScreen from "./screens/RecordClienteScreen";

import ExplorerScreen from "./screens/ExplorerScreen";
import DetailsFisher from "./screens/DetailsFisherScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

import PesqueiroInfoScreen from "./screens/PesqueiroInfoScreen";

import ListaEquipamentosScreen from "./screens/ListaEquipamentosScreen";
import AdicionarEquipamentoScreen from "./screens/AdicionarEquipamentoScreen";
import AluguelScreen from "./screens/AluguelScreen";

import ListaPeixesScreen from "./screens/ListaPeixesScreen";
import AdicionarPeixeScreen from "./screens/AdicionarPeixeScreen";
import ListaLagosScreen from "./screens/ListaLagosScreen";
import AdicionarLagoScreen from "./screens/AdicionarLagoScreen";
import PeixesDoLagoScreen from "./screens/PeixesDoLagoScreen";
import VendaPeixeModal from "./screens/VendaPeixeModal";
import EditarMovimentacao from "./screens/EditarMovimentacao";
import CriarMovimentacao from "./screens/CriarMovimentacao";
import DebugStorage from "./screens/DebugStorage";
import TermsAndPoliticsScreen from "./screens/TermsAndPoliticsScreen";

LogBox.ignoreAllLogs(true);

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RoleSelection: undefined;
  DrawerApp: undefined;
  ClienteApp: undefined;
  VendaPeixeModal: { lagoId?: string; peixe?: any } | undefined;
};

export type RootDrawerParamList = {
  Movimentacoes: undefined;
  Record: undefined;
  Editar: undefined;
  RecordCliente: undefined;
  Favoritos: undefined;
  PesqueiroInfo: { pesqueiroId?: string } | undefined;
  ListaEquipamentos: undefined;
  AdicionarEquipamento: undefined;
  Aluguel: { equipamentoId?: string } | undefined;
  Lagos: { pesqueiroId?: string } | undefined;
  AdicionarLago: { pesqueiroId?: string } | undefined;
  PeixesDoLago: { lagoId?: string } | undefined;
  AdicionarPeixe: { lagoId?: string } | undefined;
};

export type ClienteStackParamList = {
  SearchPesqueiros: undefined;
  DetailsFisher: { pesqueiro: any };
  Favoritos: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const ClienteStack = createNativeStackNavigator<ClienteStackParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#2B8AF6" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} style={{ paddingLeft: 12 }}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      })}
      drawerContent={(props) => <SideMenu {...props} />}
    >
      <Drawer.Screen name="Movimentacoes" component={MovementsScreen} />
      <Drawer.Screen name="Record" component={RegisterPesqueiroScreen} />
      <Drawer.Screen name="Editar" component={EditScreen} />
      <Drawer.Screen name="RecordCliente" component={RecordClienteScreen} />
      <Drawer.Screen name="Favoritos" component={FavoritesScreen} />

      <Drawer.Screen name="PesqueiroInfo" component={PesqueiroInfoScreen} />

      <Drawer.Screen name="ListaEquipamentos" component={ListaEquipamentosScreen} />
      <Drawer.Screen name="AdicionarEquipamento" component={AdicionarEquipamentoScreen} />
      <Drawer.Screen name="Aluguel" component={AluguelScreen} />

      <Drawer.Screen name="Lagos" component={ListaLagosScreen} />
      <Drawer.Screen name="AdicionarLago" component={AdicionarLagoScreen} />
      <Drawer.Screen name="PeixesDoLago" component={PeixesDoLagoScreen} />
      <Drawer.Screen name="AdicionarPeixe" component={AdicionarPeixeScreen} />
    </Drawer.Navigator>
  );
}

function ClienteNavigator() {
  return (
    <ClienteStack.Navigator screenOptions={{ headerShown: false }}>
      <ClienteStack.Screen name="SearchPesqueiros" component={ExplorerScreen} />
      <ClienteStack.Screen name="DetailsFisher" component={DetailsFisher} options={{ headerShown: true, title: "Detalhes" }} />
      <ClienteStack.Screen name="Favoritos" component={FavoritesScreen} options={{ headerShown: true, title: "Favoritos" }} />
    </ClienteStack.Navigator>
  );
}

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterPesqueiroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TermsAndPolitics" component={TermsAndPoliticsScreen} />




          <Stack.Screen name="CriarMovimentacao" component={CriarMovimentacao} />
          <Stack.Screen name="EditarMovimentacao" component={EditarMovimentacao} />


          {/* Drawer e Cliente */}
          <Stack.Screen name="DrawerApp" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ClienteApp" component={ClienteNavigator} options={{ headerShown: false }} />

          {/* Modal / telas acessíveis diretamente (resolve navigate from anywhere) */}
          <Stack.Screen name="VendaPeixeModal" component={VendaPeixeModal} options={{ presentation: "modal", title: "Vender Peixe" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
