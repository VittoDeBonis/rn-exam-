import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface ProductFiltersProps {
  onFilterChange: (category: string, sortBy: string) => void;
  categories: string[];
}

export const ProductFilters = ({ onFilterChange, categories }: ProductFiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('none');

  const handleFiltersChange = (category: string, sort: string) => {
    setSelectedCategory(category);
    setSelectedSort(sort);
    onFilterChange(category, sort);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
        <Text style={styles.label}>Categoria</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(value) =>
            handleFiltersChange(value, selectedSort)
          }
          style={styles.picker}
        >
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.label}>Ordina per</Text>
        <Picker
          selectedValue={selectedSort}
          onValueChange={(value) =>
            handleFiltersChange(selectedCategory, value)
          }
          style={styles.picker}
        >
          <Picker.Item label="Nessun ordine" value="none" />
          <Picker.Item label="Valutazione (alta)" value="rating_desc" />
          <Picker.Item label="Valutazione (bassa)" value="rating_asc" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterSection: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});