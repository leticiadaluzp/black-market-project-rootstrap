import { createBrowserRouter } from 'react-router-dom'
import App from '../App';
import ProtectedRoute from '../component/ProtectedRoute/ProtectedRoute';
import {Home, HomePage, SignIn, SignUp, NotFound, ProductDetail} from '../Routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'SignIn',
        element: <SignIn/>
      },
      {
        path: 'SignUp',
        element: <SignUp/>
      },
      {
        path: 'HomePage',
        element: (
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        )
      },
      {
        path: 'product/:id', 
        element: <ProductDetail />, 
      }
    ]
  }
])
