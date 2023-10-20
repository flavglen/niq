import React, { 
    createContext, 
    useState,
    Dispatch, 
    SetStateAction,
    useContext,
    useEffect
} from 'react';
import { IProduct } from '../components/models/Product';

type IproductContext = {
    selectedProducts: IProduct[]
    setSelectedProducts: Dispatch<SetStateAction<IProduct[]>>;
    selectedProduct: IProduct|undefined;
    setSelectedProduct: Dispatch<SetStateAction<IProduct|undefined>>;
}

const ProductContext = createContext<IproductContext | undefined>(undefined);

 const ProductProvider = ({ children }) => {
    // stores products that we get while selecting the category
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct|undefined>();

  const values = {
    selectedProducts,
    setSelectedProducts,
    selectedProduct,
    setSelectedProduct
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


export {ProductProvider, useProductContext };