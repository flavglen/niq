import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { useProductContext } from '../../context/productContext';
import Filters from '../filters/Filters';
import BarChart from '../bar-chart/barChart';
import ProductTable from '../product-table/productTable';
import ProductDetailView from '../product-detail-view/productDetailView';


const DashboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap:30px;
  margin-top: 25px;
`;

const FilterColumn = styled.div`
  width: 35%;
  padding: 10px;
`;

const ProductDetailsWrapper = styled.div`
  width: 63%;
`;

const Dashboard = () => {
    const { selectedProductId, selectedProducts } = useProductContext()
    return (
        <DashboardWrapper className='dashboard'>
            <FilterColumn className='filter-column'>
                <Filters />
            </FilterColumn>

            <ProductDetailsWrapper className='product-details'>
                {!selectedProducts.length && (
                    <Typography variant="body1" component="span">
                        Please select a Category
                    </Typography>
                )}
                {!selectedProductId && selectedProducts.length > 0 && (
                    <>
                        <BarChart />
                        <ProductTable />
                    </>
                )}

                {selectedProductId && (
                    <ProductDetailView />
                )}

            </ProductDetailsWrapper>
        </DashboardWrapper>
    )
}

export default Dashboard;