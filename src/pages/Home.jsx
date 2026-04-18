import React from 'react'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white'>
    <Navbar />
    <Hero />
    </div>
  )
}

export default Home