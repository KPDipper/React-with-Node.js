import React, { useState, useEffect,useRef} from "react";//submit garda file clear hudena so ref le le tai path lai null garcha//aru bela 
import AdminSidebar from "../AdminSidebar";
import { getAllCategories } from "../category/categoryAPI";
import { addProduct } from "./productAPI";

const Addproduct = () => {


  const file_ref= useRef()

  const select_ref= useRef()//yesko path  null garna ko lagi yo duita bahyo refencrece diyera path null garne
  const [categories, setCategories] = useState([]); //sab categories tai array ma aucha//here yo tai backend ma apthuna ko lagi

  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    product_image: "",
    count_in_Stock: "",
    category: "",
    formData:""//yo file bakcend pathuna ko lagi 
  }); //yo tai backe end ma pathune ko lagi

  const {
    product_name,
    product_price,
    product_description,
    product_image,
    count_in_Stock,
    category,
    formData
  } = product; //esle yeta layera product ko value save garcha handlechange le
  //then it will display on onchange

  const [error,setError]= useState('')
  const [success,setSuccess]=useState('')

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          
          setCategories(data); //success ko laagi now API bata   getAllCategories() aucha which data ta hami categories ma save garyou ra teslai ta hami tala display garcyou maping garera
          setProduct({...product,formData:new FormData})//??
        }

      })
      .catch((err) => console.log(err));
  }, [success]); //categories change hudena products ma so ekchoti load bhaepachi pugcha
  //categories ma kei change na garnu prda kheri product ma as it exist a multiple options so page ekchoti load bhayepachi sabai  categories options ma dekhyae pugcha
 //success bhaye pachi tai form data initilaze hunu parne

  const handleChange = (name) => (event) => {

    if (name === 'product_image') {
      setProduct({ ...product, [name]: event.target.files[0] })
      formData.set(name, event.target.files[0])
  }
  else {
      setProduct({ ...product, [name]: event.target.value })
      formData.set(name, event.target.value)
  }
    // //esle mathi lagera value save garcha
    // // event.preventDeault();
    // setProduct({...product, [name]: event.target.value }); //here tala onchange ma product_name athawa aru product_price aucha event ma then that value is pass on tala ko product_ame athawa aru value ma display huncha
    // //tala ko value yeta ayera set huncha then tala gayera feri value ma display huncha
  };

const clickSubmit = event=>{//here submit garna ko lagi ho after we add all the product
  setError('')
  setSuccess(false)
  event.preventDefault()
  addProduct(formData)//here  formData pass garnu paryo //here use stateko product pass garne backend ma//here laready usestate ma cha so no need to convert to string
  .then(data=>{
    if(data.error){
      setSuccess("")
      setError(data.error)
    }
    else{
      setError("")
      setProduct({
        product_name: '',
        product_price: '',
        product_description: '',
        product_image: '',
        count_in_Stock: '',
        category: ''
    })//here yedi success bhyepachi form khali hunu paryo so yeslai sab empty parne

      file_ref.current.value =''
      select_ref.current.value=''//here yo react kai mathod ho not that we created something it make that path empty

      setSuccess(true)
    }
  })
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
          New Product added successfully
        </div>
      );
    }
  };
  //here yeta samma register matra hunch abut nor verfication
  //*

  return (
    <div>
     
      {showError()}
      {showSuccess()}
      <div className="container-fluid custom-row">
        <div className="row ">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h3 className="my-3 text-center">Add Product</h3>
            <hr />
            <div className="container p-5">
              <label htmlFor="product_name">Product Name:</label>
              <input
                className="form-control mb-2"
                type={"text"}
                id="product_name"
                onChange={handleChange("product_name")}
                value={product_name}
              />

              <label htmlFor="product_price">Product Price:</label>
              <input
                className="form-control mb-2"
                type={"number"}
                id="product_price"
                onChange={handleChange("product_price")}
                value={product_price}
              />

              <label htmlFor="product_description">Product Description</label>
              <textarea
                rows={5}
                className="form-control mb-2"
                id="product_description"
                onChange={handleChange("product_description")}
                value={product_description}
              />

              <label htmlFor="count_in_stock">Count in Stock:</label>
              <input
                className="form-control mb-2"
                type={"number"}
                id="count_in_Stock"
                onChange={handleChange("count_in_Stock")}
                value={count_in_Stock}
                //onchange handlechangeis is called whenever there is changed in text
              />

              <label htmlFor="category">Category:</label>
              <select
                className="form-control mb-2"
                id="category"
                onChange={handleChange("category")}
                ref={select_ref}
              >
                <option>Choose Categories</option>
                {
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))
                  //jaba map g+archyoum categories lai ra name accessed garna ko lagi category_name garchyou to display
                  //here category._id kina?
                }
              </select>

              <label htmlFor="product_image">Product Image:</label>
              <input
                className="form-control mb-2"
                type={"file"}
                id="product_image"
                onChange={handleChange('product_image')}
                ref={file_ref}

              />

              <center>
                <button className="btn btn-success form-control" onClick={clickSubmit} >ADD</button>
              </center>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Addproduct;
