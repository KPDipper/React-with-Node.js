import React,{createContext} from 'react'


export const Globalcontext= createContext()//here this is a variable//createcontext is react hoos

const GlobalcontextProvider = (props) => {
    return (
        <Globalcontext.Provider value={"123"}>

        {/* here value is build in */}
            
       {props.children} 
       {/* here .children is react build in and the value that come from props helps to return by children */}
        </Globalcontext.Provider>

        // here this is like <props/> we made in Props.js//here .provider is react build in function
    )
}

export default GlobalcontextProvider

//now this is for variable context
