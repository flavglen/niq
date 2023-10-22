import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useProductContext } from '../../context/productContext';

interface CustomTypographyProps {
  textTransform?: string;
  fontSize?: string;
  fontWeight?: string
  color?: string
}

const Text = styled(Typography)<CustomTypographyProps>`
  text-Transform: ${(props) => props.textTransform || 'lowercase'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  font-weight:  ${(props) => props.fontWeight || 'normal'};
  color:  ${(props) => props.color || 'inherit'};
`;

const ProductDetailView = () => {
  const { selectedProductId, selectedProducts } = useProductContext()

  const getProductbyId = (id: number | string) => {
    const selectedProduct = selectedProducts.find(product => product.id === id);
    return selectedProduct;
  }

  const productDetails = getProductbyId(selectedProductId);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Text variant="h1" gutterBottom fontWeight="700" fontSize="2rem">
          {productDetails?.title}
        </Text>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <Grid container style={{ color: 'grey' }}>
            <Grid item xs={12}>
              <Text variant="body1" component="span" textTransform="uppercase" >
                {productDetails?.category}
              </Text>
            </Grid>
            <Grid item xs={12}>
              <Text variant="body1" component="span" textTransform="uppercase">
                SKU: 10
              </Text>
            </Grid>
            <Grid item xs={12}>
              <Text variant="body1" component="span" color="black" fontSize="2rem" textTransform="uppercase" fontWeight="400" >
                $ {productDetails?.price}
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <img src={productDetails?.image} alt="Product Image" width={150} height={150}/>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{marginTop: 10}}>
        <Text variant="body2" gutterBottom>
          {productDetails?.description}
        </Text>
      </Grid>
    </Grid>
  )
}

export default ProductDetailView;