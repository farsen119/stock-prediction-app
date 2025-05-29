import axios from 'axios'
import React, { useEffect } from 'react'
import axiosInstance from '../../axiosinstance'



const Dashboard = () => {
  // const accessToken = localStorage.getItem('accessToken')
  useEffect (() => {
    const fetchProtectedData = async () => {
      try {
        const response = await  axiosInstance.get('/protected-view', {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`
          // }
      })

      console.log('success:', response.data)

      }catch (error){
        console.error("error fetching data:" , error)

      }
    }
    fetchProtectedData();
  }, [])
  return (
    <div className='text text-light'>Dashboard</div>
  )
}

export default Dashboard