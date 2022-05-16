import React, { useState, useEffect } from "react";

// import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth";
import { addCategory,deleteCategory,getAllCategories } from "./categoryAPI";
import AdminSidebar from "../AdminSidebar";
import { useNavigate } from "react-router-dom";

const Category = () => {
  //database bata liyoum bhane array ma line

  const { user } = isAuthenticated();
  const { token } = isAuthenticated();

  const navigate = useNavigate()

  const [category_name, setCategoryName] = useState('')//yo tai add garna ko lagi

  //here sabai categories tai eta ayera bascha use state ko categories ma
  //tyo categores tai hamile categoresAPI bata ai racha
  const [categories, setCategories] = useState([]);
  const [error,setError]= useState('')
  const [success,setSuccess]=useState('')

  //ekchoti page load huda kheri load hunu paryo so square brakcet
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
  }, [success]); //page load hune time ma matra run hunu paryo
  //hamile page refresh garoum bhane matra hamile naya catories dekauchya
  //success change bhyo bhane useeffect load hunu paryo
  //so that new category jun add garyoum tyo abha display huncha



  const addcategory=()=>{
    
    setSuccess('')
    addCategory({category_name},token)//hamile back end ma object bahnyera pathuacunu parcha so yo we need to object chaincha
    //category_name
    .then(data=>{

      if(data.error){
        setSuccess('')//yedi error dekhyou bhane success ko result dekhuna mildena so we need to let success be empy
        setError(data.error)
      }
      else{
        setError('')//same as before
        setSuccess('Category added successfully')
        setCategoryName('')//here jaba success huncha value add garda tyo text box khali hunu parcha after category ma value add huncha 
      }
    })
    .catch(err=>console.log(err))
    
  }


  const deletecategory=(id)=>{

    setSuccess('')
  deleteCategory(id,token)
  .then(data=>{
    if(data.error){
      setSuccess('')
      setError(data.error)
    }
    else{
      setError('')
      setSuccess('Category deleted successfully')
      
    }
  })
  .catch(err=>console.log(err))
  }
  
  // to show error
  const showError = () => {//yo tai backend ko validation error haru
    if (error) {
      return <div className="alert alert-danger">{error}</div>;//yo error display garne bhyo
    } else {
      return (
        <div className="alert alert-danger" style={{ display: "none" }}></div>//display none gareko yedi sucess bhyo bhane so none garnu parcha pachi ko lagi
      );
    }
    // return <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>{error}</div>
  };

  // to show success/ user is added
  const showSuccess = () => {//
    if (success) {
      return (
        <div className="alert alert-success">
          {success}
        </div>
      );
    }
  };
  //here yeta samma register matra hunch abut nor verfication
  //*
  
  


  return (
    <>
     
      <div className="row">
        <div className="col-md-3">
          <AdminSidebar />
        </div>
        <div className="col-md-9">
          <h3 className="my-3 text-center"> categories</h3>
          <div className="container">
          {showError()}
          {showSuccess()}
            <table className="table">
              <thead>
                <tr>
                  <td>S .No</td>
                  <td>Category Name</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {categories.map((item, i) => (//map tai sabai array ma bhayeko category item haru display garna ko lagi.Here i+1 tai 1 dekhi suru huna ko lagi
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.category_name}</td>

                    {/* yo category name tai hamile category ko model bata leko which name is category_name . here item.category_name tai display garna ko lagi*/}
                    <td>
                      <button className="btn btn-warning"
                      onClick={()=>navigate(`/admin/categoryupdate/${item._id}`)}//jun item ma click garyoum edit ko lagi tei item._id ho

                      >EDIT</button>
                      <button className="btn btn-danger pe-2"
                      onClick={()=>
                      deletecategory(item._id)
                      }//database ma underscore id nai save huncha so yesri nai save hune
                      >DELETE</button>
                    </td>
                  </tr>
                ))}
                <tr>
                 {/* colspan ={2} since it t will take 2 column of table */}
                  <td colSpan={2}><input className="form-control" type={'text'} placeholder='input category name'
                    onChange={(e)=>{
                      setCategoryName(e.target.value)//here tyo naya category add garne bela e.target.value ma bascha ra setCategoryName usestate le tai ctegory_name ko value update garcha ra add garcha
                    }} value ={category_name}  // here value abha setcategoryname abha empty huncha so tya ko empty value eta ayera bascha so text box tai empty bhyo
                

                  /></td>
                  <td><button className="btn btn-warning"
                  onClick={()=>{
                     
                     addcategory()

                  }}
                  >Add</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Category;
//yo page tai admin le matra herna paune bhayio
