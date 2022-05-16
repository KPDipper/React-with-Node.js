import React, { useState, useEffect } from "react";

import { getAllCategories } from "./category/categoryAPI";

const Categories = ({ passing_handleFilters }) => {
  const [categories, setCategories] = useState([]);
  //to display  categories

  //here yo cheched ra unchecked ko lagi
  const [checked, setChecked] = useState([]);
  //to stored only chekced categories

  const handletoggle = (c) => {
    //here c bhaneko jaba kunai u sr le check box ma click garcha tei id aucha c ma category ko id
    const currentCategoryId = checked.indexOf(c);
    //to check wheter which one is already checked//paila check cha ki chaina check garne

    const newCheckedCategoryId = [...checked]; //here ...checked purano array ko ...tai value change na hos bhanera
    //here newcheckedcategoryID tai abha naya array bhyo
    //to get previous

    //line 14 gives index if present,-1 if not present

    if (currentCategoryId === -1) {
      //here checked bhyo bhane tai push hunu paryo for thay it index should be -1
      //if index -1 then we add new value to array and it be deemed checked

      newCheckedCategoryId.push(c);
    } else {
      //if laready present remove from array using splice method
      newCheckedCategoryId.splice(currentCategoryId, 1); //1 tai no. of items to remove
      //here splice (index,no. of items to remove ,items to add)here  index ma tai kun poistion hatune bhanera
      //index -poisiton where to add/remove
      //number-no. of items to remove ,1-1 items will be removed
      //0 diyo bhane no item remove huncha
    }
    //to store newly changed checked array
    setChecked(newCheckedCategoryId);

    //calling the fucntions of deals page,passing newly changed chaked array into filters
    passing_handleFilters(newCheckedCategoryId, "category");
    //yo sabai kam tai delas ma huncha
    //here yo function ma ta set garna ko lagi
    //here delas bata ko vlaue tai yeta aune bhyo
  };

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {categories.map((item, i) => {
        return (
          <div key={i} class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              onChange={() => handletoggle(item._id)}
              value={item._id} //to give individual category
              id={item._id}
            />
            <label class="form-check-label" for={item._id}>
              {item.category_name}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default Categories;
