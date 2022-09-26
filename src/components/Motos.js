import React, {useContext} from 'react'
import Moto from './Moto'
import {dataContext} from '../context/DataProvider';
import { Spin } from 'antd';
import styled from 'styled-components';


const Products = styled.div`
    display: flex;
    flex: 0 0 85%;
    flex-wrap: wrap;
`;

function Motos() {
    console.log('re-render in motos')
    const { products, loading } = useContext(dataContext);
    if(loading){
        return <Spin></Spin>
    }
    else {
        return (
            <Products>
                {
                    products.map((product, index) => {
                        return <Moto key={index} product = {product}></Moto>
                    })
                }
            </Products>
        )
    }
}

export default Motos
