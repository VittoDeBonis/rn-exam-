import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './cart.styles';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

const ProductCard = ({ product, onPress, onAddToCart }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.imageStyle} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleStyle}>{product.title}</Text>
        <Text style={styles.priceStyle}>{product.price} $</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onAddToCart}>
          <Ionicons name="cart-outline" size={28} color={'#ffd700'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ProductCard);