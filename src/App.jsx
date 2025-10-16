import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from "./Appwrite/auth";
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components';
const App = () => {
   const {loading, setLoading}=useState(true)
   const dispatch=useDispatch()
 useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
 if (userData) {
  dispatch(login({userData}))
 } else {
  dispatch(logout())
 }
  }).catch((error)=>{
console.log('Error fetching current user:',error);
dispatch(logout())

  })
  .finally(()=>setLoading(false))
 },[])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap bg-gray-400'>
      <div className='w-full block '>
        <Header/>
        <main>

        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App