import React from 'react'

import styled from 'styled-components'
import Header from './Header'
import Navbar from './Navbar'
import Motos from './Motos'


const HomeContent = styled.div`
  display: flex;
  flex-wrap: wrap
`;

function Home() {
  return (
    <HomeContent>
        <Header/>
        <Navbar />
        <Motos />
    </HomeContent>
  )
}

export default Home
