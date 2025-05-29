import React from 'react'
import Button from './Button'
import Footer from './Footer'
import Header from './Header'

const Main = () => {
  return (
    <>

    

      <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className='text-light'>Stock Prediction APP</h1>
          <p className='text-light lead'>This stock prediction app using machine learning, which aims to forecast future stock prices based on historical market data. This application leverages machine learning algorithms such as linear regression, LSTM (Long Short-Term Memory), or other time series models to analyze patterns in stock price movements. By feeding the model with features like historical prices, trading volume, and technical indicators. The app provides a user-friendly interface where users can input a stock symbol, view recent trends.</p>
         
          <Button  text="Explore Now" class="btn-info" url="/dashboard"/>




        </div>
      </div>

    
    </>
  )
}

export default Main