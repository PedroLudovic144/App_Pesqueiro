import "react-native-get-random-values";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'RecordCliente'>;

export default function RecordClienteScreen({ navigation }: Props) {
  const [cpf, setCpf] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />

          <Text style={styles.title}>Cadastro</Text>

          <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
          <TextInput placeholder="Nome" style={styles.input} />
          <TextInput placeholder="Senha" secureTextEntry style={styles.input} />
          <TouchableOpacity onPress={() => navigation.navigate('TermsAndPolitics')}>
                    <Text style={styles.linkText}>
                      Ao cadastrar suas informações, você concorda com nossos{' '}
                    <Text style={styles.linkBlue}>
                      Termos de Uso e Política de Privacidade   
                    </Text>
                    </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#005B96',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    backgroundColor: '#2B8AF6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
    linkText: {
    color: '#222',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  linkBlue: {
    color: '#0B84E6',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: '500',
  },
});
