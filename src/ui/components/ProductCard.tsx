import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => (
  <View style={styles.card}>
    <Image 
      source={{ uri: product.image }} 
      style={styles.image} 
      resizeMode="contain"
    />
    <View style={styles.info}>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
      <Text style={styles.price}>€{product.price.toFixed(2)}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {product.description}
      </Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>★ {product.rating.rate.toFixed(1)}</Text>
        <Text style={styles.reviewCount}>({product.rating.count} recensioni)</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  info: {
    gap: 8,
  },
  category: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFB800',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});

export default ProductCard;