import React from 'react'


const Props = (props) => {
    //here props is a parameter.jaba main bata pass huncha value yo value tai props parameter ma gayera bascha
    //tespachi teslai destrcturing garincha 
    //this is passing from one file to anothr file but it doesnt work for every componenet that's why we need global context

    const {value,user}=props
    //this process is known as destructuring object

    return (
        <>
           <h1>{value} </h1> sent by <h2>{user}</h2>

           {/* now value from main.js arrives here and after using destructuring we print the particuale vaalue that we assigned to varliable */}
            {/* here example of this is we can take value from "form" and displa it on props.js */}
     
        </>
    )
}

export default Props
