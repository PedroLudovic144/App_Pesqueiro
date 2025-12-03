import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Pesqueiro {
  id: string;
  nome: string;
  avaliacao: number;
  totalAvaliacoes: number;
  imagem: any;
  endereco: string;
  descricao: string;
}

export default function SearchPesqueirosScreen() {
  const [pesqueiros, setPesqueiros] = useState<Pesqueiro[]>([]);
  const [pesqueirosFiltered, setPesqueirosFiltered] = useState<Pesqueiro[]>([]);
  const [busca, setBusca] = useState('');
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // Dados mockados - você pode integrar com API depois
      const dados: Pesqueiro[] = [
        {
          id: '1',
          nome: 'Pesqueiro Cantareira',
          avaliacao: 4.3,
          totalAvaliacoes: 667,
          imagem: require('../assets/images/pesqueirocantareira.png'),
          endereco: 'Av. Luís Carlos Gentile de Laet, 2500 - Tremembé, São Paulo',
          descricao:
            'Pesqueiro da zona norte de São Paulo. Av. Luís Carlos Gentile de Laet, 2500. Contato: 2204-7754',
        },
        {
          id: '2',
          nome: 'Pesqueiro do Arnaldo',
          avaliacao: 4.8,
          totalAvaliacoes: 988,
          imagem: require('../assets/images/pesqueiroarnaldao.png'),
          endereco: 'Rua do Lago Azul, 45 - Mairiporã, São Paulo',
          descricao:
            'Ambiente familiar com restaurante e lagoas bem cuidadas. Ideal para finais de semana.',
        },
        {
          id: '3',
          nome: 'Pesqueiro Paraíso',
          avaliacao: 4.5,
          totalAvaliacoes: 542,
          imagem: require('../assets/images/pesqueiroparaiso.jpg'),
          endereco: 'Estrada dos Pinheiros, 900 - Atibaia, São Paulo',
          descricao:
            'Pesqueiro tranquilo com excelente estrutura e boa variedade de peixes.',
        },
        {
          id: '4',
          nome: 'Pesqueiro Lagoa Azul',
          avaliacao: 4.6,
          totalAvaliacoes: 423,
          imagem: require('../assets/images/pesqueirocantareira.png'),
          endereco: 'Estrada Rural, 1500 - Nazaré Paulista',
          descricao: 'Lagoa com peixes variados e infraestrutura completa.',
        },
      ];

      setPesqueiros(dados);
      setPesqueirosFiltered(dados);

      // Carregar favoritos
      const favoritosData = await AsyncStorage.getItem('favoritos');
      if (favoritosData) {
        setFavoritos(JSON.parse(favoritosData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const handleBusca = (texto: string) => {
    setBusca(texto);

    if (texto.trim() === '') {
      setPesqueirosFiltered(pesqueiros);
    } else {
      const filtrados = pesqueiros.filter((pesqueiro) =>
        pesqueiro.nome.toLowerCase().includes(texto.toLowerCase())
      );
      setPesqueirosFiltered(filtrados);
    }
  };

  const toggleFavorito = async (pesqueiroId: string) => {
    try {
      let novosFavoritos = [...favoritos];

      if (novosFavoritos.includes(pesqueiroId)) {
        novosFavoritos = novosFavoritos.filter((id) => id !== pesqueiroId);
      } else {
        novosFavoritos.push(pesqueiroId);
      }

      setFavoritos(novosFavoritos);
      await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  const renderPesqueiroCard = ({ item }: { item: Pesqueiro }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailsFisher', { pesqueiro: item })}
    >
      <View style={styles.cardImageContainer}>
        <Image source={item.imagem} style={styles.cardImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorito(item.id)}
        >
          <Ionicons
            name={favoritos.includes(item.id) ? 'heart' : 'heart-outline'}
            size={24}
            color={favoritos.includes(item.id) ? '#ef4444' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nome}</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#ffc107" />
          <Text style={styles.ratingText}>
            {item.avaliacao} ({item.totalAvaliacoes})
          </Text>
        </View>

        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.descricao}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.enderecoContainer}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.enderecoText} numberOfLines={1}>
              {item.endereco}
            </Text>
          </View>
          <TouchableOpacity style={styles.verMaisButton}>
            <Text style={styles.verMaisText}>Ver Mais</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pesqueiros Próximos</Text>
        <Text style={styles.headerSubtitle}>Explore e escolha o melhor</Text>
      </View>

      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pesqueiro por nome..."
          value={busca}
          onChangeText={handleBusca}
          placeholderTextColor="#ccc"
        />
        {busca !== '' && (
          <TouchableOpacity onPress={() => handleBusca('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Resultado da Busca */}
      {busca !== '' && (
        <View style={styles.resultInfo}>
          <Text style={styles.resultText}>
            {pesqueirosFiltered.length} resultado{pesqueirosFiltered.length !== 1 ? 's' : ''} encontrado{pesqueirosFiltered.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Lista de Pesqueiros */}
      <FlatList
        data={pesqueirosFiltered}
        keyExtractor={(item) => item.id}
        renderItem={renderPesqueiroCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🐟</Text>
            <Text style={styles.emptyTitle}>Nenhum pesqueiro encontrado</Text>
            <Text style={styles.emptyText}>
              {busca ? 'Tente outro termo de busca' : 'Carregando pesqueiros...'}
            </Text>
          </View>
        }
      />

      {/* Botão Favoritos */}
      <TouchableOpacity
        style={styles.favoritosButton}
        onPress={() => navigation.navigate('Favoritos')}
      >
        <Ionicons name="heart" size={24} color="#fff" />
        <View style={styles.favoritosCount}>
          <Text style={styles.favoritosCountText}>{favoritos.length}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2B8AF6',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#e0e0e0',
    fontSize: 14,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  resultInfo: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImageContainer: {
    position: 'relative',
    height: 150,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  enderecoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  enderecoText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
    flex: 1,
  },
  verMaisButton: {
    backgroundColor: '#2B8AF6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  verMaisText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  favoritosButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ef4444',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  favoritosCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ffc107',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritosCountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});