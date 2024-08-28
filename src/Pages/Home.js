import React, { useEffect, useState } from 'react'
import Carousel from '../Components/Carousel'
import '../Components/Style.css'
import SignatureFabrics from '../Components/SignatureFabrics'
import MostSellingProducts from '../Components/MostSellingProductsCarousel'

import axios from 'axios';
import Cosmaticcards from '../Components/Cosmaticcards'
const Home = () => {
     const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
         const response = await axios.get("https://api.homeessentialshive.co.uk/api/products/most-selling");
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching most selling products:', error);
      }
    };

    fetchProducts();
  }, []);
   const [Cosmatic, setCosmatic] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
         const response = await axios.get("https://api.homeessentialshive.co.uk/api/products/most-selling");
        setCosmatic(response.data);
      } catch (error) {
        console.error('Error fetching most selling products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
    <Carousel/>
    <div className='container'>
    <SignatureFabrics/>

        <div className='row' >
          <div className='title-section'>
        <h4 >SHOP OUR SIGNATURE FABRICS</h4>
        <p>CHECKOUT OUR SHAWL COLLECTION</p>
      </div>
           </div>

        </div>
        <div className='container'>
  <div className='row w-100 justify-content-center'>
    <div className='col-md-6 col-12 col-lg-6'>
      <div className='row ms-5 '>
        <div className='col-md-6 col-12  mt-2'>
          <img src='/Images/Group 11.png' alt='unstiched' className=''/>
          {/* <p className='h5 mt-2 text-center'>Kurti</p>
          <p className='mt-1 text-center'>Shop Now</p> */}
        </div>
        <div className='col-md-6 col-12  mt-2'>
          <img src='/Images/Group 12.png' alt='formal' className=''/>
          {/* <p className='h5 mt-2 text-center'>Formal</p>
          <p className='mt-1 text-center'>Shop Now</p> */}
        </div>
        <div className='col-md-6 col-12 mt-4'>
          <img src='/Images/Group 11.png' alt='unstiched' className=''/>
          {/* <p className='h5 mt-2 text-center'>Kurti</p>
          <p className='mt-1 text-center'>Shop Now</p> */}
        </div>
        <div className='col-md-6 col-12  mt-4'>
          <img src='/Images/Group 12.png' alt='formal' className=''/>
          {/* <p className='h5 mt-2 text-center'>Formal</p>
          <p className='mt-1 text-center'>Shop Now</p> */}
        </div>
      </div>
    </div>
    <div className='col-md-4 col-12 col-lg-6 ps-2'>
      <img src='/Images/Group 14.png' alt='unstiched' className='unstiched '/>
      <p className='h5 mt-2 text-center'>Unstiched</p>
      <p className='mt-1 text-center'>Shop Now</p>
    </div>
  </div>
  <div className='row' >
    <div className='col-lg-12 col-md-12 col-sm-12'>
       <div className='title-section'>
        <h4>MOST SELLERS</h4>
        <MostSellingProducts products={products} />
      </div>
    </div>
</div>
</div>
<div className='col-lg-12 col-md-12 col-sm-12'>
        <img src='/Images/comatic.png' alt='cosmatics banner' className='w-100 h-50'/>
    </div>
    <div className='container'>
        <div className='row'>
            <div className='col'>
                 <Cosmaticcards products={Cosmatic} />
            </div>
        </div>
    </div>

</div>
  )
}

export default Home