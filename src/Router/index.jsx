
import { createBrowserRouter } from 'react-router-dom'
import App from '../App';
import {Home, SignIn, NotFound} from '../Routes'

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
      }
    ]
  }
])
