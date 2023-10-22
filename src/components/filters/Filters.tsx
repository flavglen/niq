import React, { useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useProductContext } from '../../context/productContext';


const PRODUCT_END_POINT = 'https://fakestoreapi.com/products';

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column
`;

const FilterRow = styled.div`
  flex: 1;
`;

const Filters = () => {
    const {
        selectedProducts,
        setSelectedProducts,
        setSelectedProductId,
        selectedProductId
    } = useProductContext();
    const [selectedCategory, setSelectedCategory] = React.useState<string>('');
    const [categories, setCategories] = React.useState<string[]>([]);

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleCategorySelectionChange = (e: SelectChangeEvent) => {
        const selectedCategory = e.target.value;
        setSelectedCategory(selectedCategory);
        if (selectedCategory) {
            getProductsbyCategory(selectedCategory);
            setSelectedProductId('');
        }
    }

    const handleProductSelectionChange = (e: SelectChangeEvent<string | number>) => {
        const productId = e.target.value;
        if (productId) {
            setSelectedProductId(productId);
        }
    }

    const getAllCategories = () => {
        fetch(`${PRODUCT_END_POINT}/categories`)
            .then(res => res.json())
            .then(categories => setCategories(categories))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    const getProductsbyCategory = (category: string) => {
        fetch(`${PRODUCT_END_POINT}/category/${category}`)
            .then(res => res.json())
            .then(products => {
                setSelectedProducts(products);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    const clearFilter = (type: string) => {
        if (type === 'category') {
            // clears the selected product context
            setSelectedProducts([]);
            setSelectedCategory('');
            setSelectedProductId('');
        } else {
            // clears the selected product id context
            setSelectedProductId('');
        }
    }

    return (
        <FilterWrapper>
            <FilterRow>
                <FormControl variant="outlined" style={{ width: '350px' }}>
                    <InputLabel id="dropdown-label">Category</InputLabel>
                    <Select
                        labelId="dropdown-label"
                        value={selectedCategory}
                        onChange={handleCategorySelectionChange}
                        label="Select a Category"
                    >
                        {
                            categories.map((category,i) => (
                                <MenuItem key={i} value={category}>{category}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <IconButton onClick={() => clearFilter('category')}
                    color="primary"
                >
                    <Close fontSize="large" />
                </IconButton>
            </FilterRow>

            <FilterRow style={{ marginTop: 15 }}>
                <FormControl variant="outlined" style={{ width: '350px' }}>
                    <InputLabel id="dropdown-label">Products</InputLabel>
                    <Select
                        labelId="dropdown-label"
                        value={selectedProductId}
                        onChange={handleProductSelectionChange}
                        label="Select a Product"
                    >
                        {
                            selectedProducts.map(product => (
                                <MenuItem key={product.id} value={product.id}>{product.title}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <IconButton onClick={() => clearFilter('product')}
                    color="primary"
                >
                    <Close fontSize="large" />
                </IconButton>
            </FilterRow>
        </FilterWrapper>
    )
}

export default Filters;