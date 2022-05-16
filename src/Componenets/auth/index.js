import { API } from "../../config";

//API:http://localhost:5000/api


//for signup
export const signup = (user) => {
    return fetch(`http://localhost:5000/api/addUser`,{//backend bata tancha matra ra yeta value return huncha that means addUser ko function call huncha front end ma
    
        method:"POST",//user le input gareko kura haru tai backend ma patahko
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json'
        },
        body:JSON.stringify(user)//yo tai k vallue pathune bhanera
        //header tai authorization data type miluna ko lagi saba hami send garchyoum
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
} 



//for signin
export const signin = (user) => {
    return fetch(`http://localhost:5000/api/signin`,{//backend bata tancha matra ra yeta value return huncha that means signin ko function call huncha front end ma
    
        method:"POST",//user le input gareko kura haru tai backend ma patahko
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
} 
//for authentication-
//yesle login matra gari racha
export const authenticate = (data,next)=>{//data ta login garereko data aunu paryo next tai authenticate garepachi k garne bhanera
    localStorage.setItem('jwt',JSON.stringify(data))//here login sucessfull bhyo bhane login ko data tai localstorage ma save garnu paryo//J DATA cha teslai string banunu paryo
    //jwt is key
    next()//abha authenticate garepachi k garne bhanera
    //here to check it first inspect it then go to application and go to local storage  and check for jwt token
    //euta user aucha euta token aucha
    //role anusar page rediect hunu paryo like for admin and user
    

}

//for redirecting according to user role ,to check if user is signed in or not
//esle tai loalstorage bata value line ho
export const isAuthenticated= ()=>{//we don't need any input
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))//lida kheri read garnu paryo//jwt ma bhako data tai linu paryo //jwt ma value cha bhane authintcate garnu paryo
    }//jwt ma token ra user ko data save huncha
    else{
        return false;//jwt ma kei value chaina bhane return false garnu paryo
    }

}//login check garna ko lagi isAuthenticated()

// or signout:
export const signout=(next)=>{
    localStorage.removeItem('jwt')
    next()
    return fetch(`http://localhost:5000/api/signout`,{
        method:" GET",
 
    })
    .then(res=>console.log('signout',res))
    .catch(error=>console.log(error))
}


//forget password:

//forget password
export const forgetpassword = (email) => {//here we need email for to reset password//token matra pathune ho //to confirm email//reset garna ko lagi token pathunu pryo teti ho
    return fetch(`http://localhost:5000/api/forgetpassword`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
})
    .then(res=>res.json())
    .catch(error=>console.log(error))
}


//reset password:token tai url bata linu paryo jaba hami forget password ma click garchyou tei bhayeko url ma token cha teslai line
//tei token 

export const resetpassword=(token,email,new_password)=>{

    const data={email,new_password}
    return fetch(`http://localhost:5000/api/resetpassword/${token}`,{

    method:"POST",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .catch(error=>console.log(error))
}