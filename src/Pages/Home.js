import React from 'react'
import Carousel from '../Componenets/Carousel'
import Footer from '../Componenets/Footer'
import Navbar from '../Componenets/Navbar'
import Products_in_Users_Page from '../Componenets/product/Products_in_Users_Page'
import Products from '../Componenets/Products'
import Recommend from '../Componenets/Recommend'

const Home = () => {
    return (
        <div>
            
            <Carousel/>
            {/* <Products/> */}
            <Products_in_Users_Page/>
            <Recommend />
            
        </div>
    )
}

export default Home
