import React, { useState, useEffect } from "react";
import axios from "axios";

const Fetchdata = () => {
  //here axios helps to fetch from database for now lets use fake api
  const [post, setPost] = useState([]);
  // const [displaypost, setDisplaypost] = useState([]); //to display
  const [limit, setLimit] = useState([20]); //here initial value is 0//yo tai kati wota display garne limit tai tyo bela use huncha

  useEffect(() => {
    axios
      .get("http://jsonplaceholder.typicode.com/posts")
      .then(
        (response) =>
          // console.log(response.data)    //here this helps us to fetch data from json only.if you don't use .data i will show us everything
          // setLimit(limit+20)
          {setPost(response.data) //here response ma bhayeko data tai setpost ma gayera save huncha//setpost manipulates the varaible
            // setDisplaypost(post.slice(0, limit))
       
          //here setpost then saves data provide by axios and save it in "posts"
          })
      .catch((error) => console.log(error))
    //here then is used for success and catch is used for handling error
    //here paramater response and error can be named anything and those parameter are called after axios statment gets executed if it gets cont..
    //...sucess then it goes to "then" as a response and if there is an error during fetching data then it goes to catch as a 'error'.
    //here to stare the data in post we have to use setPost or to even manipulate the data

   
    //here yesma jati wota  pani data ako cha post teslai tai 0 dekhi 20 samma line  bhyo
    //here .slice le tai naya array banaucha tyo tai aba displaypost ma gayera basyo
  }, [limit]);
  //hami yesmai tai paila tala post.map tai esma garyera rakchyou.so mathi ko code use  garda jaba page load huncha tei bela data fetch bhayeko database bata
  //0 dekhi 20 samma slice hucha then it will be map as a list

  return (
    <>
      {post.slice(0,limit).map((items) =><li key={items.id}>{items.title}</li>)}

      {/* now we display it on using map method by listing the items */}

      {/* this to show and hide the data */}

     { limit<post.length && <button onClick={() => setLimit(limit+20)}>Show more</button>}

      {/* here if you click in load more now it will cross it limit and show us more data in browser ..here since it's limit +20 so it will display us more
      20 list.so overall it will show us 40 lists.
      */}

      { limit >0 && <button onClick={() => setLimit(limit-20)}>Show less</button>}
       {/* here in this code if limit of display is more than 0 then it will show us the "show less" button  */}


      {/* here for key is only used in li */}
    </>
  );
};

export default Fetchdata;
