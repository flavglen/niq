import React, {useMemo, useEffect} from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useProductContext } from '../../context/productContext';
import { Close } from '@mui/icons-material';


const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column
`;

const FilterRow = styled.div`
  display: flex;
`;

const Filters = () => {
  const { selectedProducts, setSelectedProducts, setSelectedProduct} = useProductContext()
  const [selectedCategory, setSelectedCategory] = React.useState();
 // const [selectedProduct, setSelectedProduct] = React.useState();
  const [categories, setCategories] = React.useState<string[]>([]);

  useEffect(() => {
    getAllCategories();
  }, [])

  const handleCategorySelectionChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    if(selectedCategory) {
        getProductsbyCategory(selectedCategory);
    }
  }

  const handleProductSelectionChange = (e) => {
    const product = e.target.value;
    if(product) {
       const selectedProduct =  getProductbyId(product);
       setSelectedProduct(selectedProduct);
    }
  }

  const getAllCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(categories=>setCategories(categories))
  }

  const getProductsbyCategory = (category: string) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res=>res.json())
            .then(products=> { 
                setSelectedProducts(products);
                 console.log('xxxx',products)
            })
  }

  const getProductbyId = (id: number) => {
    const selectedProduct = selectedProducts.find(product => product.id === id);
    return selectedProduct;
  }

  return (
    <FilterWrapper>
        <FilterRow>
            <FormControl variant="outlined" style={{ minWidth: 300 }}>
                <InputLabel id="dropdown-label">Category</InputLabel>
                <Select
                labelId="dropdown-label"
                id="dropdown"
                value={selectedCategory}
                onChange={handleCategorySelectionChange}
                label="Select an Option"
                >
                {
                    categories.map(category =>(
                        <MenuItem value={category}>{category}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            <IconButton
                    color="primary" 
                >
                <Close fontSize="large" />
            </IconButton>
        </FilterRow>

        <FilterRow style={{marginTop: 15}}>
            <FormControl variant="outlined" style={{ minWidth: 300 }}>
                <InputLabel id="dropdown-label">Products</InputLabel>
                <Select
                labelId="dropdown-label"
                id="dropdown"
                value={selectedCategory}
                onChange={handleProductSelectionChange}
                label="Select an Option"
                >
                {
                    selectedProducts.map(product =>(
                        <MenuItem value={product.id}>{product.title}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            <IconButton
                    color="primary" 
                >
                <Close fontSize="large" />
            </IconButton>
        </FilterRow>
    </FilterWrapper>
  )
}

export default Filters;