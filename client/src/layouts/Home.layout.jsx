import React from 'react'
import Navbar from '../components/Navbar'
// import FoodTab from '../component/FoodTab'
const Homelayout = (Component) => ({...props})=> {
  return( <>
  <Navbar></Navbar>
  {/* <FoodTab/> */}
  <div className='container mx-auto px-4 lg:px-20'>
    <Component {...props}/>
  </div>
  </>)
}

export default Homelayout