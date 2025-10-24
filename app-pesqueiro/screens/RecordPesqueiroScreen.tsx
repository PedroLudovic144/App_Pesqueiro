import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterPesqueiroScreen: React.FC<Props> = ({ navigation }) => {
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [nomeFantasia, setNomeFantasia] = useState<string>("");
  const [cep, setCep] = useState<string>("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
            <Text style={styles.headerText}>Rafiq Aboarrage </Text>
          </View>
        </View>

        <View style={styles.form}>
          {/* CPF + Estado */}
          <View style={styles.row}>
            <TextInputMask
              type={"cpf"}
              value={cpf}
              onChangeText={setCpf}
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="CPF"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Estado"
              value={estado}
              onChangeText={setEstado}
            />
          </View>

          {/* Cidade + Bairro */}
          <View style={styles.row}>
            <View style={[styles.pickerContainer, { flex: 1, marginRight: 8 }]}>
              <Picker
                selectedValue={cidade}
                onValueChange={(itemValue) => setCidade(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Cidade" value="" />
                <Picker.Item label="São Paulo" value="sp" />
                <Picker.Item label="Rio de Janeiro" value="rj" />
              </Picker>
            </View>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Bairro"
              value={bairro}
              onChangeText={setBairro}
            />
          </View>

          {/* Endereço + Número */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Número"
              keyboardType="numeric"
              value={numero}
              onChangeText={setNumero}
            />
          </View>

          {/* Nome Fantasia + CEP */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="Nome Fantasia"
              value={nomeFantasia}
              onChangeText={setNomeFantasia}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="CEP"
              keyboardType="numeric"
              value={cep}
              onChangeText={setCep}
            />
          </View>

          {/* Botão */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Editar")}
          >
            <Text style={styles.buttonText}>Cadastre</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterPesqueiroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#2B8AF6",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  form: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  picker: {
    height: 44,
  },
  button: {
    backgroundColor: "#2B8AF6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
