import React, { useState,useEffect } from "react";
import Categories from "../Componenets/Categories";
import DisplayProducts from "../Componenets/DisplayProducts";
import { getFilteredProducts } from "../Componenets/product/productAPI";
import Products_in_Users_Page from "../Componenets/product/Products_in_Users_Page";
import { productPrices } from "../Componenets/ProductPrice";
import Radio from "../Componenets/Radio";

const Deals = () => {

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState(-1);
  const [limit, setLimit] = useState(8); //here yo tai backend bata ho
  const [skip,setSkip] = useState(0)//here skip tai frontend bata ho
  const[size,setSize]=useState()
  const [filteredResult,setFilteredResult]=useState([])

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], product_price: [] } //here dubai value categroy ra price jaba hamile filter garchyoum yesma aunu paryo
  });
  
  useEffect(()=>{
 
    getFilteredProducts(sortBy,order,limit,skip,myFilters)
    .then(data=>{
      if(data.error){
        console.log(data.error)

      }
      else{
        setFilteredResult(data.filterProduct)//tya bata j pathako tyo lina ko lagi
        //yesma tai rest operator pardena since useeffect chaidena 
        setSize(data.size)
        setSkip(0)
      }
    })
    .catch(err=>console.log(err))

  },[myFilters])

  const handlePrice=(index)=>{

    const data= productPrices;
    let result=[]

    
    result=data.find(item=>item._id==index)
    return result.value;
  }

  const handleFilters=(filters,filterby)=>{

    const newFilter={...myFilters}
    newFilter.filters[filterby]=filters

    if (filterby==="product_price"){

      let priceValue=handlePrice(filters);
      newFilter.filters[filterby]=priceValue
    }

    setMyFilters(newFilter); 
    console.log(newFilter.filters)
  }

  //for load more

  const loadmore=()=>{

    let toskip = skip+limit//here skip is 0 and limit is 8 so when we click load more it increases by 8 products
    getFilteredProducts(sortBy,order,limit,toskip,myFilters)
    .then(data=>{
      if(data.error){
        console.log(data.error)

      }
      else{
        setFilteredResult([...filteredResult,...data.filterProduct])//tya bata j pathako tyo lina ko lagi//agadi ko pani product dekhakunu paryo so ... rest opertator garne jaba hami le load more garda kher
        //here filteredresult tai filtered bhayeko product dekhayuna ko lagi so paila ko ni value dekhauna ko lagi
        setSize(data.size)
        setSkip(toskip)
      }
    })
    .catch(err=>console.log(err))
   

  }


  return (
    <>
   <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            Categories
            <Categories passing_handleFilters={filters => handleFilters(filters, 'category')} />
            Prices
            <Radio passing_handleFilters={(filters) => handleFilters(filters, 'product_price')} />
          </div>
          <div className='col-md-9'>
            <DisplayProducts products={filteredResult}/>
          </div>
        </div>
      <button className="btn btn-warning" onClick={loadmore}>Load More</button>

      </div>

    </>
  )
}

export default Deals