import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ProductProvider, useProductContext } from '../../context/productContext';
import Filters from '../filters/Filters';
import BarChart from '../bar-chart/barChart';
import ProductTable from '../product-table/productTable';
import ProductDetailView from '../product-detail-view/productDetailView';

const DashboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const FilterColumn = styled.div`
  width: 30%;
  padding: 10px;
  background-color: #f1f1f1;
`;

const ProductDetailsWrapper = styled.div`
  width: 68%;
`;

const  Dashboard = () => {
 const { selectedProduct} = useProductContext()
  return (
        <DashboardWrapper className='dashboard'>
            <FilterColumn className='filter-column'>
                <Filters />
            </FilterColumn>

            <ProductDetailsWrapper className='product-details'>
                {!selectedProduct && (
                    <>
                    <BarChart />
                    <ProductTable />
                </>
                )}

                {selectedProduct && (
                    <ProductDetailView />
                )}

            </ProductDetailsWrapper>
        </DashboardWrapper>
  )
}

export default Dashboard;