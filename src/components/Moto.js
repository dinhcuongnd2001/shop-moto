import React, {useContext} from 'react'

import styled from 'styled-components'
import {DollarOutlined } from '@ant-design/icons';
import {Button} from 'antd'
import { Auth } from '../firebase/config';
import {AuthContext} from '../context/AuthProvider';
import { readOrder } from '../firebase/services';
import { dataContext } from '../context/DataProvider';
const Product = styled.div`
    flex: 0 0 30%;
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    margin: 10px
`;

const DivImg = styled.div`
    flex: 0 0 100%;
    padding: 10px;
`

const ProductImg = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 15px;
`;

const ProductDetail = styled.div`
    flex: 0 0 100%;
    display: flex;
    flex-wrap: wrap;
`;

const ProductInfo = styled.div`
    flex: 0 0 100%;
    display: flex;
    justify-content: space-around; 
    align-items: center
`;

const MoreFeature = styled.div`
    flex: 0 0 100%;
    display: flex;
    justify-content: space-around; 
    align-items: center
`;

function Moto({ product }) {
    const {user:{uid}} = useContext(AuthContext);
    const {orders, setOrders, setQuantity} = useContext(dataContext);
    // console.log('re-render in moto');
    const handleAddTocard = () => {
        // update the orders
        let check = true;
        let newOrder = orders;
        for(let item of newOrder){
            if(item.id === product.id){
                item.count += 1;
                check = false;
            }
        }
        if(check){
            newOrder = [...orders, {...product, count:1}]
        }
        // console.log(newOrder);
        let quantity = newOrder.reduce((result, curr) => {
            return result += curr.count;
        }, 0);
        // console.log('quantity: ' , quantity);
        setOrders(newOrder);
        setQuantity(quantity);
    }
    // readOrder(uid)
    // .then(data => console.log(data));
    return (
        <Product>
            <DivImg>
                <ProductImg src= {product.img}/>
            </DivImg>
            <ProductDetail>
                <ProductInfo>
                    <h4>{product.name}</h4>
                    <p style={{textAlign:'center'}}> 
                        <DollarOutlined style={{marginRight:'5px'}}/>
                        {product.cost}</p>
                </ProductInfo>
                <MoreFeature>
                    <Button onClick={() => handleAddTocard()}>Add To Card</Button>
                    <Button>Show Info</Button>
                </MoreFeature>
            </ProductDetail>
        </Product>
    )
}

export default Moto
