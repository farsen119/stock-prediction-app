import axios, { spread } from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosinstance'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



const Dashboard = () => {
  const [ticker, setTicker] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [plot, setPlot] = useState()
  const [ma100, setMa100] = useState()
  const [ma200, setMa200] = useState()
  const [prediction, setPrediction] = useState()

  const[mse,setMse] = useState()
  const[rmse,setRmse] = useState()
  const[r2,setR2] = useState()



  // const accessToken = localStorage.getItem('accessToken')
  useEffect (() => {
    const fetchProtectedData = async () => {
      try {
        const response = await  axiosInstance.get('/protected-view', {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`
          // }
      })

      // console.log('success:', response.data)

      }catch (error){
        console.error("error fetching data:" , error)

      }
    }
    fetchProtectedData();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)


    try{
      const response = await axiosInstance.post('/predict/', {
        ticker: ticker
      });
      console.log(response.data)

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT
      const plotUrl = `${backendRoot}${response.data.plot_img}`
      
      const ma100Url = `${backendRoot}${response.data.plot_100_DMA}`
      const ma200Url = `${backendRoot}${response.data.plot_200_DMA}`
      const predictionUrl = `${backendRoot}${response.data.plot_prediction}`

      setPlot(plotUrl)
      setMa100(ma100Url)
      setMa200(ma200Url)
      setPrediction(predictionUrl)

      setMse(response.data.mse)
      setRmse(response.data.rmse)
      setR2(response.data.r2)

      // set plots


      if(response.data.error){
        setError(response.data.error)
      }


    }catch(error){
      console.error("there was an error making the API requrest ",error)

    }finally{
      setLoading(false)
    }
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <input type="text" className='form-control' placeholder='enter stock ticker' onChange={(e) => setTicker(e.target.value)} required
            />
            <small>{error && <div className='text-danger'>{error}</div>}</small>
            <button type='Submit' className='btn btn-info mt-3'>
              {loading ? <span><FontAwesomeIcon icon={faSpinner} spin />please Wait ...</span> : 'See Prediction'}
            </button>
          </form>
        </div>
        {/* print prediction plot */}

        {prediction && (
          <div className="prediction mt-5">
          <div className="p-5">
            {plot && (
              <img src={plot} style={{maxWidth:'100%' }} />
            )}
          </div>
          <div className="p-3">
            {ma100 && (
              <img src={ma100} style={{maxWidth:'100%' }} />
            )}
          </div>
          <div className="p-3">
            {ma200 && (
              <img src={ma200} style={{maxWidth:'100%' }} />
            )}
          </div>
          <div className="p-3">
            {prediction && (
              <img src={prediction} style={{maxWidth:'100%' }} />
            )}
          </div>

          <div className="text-light p-3">
            <h4>Model Evaluvation</h4>
            <p>Mean Square Error (MSE): {mse}</p>
            <p>Root Mean Square Error (RMSE): {rmse}</p>
            <p>R-Square (R2): {r2}</p>
          </div>

        </div>
        )}
        
      </div>

    </div>
  )
}

export default Dashboard