import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    marginRight: 8,
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  detailsContainer: {
    flex: 2,
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  priceStyle: {
    fontSize: 16,
    color: '#d02d2d',
  },
  iconContainer: {
    justifyContent: 'flex-end',
  },
});

export default styles;