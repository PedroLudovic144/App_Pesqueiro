// SideMenu.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SideMenu({ navigation }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    carregar();
    navigation.addListener("focus", carregar);
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("pesqueiroAtual");
    if (raw) setUser(JSON.parse(raw));
  }

  async function logout() {
    await AsyncStorage.removeItem("pesqueiroAtual");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={
            user?.foto
              ? { uri: user.foto }
              : require("../assets/images/cararafiq.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.nome ?? "Usuário"}</Text>
        <Text style={styles.email}>{user?.email ?? ""}</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DrawerApp", { screen: "Editar" })
          }
        >
          <Text style={styles.edit}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Itens */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("DrawerApp", { screen: "Movimentacoes" })}
      >
        <Text style={styles.itemText}>💰 Movimentações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("DrawerApp", { screen: "Lagos" })}
      >
        <Text style={styles.itemText}>🌊 Lagos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("DrawerApp", { screen: "ListaEquipamentos" })}
      >
        <Text style={styles.itemText}>🎣 Equipamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("DrawerApp", { screen: "Favoritos" })}
      >
        <Text style={styles.itemText}>❤️ Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("DrawerApp", { screen: "PesqueiroInfo" })}
      >
        <Text style={styles.itemText}>📊 Informações do Pesqueiro</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity onPress={() => Alert.alert("Sair", "Deseja sair?", [
        { text: "Cancelar" },
        { text: "OK", onPress: logout }
      ])}>
        <Text style={styles.logout}>Sair</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, alignItems: "center", backgroundColor: "#2B8AF6" },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { color: "#fff", fontSize: 18, fontWeight: "700" },
  email: { color: "#fff", opacity: 0.8 },
  edit: { marginTop: 6, color: "#fff", textDecorationLine: "underline" },

  item: { padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 16 },

  divider: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },
  logout: { padding: 15, fontSize: 16, color: "red", fontWeight: "700" },
});
