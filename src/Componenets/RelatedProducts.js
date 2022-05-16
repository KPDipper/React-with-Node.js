import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'
import { getRelatedProducts } from './product/productAPI'

//here products_details bata prdouct._id aucha ra tala yo id ma bascha ra teslai nai hamile map garyoum relatedProducts lai display gari rachyoum
const RelatedProducts = () => {//yo id product_details bata aucha

    const [relatedProducts,setrelatedProducts]=useState([])
    const [limit,setLimit]=useState(4)
    
    const params=useParams()
    const id=params.id



    useEffect(()=>{
        getRelatedProducts(id)//if backend controller function has an id then always do this 
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setrelatedProducts(data)
            }
        })
        .catch(err=>console.log(err))


    },[id])//here id change bhyo yo page tai render hunu paryo
//yo mathi ko code bhaneko load garna ko lagi samma ho
  return (
    <>
    <div className='container mx-auto p-5 my-5'>
    <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mx-auto ">
                 {/* //yo products ma tao sorted data cha */}
                 {/* hamile products ko value tai card ko props ma pathunu paryo */}

                 {
                     relatedProducts.map(item=><Card props={item}/>)
                 }
                 </div>
                 {limit<relatedProducts.length && <button className='btn btn-danger' onClick={()=>setLimit(limit+4)}>Load More</button>}
                 
    </div>

    </>
  )
}

export default RelatedProducts