import React, { useState, useEffect } from "react";
import Card from "../Card";
import { getSortedProducts } from "./productAPI";

const Products_in_Users_Page = () => {
  const [products, setProducts] = useState([]); //yo sorted products lina ko lagi
  //yo by default ho
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState(-1);
  const [limit, setLimit] = useState(8); //yo tai user ko lagi limit ho that means ekchoti ma ati dekhna milcha

  useEffect(() => {
    getSortedProducts(sortBy, order, limit)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProducts(data); //yo tai sorted product aucha ra tyo mathi usestae ko products ma aucha ra abha teslai nai display garchyoums
        }
      })
      .catch((err) => console.log(err));
  }, [limit])
  return <>
                 <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mx-auto w-75">
                 {/* //yo products ma tao sorted data cha */}
                 {/* hamile products ko value tai card ko props ma pathunu paryo */}
                 {
                     products.map(item=><Card props={item}/>)
                 }
                 </div>
                 <div className="text-center">

                 <button className="btn btn-warning" onClick={()=>setLimit(limit+2)}>Show More</button>
                 <button className="btn btn-danger" onClick={()=>setLimit(limit-2)}>Show Less</button>

                 </div>


  </>;
};

export default Products_in_Users_Page;
