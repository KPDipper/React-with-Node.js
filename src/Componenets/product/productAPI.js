import { API } from "../../config";

//too add new product
export const addProduct = (product) => {//here forData ko value yeta ayera bascha
  //
  console.log(product); //here product tai json format ma cha ra yo category bata ako ho
  return fetch(`${API}/addproduct`, {
    method: "POST", //user le input gareko kura haru tai backend ma patahko
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",//
    },
    body: product, //yo tai k value pathune bhanera
    //header tai authorization data type miluna ko lagi saba hami send garchyoum
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

//to show all products
export const getAllProducts=()=>{

  return fetch(`${API}/showproducts`,{

    method:"GET"
  })
  .then((res)=>res.json())
  .catch((error)=>console.log(error))
}

//to get sorted products:

export const getSortedProducts= (sortBy,order,limit)=> {//yo tai user ko bata aucha user le sort by,order and patucha

  
  return fetch(`${API}/showproducts?sortBy=${sortBy}&order=${order}&limit=${limit}`,{

    method:"GET"

  })
  .then((res)=>res.json())
  .catch((error)=>console.log(error))

}

//to get product details:
//here particular detail linu paryo bhane tai 
export const getProductDetails=(id)=>{

  return fetch(`${API}/findproduct/${id}`,{

    method:"GET"
  })
  .then(res=>res.json())
  .catch(error=>console.log(error))
}

//to get related products

export const getRelatedProducts=(id)=>{

  return fetch(`${API}/getrelatedproducts/${id}`,{
    method:"GET"
  })
  .then(res=>res.json())
  .catch(error=>console.log(error))
}

//to get filtered products:

export const getFilteredProducts=(sortBy,order,limit,skip,{filters})=>{

  let data={skip,filters}

  return fetch(`${API}/getfilteredproducts?limit=${limit}`,{
    method:"POST",
    headers:{
      Accept: "application/json",
      "Content-type":"application/json"
    },
    body:JSON.stringify(data)
  })
  .then(res=>res.json())
  .catch(error=>console.log(error))

}

//to delete producte

export const deletedProduct=(id)=>{

  return fetch(`${API}/deleteproduct/${id}`,{
    method:"DELETE"
  })
  .then(res=>res.json())
  .catch(error=>console.log(error))
}

export const updateProduct=(id,newproduct)=>{

  return fetch(`${API}/updateproduct/${id}`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      "Content-type":"application/json"
    },
    body:JSON.stringify(newproduct)
  })
  .then(res=>res.json())
  .catch(error=>console.log(error))

}