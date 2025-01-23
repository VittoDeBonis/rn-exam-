import { Product } from "../types/product";

export type RootStackParamList = {
    ProductDetail: { product: Product };
  };
  
  export type TabParamList = {
    ExploreTab: undefined;
    FavoriteTab: undefined;
  };