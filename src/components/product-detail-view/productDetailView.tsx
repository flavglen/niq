import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useProductContext } from '../../context/productContext';

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
        <Typography variant="h1" gutterBottom style={{ fontSize: '2rem', fontWeight:'700', color: '#000' }}>
          {productDetails?.title}
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <Grid container style={{ color: 'grey' }}>
            <Grid item xs={12}>
              <Typography variant="body1" component="span" style={{ textTransform: 'uppercase' }}>
                {productDetails?.category}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" component="span" style={{ textTransform: 'uppercase' }}>
                SKU: 10
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" component="span" style={{ fontSize: '2rem', fontWeight:'400', color: '#000' }} >
                $ {productDetails?.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <img src={productDetails?.image} alt="Product Image" width={150} height={150}/>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{marginTop: 10}}>
        <Typography variant="body2" gutterBottom>
          {productDetails?.description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default ProductDetailView;