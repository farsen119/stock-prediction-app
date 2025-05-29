import { useContext } from 'react'
import { AuthContext } from './components/AuthProvider'
import { Navigate } from 'react-router-dom'


const PrivateRout = ({children}) => {
  const { isLoggedIn } = useContext(AuthContext)
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to='/login' />
  )
   
  
}

export default PrivateRout