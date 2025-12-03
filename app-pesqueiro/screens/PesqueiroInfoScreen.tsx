// PesqueiroInfoScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PesqueiroInfoScreen({ navigation }: any) {
  const [lagos, setLagos] = useState<any[]>([]);
  const [movs, setMovs] = useState<any[]>([]);
  const [lucroMes, setLucroMes] = useState(0);
  const [totalPeixes, setTotalPeixes] = useState(0);

  useEffect(() => {
    carregar();
    navigation.addListener("focus", carregar);
  }, []);

  async function carregar() {
    // lagos
    const rawLagos = await AsyncStorage.getItem("lagos");
    const arrLagos = rawLagos ? JSON.parse(rawLagos) : [];
    setLagos(arrLagos);

    // peixes totais
    let soma = 0;
    arrLagos.forEach((l: any) =>
      l.peixes.forEach((p: any) => {
        soma += p.quantidade;
      })
    );
    setTotalPeixes(soma);

    // movimentações
    const rawMovs = await AsyncStorage.getItem("movimentacoes");
    const arrMovs = rawMovs ? JSON.parse(rawMovs) : [];
    setMovs(arrMovs);

    // lucro do mês (somar entradas - saídas)
    let lucro = 0;
    const mesAtual = new Date().getMonth();

    arrMovs.forEach((m: any) => {
      const data = new Date(m.data);
      if (data.getMonth() === mesAtual) {
        if (m.tipo === "entrada") lucro += Number(m.valor);
        if (m.tipo === "saida") lucro -= Number(m.valor);
      }
    });

    setLucroMes(lucro);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Informações do Pesqueiro</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Lucro no mês:</Text>
        <Text style={styles.valor}>R$ {lucroMes.toFixed(2)}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Total de lagos:</Text>
        <Text style={styles.valor}>{lagos.length}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Total de peixes:</Text>
        <Text style={styles.valor}>{totalPeixes}</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("ListaLagos")}
      >
        <Text style={styles.btnTxt}>Gerenciar Lagos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#1abc9c" }]}
        onPress={() => navigation.navigate("Equipamentos")}
      >
        <Text style={styles.btnTxt}>Gerenciar Equipamentos</Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Últimas Movimentações</Text>

      <FlatList
        data={movs.slice(-5).reverse()}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }) => (
          <View style={styles.movCard}>
            <Text style={styles.movTipo}>{item.tipo.toUpperCase()}</Text>
            <Text>R$ {item.valor}</Text>
            <Text style={styles.movData}>{item.data}</Text>
            <Text>{item.produto}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  subTitle: { fontSize: 18, fontWeight: "700", marginTop: 16, marginBottom: 4 },
  box: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  label: { fontSize: 16, color: "#555" },
  valor: { fontSize: 20, fontWeight: "700" },
  btn: {
    backgroundColor: "#2B8AF6",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  btnTxt: { textAlign: "center", fontWeight: "700", color: "#fff" },
  movCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 8,
  },
  movTipo: { fontWeight: "700", color: "#2B8AF6" },
  movData: { color: "#888", fontSize: 12 },
});
