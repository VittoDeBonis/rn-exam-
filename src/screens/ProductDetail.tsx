import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type ProductDetailProps = {
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const ProductDetail = ({ route }: ProductDetailProps) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.headerImage} />
      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>€{product.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {product.rating.rate.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({product.rating.count} recensioni)</Text>
        </View>
        <Text style={styles.descriptionTitle}>Descrizione</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  category: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007AFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    fontSize: 16,
    color: '#FFCC00',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#757575',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});


export default ProductDetail;