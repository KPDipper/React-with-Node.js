import React ,{useContext}from 'react'


import { Globalcontext } from './Globalcontext'

const UseGlobalContext = () => {

    const msg=useContext(Globalcontext)//here useContext is rect inbuild and global is variable we made
    //use context tai hamile bhanko varible lai use garna ko lagi
    return (
        <>
            <h2>This is {msg}</h2>
        </>
    )
}

export default UseGlobalContext
