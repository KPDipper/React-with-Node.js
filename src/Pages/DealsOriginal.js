import React, { useState,useEffect } from "react";
import Categories from "../Componenets/Categories";
import DisplayProducts from "../Componenets/DisplayProducts";
import { getFilteredProducts } from "../Componenets/product/productAPI";
import Products_in_Users_Page from "../Componenets/product/Products_in_Users_Page";
import { productPrices } from "../Componenets/ProductPrice";
import Radio from "../Componenets/Radio";

const Deals = () => {
  //hamile jun filter garchyoum radio and checks click garera tei filter bhayeko value useState ma save hunu paryo ra update hunu paryo

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState(-1);
  const [limit, setLimit] = useState(8); //yo tai user ko lagi limit ho that means ekchoti ma ati dekhna milcha
  const [skip,setSkip] = useState(0)
  const [filteredResult,setFilteredResult]=useState([])//proudcts haru filter bhako tai yesma aunu aryo
  const [size,setSize]=useState(0)
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
        setSize(data.size)
        setSkip(0)
      }
    })
    .catch(err=>console.log(err))
  },[myFilters])


  
  //yesko ka tai
  const handlePrice = (index) => {
    const data = productPrices;
    let result = [];

    // for (let key in data) {
    //   if (data[key]._id === index) {
    //     result = data[key].value;
    //   }
    // }
    // return result;

    result=data.find(item=>item._id==index)
    return result.value;
  };
  

  //this is only for categories
  const handleFilters = (filters, filterby) => {
    const newFilter = { ...myFilters }; //yo tai paila ko filter tai aunu paryo ra naya filter cha bhane add huncha
    newFilter.filters[filterby] = filters;
    //filter:{category:[mobile],price:[1000,9999]}
    //abha tai yo filter tai new filer ma add bhyo
    //filters[category]:[mobile,laptop],price:[]
    //setmyfilter le newfilter ma gayer halcha

    if (filterby === "product_price") {
      let priceValue = handlePrice(filters);
      newFilter.filters[filterby] = priceValue;
    }

    setMyFilters(newFilter); //category cha bhane directly set garda huncha
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            Categories
            <Categories
              passing_handleFilters={(filters) => handleFilters(filters, "category")}
            />
            {/* handle filter ma filter pass garyo yeslai call gareko */}
            Prices
            <Radio
              passing_handleFilters={(filters) =>
                handleFilters(filters, "product_price")
              }
            />
          </div>
          <div className="col-md-10">
           <DisplayProducts products={filteredResult}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deals;
