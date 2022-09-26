import React, {useEffect, useState, createContext} from 'react'
import { Spin } from 'antd';


const dataContext = createContext();
function DataProvider({children}) {
    // the data provider
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orders ,setOrders] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const url = 'https://6320b80e82f8687273a64e83.mockapi.io/api/products';
    useEffect(() => {
      fetch(url)
      .then(dataOb => dataOb.json())
      .then(data => {
        setProducts(data)
        setLoading(false);
      });
    }, [])    
    console.log('order: ' , orders);
    // console.log('quantity: ', quantity);
    return (
      <dataContext.Provider 
        value={{products, loading , orders, setOrders, quantity,  setQuantity}}
      >
         {children}
      </dataContext.Provider>
    )

}

export default DataProvider
export {dataContext}