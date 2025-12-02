import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');


export default function TermsAndPoliticsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>


        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Já é cliente?{' '}
            <Text style={styles.linkBlue}>
              Entre aqui
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logo: {
    width: Math.min(300, width * 0.55),
    height: Math.min(300, width * 0.55),
    marginTop: 125,
  },
  title: {
    fontSize: 33,
    fontWeight: '700',
    color: '#0B0B0B',
    marginBottom: 14,
    textAlign: 'center',
  },
  subtitleWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 28,
    color: '#8F8F8F',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2B8AF6',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 220,
    alignItems: 'center',
    marginVertical: 16,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
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