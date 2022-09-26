import React, {Children, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {Auth} from '../firebase/config'
import styled from 'styled-components';
import { Input, Space , Avatar, Menu } from 'antd';
import {AuthContext} from '../context/AuthProvider';
import { dataContext } from '../context/DataProvider';
import SubMenu from 'antd/lib/menu/SubMenu';
import {CaretDownOutlined, ShoppingCartOutlined} from '@ant-design/icons'


function Header() {
    const navigate = useNavigate();
    const {Search} = Input;
    const {user: {displayName, photoURL}} = useContext(AuthContext);
    const {quantity} = useContext(dataContext);
    const [visible, setVisible] = useState(false);

    const items = [
        {
            icon: <CaretDownOutlined/>,
            key: 'subMenu',
            children: [
                {
                  label: 'Update Info',
                  key: 'update',
                },
                {
                    label: 'Log Out',
                    key: 'logout'
                },
            ]
        }
    ];

    const handleSearch = (e) => {
        // 
    }

    const handleSelect = (e) => {
// '        console.log(e);'
        if(e.key === 'logout'){
            Auth.signOut();
            return;
        }
        if(e.key === 'update') {
            setVisible(true);
        }
    }

    const showCard = () => {
        
    }
    return (
        <div className='header'>
            <div className='header__symbol'>
                <h2 className='header__symbol__name'>DNC</h2>
                <h2 className='header__symbol__shop'>SHOP</h2>
            </div>
            <div className='header__search'>
                <Search onSearch={handleSearch}/>
            </div>
            <div onClick={showCard}>
                {quantity}
                <ShoppingCartOutlined/>                
            </div>

            <div className='header__info'>
                <Avatar 
                    size='large'
                    src={photoURL}
                >
                </Avatar>
                {displayName}
                <Menu 
                    mode="horizontal" 
                    items={items}
                    onClick= {handleSelect}
                />
            </div>
        </div>
  )
}

export default Header
