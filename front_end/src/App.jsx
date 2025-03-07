import React from 'react'
import './App.css'
import Header from './components/home/Header'
import Navbar from './components/home/Navbar'
import Footer from './components/home/Footer'
import Slider from './components/home/Slider'
import BeautyTrands from './components/home/BeautyTrands'
import TopCollections from './components/home/TopCollections'
import ExclusiveProducts from './components/home/ExclusiveProducts'
import BannerSection from './components/home/BannerSection'
import TopNewsBlogs from './components/home/TopNewsBlogs'

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Slider />
      <BeautyTrands />
      <TopCollections/>
      <ExclusiveProducts />
      <BannerSection />
      <TopNewsBlogs />
      <Footer />
    </>
  )
}

export default App