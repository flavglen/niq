import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { IProduct } from '../models/Product';

type IproductContext = {
  selectedProducts: IProduct[]
  setSelectedProducts: Dispatch<SetStateAction<IProduct[]>>;
  selectedProductId: number | string;
  setSelectedProductId: Dispatch<SetStateAction<number | string>>;
}

const ProductContext = createContext<IproductContext | undefined>(undefined);

const ProductProvider = ({ children }) => {
  // stores products that we get while selecting the category
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  // store selected product id for product detail page
  const [selectedProductId, setSelectedProductId] = useState<number | string>('');

  const values = {
    selectedProducts,
    setSelectedProducts,
    selectedProductId,
    setSelectedProductId
  }

  return (
    <ProductContext.Provider value={values}>
      {children}
    </ProductContext.Provider>
  );
}

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
}


export { ProductProvider, useProductContext };