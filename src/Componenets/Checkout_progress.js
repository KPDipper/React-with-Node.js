import React from 'react'
import { Link } from 'react-router-dom'

//yo tai hami kun step ma chau ahhnera dkehuna ko lagi
const Checkout_progress = ({confirmOrder,Shipping,Payment}) => {
  return (
    <>
    <div className='my-3 mx-auto container d-flex justify-content-evenly'>

                {
                    confirmOrder ?
                        <Link to='/checkout'><button className='btn btn-warning'>Confirm Order</button></Link> : <Link to='#' className='disabled'><button className='disabled'>Confirm Order</button></Link>
                }

                {
                    Shipping ?
                        <Link to='/shipping'><button className='btn btn-warning'>Shipping</button></Link> : <Link to='#'><button className='btn btn-warning disabled'>Shipping</button></Link>
                }

                {
                    Payment ?
                        <Link to='/payment'><button className='btn btn-warning'>Payment</button></Link> : <Link to='#'><button className='btn btn-warning disabled'>Payment</button></Link>
                }

       
            </div>
    </>
  )
}

export default Checkout_progress