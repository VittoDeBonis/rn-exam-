import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../ui/components/ProductCard';
import { useFavorites } from '../context/FavoriteContext';

const FavoriteTabScreen = () => {
  const { favorites } = useFavorites();

  const renderFavoriteProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <ProductCard product={item} />
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteProduct}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  productContainer: {
    marginBottom: 10,
  },
});

export default FavoriteTabScreen;