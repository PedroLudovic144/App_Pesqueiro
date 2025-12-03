// VendaPeixeModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

export default function VendaPeixeModal({ visible, peixe, onClose, onConfirm }: any) {
  const [qtd, setQtd] = useState("1");

  useEffect(() => {
    if (peixe) setQtd("1");
  }, [peixe]);

  if (!peixe) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Vender Peixe</Text>
          <Text>{peixe.nome}</Text>
          <Text>Estoque: {peixe.quantidade}</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={qtd}
            onChangeText={setQtd}
            placeholder="Quantidade"
          />

          <View style={styles.row}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelTxt}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirm}
              onPress={() => {
                const n = Number(qtd);
                if (n > 0 && n <= peixe.quantidade) onConfirm(n);
                else alert("Quantidade inválida");
              }}
            >
              <Text style={styles.confirmTxt}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 12,
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginVertical: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  cancel: { padding: 12, backgroundColor: "#bbb", borderRadius: 8, width: "45%" },
  cancelTxt: { textAlign: "center", fontWeight: "700" },
  confirm: { padding: 12, backgroundColor: "#28a745", borderRadius: 8, width: "45%" },
  confirmTxt: { textAlign: "center", color: "#fff", fontWeight: "700" },
});
