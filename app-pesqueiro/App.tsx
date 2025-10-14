import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Telas (garanta que esses arquivos existam em ./screens)
import RegisterPesqueiroScreen from "./screens/RegisterPesqueiroScreen";
import RecordPesqueiroScreen from "./screens/RecordPesqueiroScreen";
import EditScreen from "./screens/EditScreen";
import MovementsScreen from "./screens/MovementsScreen"

export type RootDrawerParamList = {
  Movimentacoes: undefined;
  Register: undefined;
  Record: undefined;
  Editar: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Movimentacoes"
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: "#2B8AF6" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerTitleAlign: "center",
            // ícone do menu no header para abrir o Drawer
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
            name="Register"
            component={RegisterPesqueiroScreen}
            options={{ title: "Cadastro de Pesqueiro" }}
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
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
