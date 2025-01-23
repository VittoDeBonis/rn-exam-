import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { Product } from "../types/product";
import ProductCard from "../ui/components/ProductCard";
import { fetchProducts } from "../servicer/api";

interface SortOptions {
  rating_asc: string;
  rating_desc: string;
  none: string;
}

const ExploreScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<keyof SortOptions>('none');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(productId)
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  const getFilteredProducts = () => {
    let filtered = [...products];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'rating_asc') {
      filtered.sort((a, b) => Number(a.rating) - Number(b.rating));
    } else if (sortBy === 'rating_desc') {
      filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return filtered;
  };

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtri</Text>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Categoria</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.filterButton, selectedCategory === 'all' && styles.activeFilter]}
                onPress={() => setSelectedCategory('all')}
              >
                <Text>Tutte</Text>
              </TouchableOpacity>
              {Array.from(new Set(products.map(p => p.category))).map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.filterButton, selectedCategory === cat && styles.activeFilter]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Ordina per recensioni</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.filterButton, sortBy === 'none' && styles.activeFilter]}
                onPress={() => setSortBy('none')}
              >
                <Text>Nessun ordine</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, sortBy === 'rating_desc' && styles.activeFilter]}
                onPress={() => setSortBy('rating_desc')}
              >
                <Text>Più alte</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, sortBy === 'rating_asc' && styles.activeFilter]}
                onPress={() => setSortBy('rating_asc')}
              >
                <Text>Più basse</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Applica</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCardContainer}>
      <ProductCard product={item} />
      <TouchableOpacity 
        style={styles.favoriteIconContainer}
        onPress={() => toggleFavorite(item.id.toString())}
      >
        <Feather 
          name="heart" 
          size={24} 
          color={favorites.includes(item.id.toString()) ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterIconButton}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="filter" size={24} color="#000" />
      </TouchableOpacity>

      {renderFilterModal()}

      <FlatList
        data={getFilteredProducts()}
        renderItem={renderProductCard}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIconButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  productCardContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ExploreScreen;