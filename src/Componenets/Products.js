import React from 'react'

import './Products.css'

const Products = () => {
    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mx-auto w-75">
  <div className="col">
    <div className="card shadow-lg">
       <div className='card-image'>
      <img src="./img1.jpg" className="card-img-top" alt="..." />
      </div>
      <div className="card-body">
      <div className='text-center'>
        <h5 className="card-title">Card title</h5>
        <button className='btn btn-warning'>View details</button>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card  shadow-lg">
    <div className='card-image'>
      <img src="./img2.jpg" className="card-img-top" alt="..." />
      </div>
      <div className="card-body">
      <div className='text-center'>
        <h5 className="card-title">Card title</h5>
        <button className='btn btn-warning'>View details</button>
        </div>
        
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card  shadow-lg">
    <div className='card-image'>
      <img src="./img3.jpg" className="card-img-top" alt="..." />
      </div>
      <div className="card-body">
      <div className='text-center'>
        <h5 className="card-title">Card title</h5>
        <button className='btn btn-warning'>View details</button>
        </div>
       
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card  shadow-lg">
    <div className='card-image'>
      <img src="./img1.jpg" className="card-img-top" alt="..." />
      </div>
      <div className="card-body">
      <div className='text-center'>
        <h5 className="card-title">Card title</h5>
        <button className='btn btn-warning'>View details</button>
        </div>
       
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default Products
