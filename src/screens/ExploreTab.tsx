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
import { useFavorites } from "../context/FavoriteContext";

interface FilterModalProps {
  categories: string[];
  selectedCategory: string;
  sortBy: SortOption;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: SortOption) => void;
  onClose: () => void;
}

type SortOption = 'none' | 'rating_asc' | 'rating_desc' | 'price_asc' | 'price_desc';

const ExploreScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('none');
  
  const { favorites, addFavorite, removeFavorite } = useFavorites();

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

  const toggleFavorite = (product: Product) => {
    favorites.some(p => p.id === product.id) 
      ? removeFavorite(product.id.toString())
      : addFavorite(product);
  };

  const getCategories = () => {
    return ['all', ...new Set(products.map(p => p.category))];
  };

  const getFilteredProducts = () => {
    let filtered = [...products];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'rating_asc':
        filtered.sort((a, b) => Number(a.rating) - Number(b.rating));
        break;
      case 'rating_desc':
        filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      case 'price_asc':
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price_desc':
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
        break;
    }

    return filtered;
  };

  const FilterModal: React.FC<FilterModalProps> = ({
    categories,
    selectedCategory,
    sortBy,
    onCategoryChange,
    onSortChange,
    onClose
  }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtri</Text>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Categoria</Text>
            <View style={styles.buttonGroup}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterButton, 
                    selectedCategory === cat && styles.activeFilter
                  ]}
                  onPress={() => onCategoryChange(cat)}
                >
                  <Text>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Ordina per</Text>
            <View style={styles.buttonGroup}>
              {[
                { key: 'none', label: 'Nessun ordine' },
                { key: 'rating_desc', label: 'Recensioni più alte' },
                { key: 'rating_asc', label: 'Recensioni più basse' },
                { key: 'price_desc', label: 'Prezzo più alto' },
                { key: 'price_asc', label: 'Prezzo più basso' }
              ].map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.filterButton, 
                    sortBy === option.key && styles.activeFilter
                  ]}
                  onPress={() => onSortChange(option.key as SortOption)}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
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
        onPress={() => toggleFavorite(item)}
      >
        <Feather 
          name="heart" 
          size={24} 
          color={favorites.some(p => p.id === item.id) ? 'red' : 'gray'}
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

      {modalVisible && (
        <FilterModal
          categories={getCategories()}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortBy}
          onClose={() => setModalVisible(false)}
        />
      )}

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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ExploreScreen;