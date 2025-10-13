import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditScreen() {
  const [nome, setNome] = useState<string>("Pesqueiro Cantareira");
  const [endereco, setEndereco] = useState<string>("Av. Luís Carlos Gentile de Laet...");
  const [descricao, setDescricao] = useState<string>("Pesqueiro da zona norte de SP...");
  const [imagem, setImagem] = useState<string>('https://picsum.photos/400/200');

  // 📂 Escolher imagem da galeria
  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à galeria!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  // 📸 Tirar foto com a câmera
  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  // 💾 Botão Salvar (futuramente chamará a API)
  const salvarAlteracoes = () => {
    // Exemplo simples de validação
    if (!nome || !endereco || !descricao) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar!');
      return;
    }

    // Aqui futuramente você vai fazer um POST ou PUT pra API
    // Exemplo:
    // await axios.put('https://suaapi.com/pesqueiro/1', { nome, endereco, descricao, imagem })

    Alert.alert(
      'Sucesso 🎣',
      'As alterações foram salvas (integração com API em breve)!'
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Editar informações</Text>

      <Text style={styles.label}>Nome do pesqueiro</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Endereço do pesqueiro</Text>
      <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

      <Text style={styles.label}>Descrição do pesqueiro</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Image source={{ uri: imagem }} style={styles.imagem} />

      <TouchableOpacity style={styles.botao} onPress={escolherImagem}>
        <Text style={styles.txtBotao}>📂 Escolher imagem da Galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: '#2ecc71', marginTop: 10 }]}
        onPress={tirarFoto}
      >
        <Text style={styles.txtBotao}>📸 Tirar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: '#27ae60', marginTop: 25 }]}
        onPress={salvarAlteracoes}
      >
        <Text style={styles.txtBotao}>💾 Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  label: { fontSize: 16, fontWeight: '500', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginTop: 5
  },
  imagem: { width: '100%', height: 200, marginVertical: 20, borderRadius: 10 },
  botao: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },
  txtBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
