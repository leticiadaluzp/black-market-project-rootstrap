import { createBrowserRouter } from 'react-router-dom'
import App from '../App';
import ProtectedRoute from '../component/ProtectedRoute/ProtectedRoute';
import {Home, HomePage, SignIn, SignUp, NotFound, ProductDetail, ShoppingCart} from '../Routes'

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
        path: 'sign-in',
        element: <SignIn/>
      },
      {
        path: 'sign-up',
        element: <SignUp/>
      },
      {
        path: 'homePage',
        element: (
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        )
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'shopping-cart',
        element: (
          <ProtectedRoute>
            <ShoppingCart/>
          </ProtectedRoute>
        )
      },
    ]
  }
])
