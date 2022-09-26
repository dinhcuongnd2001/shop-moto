import React, { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { dataContext } from '../context/DataProvider'
import styled from 'styled-components';

import { db, Auth } from '../firebase/config';

const NavBarForm = styled.div`
  flex: 0 0 15%;
  height: 100vh;
  background-color: #f2f2f2;
`;

function Navbar() {

  /* 
    check the all colection
  */

    // console.log(db.getCollection());

  const { products, loading } = useContext(dataContext);
  // console.log({products, loading});
  const [trademarks, setTrademarks] = useState([]);

  useMemo(() => {
    const data = loading ? [] : new Set(products.map(item => item.trademark));
    const trademarkArray = [...data];
    setTrademarks(trademarkArray);
  }, [products])
  // console.log(trademarks);
  const listItem = loading ? [] : trademarks.map(trademark => ({ label: trademark, key: trademark }))
  const items = [
    {
      label: 'Trademark',
      key: 'trademark',
      children: [
        ...listItem
      ]
    },
  ];
  return (
    <NavBarForm>
      <Menu title='this is the menu' mode='horizontal' items={items} />
    </NavBarForm>
  )
}

export default Navbar
