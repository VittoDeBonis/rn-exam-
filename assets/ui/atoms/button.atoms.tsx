import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  StyleProp,
  ViewStyle
} from 'react-native';

interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onPress: () => void; // Corrected onPress type
  style?: StyleProp<ViewStyle>;
}

const Button = ({ 
  onPress, 
  title, 
  variant = 'primary',
  disabled = false,
  style
}: ButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress} 
      disabled={disabled}
    >
      <Text 
        style={[
          styles.text,
          variant === 'secondary' && styles.secondaryText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#007AFF',
  },
});

export default Button;