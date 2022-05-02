//back end sanga connect garna function tai eta banune like index
//yo tai category lagi matra ho

//  import { API } from "../../config";

export const getAllCategories = () => {
  //this helps use to get all the items in categories //esma database ma kei value pathako chaina khali read garyacha so no headers and body required

  return fetch(`http://localhost:5000/api/categories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

//to add new category

export const addCategory = (category_name, token) => {
  //
  console.log(category_name); //here category_name tai json format ma cha ra yo category bata ako ho
  return fetch(`http://localhost:5000/api/addcategory`, {
    method: "POST", //user le input gareko kura haru tai backend ma patahko
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, //only used when if jasko funciton route in backend ma tai required signin chaincha
    },
    body: JSON.stringify(category_name), //yo tai k value pathune bhanera
    //header tai authorization data type miluna ko lagi saba hami send garchyoum
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

//to delete category

export const deleteCategory = (id, token) => {
  return fetch(`http://localhost:5000/api/deletecategory/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, //only used when if jasko funciton route in backend ma tai required signin chaincha
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

//to find a single category not all of them:

export const findCategory = (id) => {
  //helps to find single category item
  return fetch(`http://localhost:5000/api/findcategory/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const updateCategory = (id, category,token) => {//category_name ko object tai category  ma gayera bascha
  //helps to find single category item
  return fetch(`http://localhost:5000/api/updatecategory/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, //only used when if jasko funciton route in backend ma tai required signin chaincha
    },

    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
