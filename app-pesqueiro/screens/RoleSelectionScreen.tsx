// RoleSelectionScreen.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function RoleSelectionScreen({ navigation, route }: any) {
  const user = route?.params?.user ?? { id: "user-guest", name: "Usuário" };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {user.name ?? user.email} — como deseja entrar?</Text>

      {/* ENTRAR COMO GERENTE */}
      <View style={styles.btns}>
        <Button
          title="Gerenciar meu pesqueiro"
          onPress={() => navigation.navigate("DrawerApp", { user })}
        />
      </View>

      <View style={{ height: 12 }} />

      {/* ENTRAR COMO CLIENTE */}
      <View style={styles.btns}>
        <Button
          title="Entrar como cliente"
          onPress={() => navigation.navigate("ClienteApp", { user })}
        />
      </View>

      <Text style={styles.small}>
        Se você não tem pesqueiro ainda, entre como gerente e registre um.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 25, textAlign: "center" },
  btns: { marginHorizontal: 20 },
  small: { marginTop: 24, color: "#667", textAlign: "center" },
});
