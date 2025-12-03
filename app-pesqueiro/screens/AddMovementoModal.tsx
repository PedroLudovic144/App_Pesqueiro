// AddMovementoModal.tsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
} from "react-native";

type Props = {
  visivel: boolean;
  onClose: () => void;
  onSave: (m: any) => void;
  initialData?: any;
};

export default function AddMovementoModal({ visivel, onClose, onSave, initialData }: Props) {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
  const [valor, setValor] = useState("");
  const [produto, setProduto] = useState("");
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    if (initialData) {
      setData(initialData.data || "");
      setHora(initialData.hora || "");
      setTipo(initialData.tipo === "saida" ? "saida" : "entrada");
      setValor(String(initialData.valor ?? ""));
      setProduto(initialData.produto ?? "");
      setObservacao(initialData.observacao ?? "");
    } else {
      setData(new Date().toLocaleDateString("pt-BR"));
      setHora(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setTipo("entrada");
      setValor("");
      setProduto("");
      setObservacao("");
    }
  }, [visivel, initialData]);

  function salvar() {
    if (!produto.trim() || !valor || Number(valor) <= 0) { alert("Preencha produto e valor válidos"); return; }
    onSave({ data, hora, tipo, valor: Number(valor), produto, observacao });
  }

  return (
    <Modal visible={visivel} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>{initialData ? "Editar Movimentação" : "Adicionar Movimentação"}</Text>

          <Text>Data (dd/mm/aaaa)</Text>
          <TextInput style={styles.input} value={data} onChangeText={setData} />

          <Text>Hora (HH:MM)</Text>
          <TextInput style={styles.input} value={hora} onChangeText={setHora} />

          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <TouchableOpacity style={[styles.tipo, tipo === "entrada" && styles.tipoAtivo]} onPress={() => setTipo("entrada")}>
              <Text>Entrada</Text>
            </TouchableOpacity>
            <View style={{ width: 8 }} />
            <TouchableOpacity style={[styles.tipo, tipo === "saida" && styles.tipoAtivo]} onPress={() => setTipo("saida")}>
              <Text>Saída</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ marginTop: 10 }}>Valor</Text>
          <TextInput keyboardType="numeric" style={styles.input} value={valor} onChangeText={setValor} />

          <Text>Produto</Text>
          <TextInput style={styles.input} value={produto} onChangeText={setProduto} />

          <Text>Observação</Text>
          <TextInput style={styles.input} value={observacao} onChangeText={setObservacao} />

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Salvar" onPress={salvar} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 6, marginTop: 6 },
  tipo: { padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 6 },
  tipoAtivo: { backgroundColor: "#e6f0ff", borderColor: "#2B8AF6" },
});
