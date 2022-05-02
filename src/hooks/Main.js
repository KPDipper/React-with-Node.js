import React from 'react'
import Props from './Props'
import GlobalcontextProvider from './Globalcontext'
import UseGlobalContext from './UseGlobalContext'

const Main = () => {
    return (
        <>
            
            <Props value={"hello"} user={"Kshitiz"}></Props>
{/*             
            here this is main variable from which we will pass value to Props.js.we also need to import Prop.js then 
            we will display it to Props.js.here  value and user are variable names.this is aprocess of transfering value from one
             component to another component */}
            
            <GlobalcontextProvider>

            <UseGlobalContext/>
            </GlobalcontextProvider>
        
        </>
    )
}

export default Main
