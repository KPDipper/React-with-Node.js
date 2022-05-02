import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../auth'


const PrivateRoute = () => {
    return (
            isAuthenticated() && isAuthenticated().user.role === 0 ?<Outlet/> : <Navigate to= "/signin"/>
            //outlet le jun page mageko cha tei page dincha but if sign in cha ra user tai non admin cha bhanera
            //if is not login  then it will send us to sign in page 
            //jasto cart ma click garyo tara login hunu paryo login cha bhane cart mai jancha outlet bhakeo tyo ho
            //login chaina bhane sign in ma lagidine
            
    )
}

export default PrivateRoute