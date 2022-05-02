import React,{ useState, useEffect} from 'react'


const Data = () => {

    const [data, setData]=useState(0)

    const[value, setValue] = useState(7)
    // here data is variable setdata tai function bhyo usestate tai state bhyo value update garna setdata use garchyoum
    //here hooks change the state which means value
     //use state le varable ra varbale function change garne lai bind garcha(data,setdata)
    //here useState(0) value is passed to declared varaible named data then we passed data to <h1> html as {data} to show output.to show any output  we need to use use {..}
    //setData perfrom particular function on data


    //  syntax_useEffect(()=>{},[state-variable])
    //here in down code whatever state we changed in data and value from using usestate it alerts us by using useEffect
    //here if we don't give any array in state variable and provide no data whatsoever it will alert us every time that includes refreshing the page 
    //or clicking the button.If we click button for data only it will alert only when state changed for data and same goes for the value too
    //here window alert in useeffect is the function and only works when we provide some state change
    //here setdata is used for manipulating the data

    useEffect(()=>{
        window.alert("Value updated")
    },[value,data])

     return (
        <>
        <div className='text-center'>
            <h1>{data}</h1>
            <button className='btn btn-primary' onClick={()=>setData(data+1)}>Click to increases</button>
            <button className='btn btn-primary ms-3' onClick={()=>setData(data-1)}>Click to decrease</button>
            </div>

        <div className='text-center mt-4'>
            <h2>{value}</h2>
            {value<100 &&<button className='btn btn-warning' onClick={()=>setValue(value+20)}>Click to increase by 20</button>}
            
           { value >0 && <button className='btn btn-warning ms-3' onClick={()=>{
                setValue(value-20)
                setData(data-1)
            }}>Click to decrease by 20</button>}
        </div>
        </>
    )
}

export default Data
