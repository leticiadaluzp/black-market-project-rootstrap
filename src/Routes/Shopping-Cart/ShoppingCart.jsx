import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserSessionContext } from '../../component/context/UserSessionProvider'
import {SearchInput, Loader, SortButton, ShoppingItem} from '../../component'
import {axiosInstance} from '../../component/axios/axios'
import box from '../../assets/Caja-Sorpresa.png' //testing

export function ShoppingCart(){
   const testingArray=[
   { name: 'caja', quantity:1 , price:'$30' , picture:box},
   { name: 'box', quantity:1 , price:'$20' , picture:box},
   { name: 'regalo', quantity:1 , price:'$40' , picture:box},
   { name: 'gift', quantity:1 , price:'$30' , picture:box}
  ]
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isLoggedIn } = useContext(UserSessionContext)
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState([...testingArray])
  const navigate = useNavigate()

 useEffect(() => {
      handleAuthentication()
    }, [])


     const handleAuthentication = () => {
      setIsLoading(true)
      const authStatus = checkAuth()
      setIsAuthenticated(authStatus)
      if (!authStatus) {
        navigate('/SignIn')
      } else {
        fetchProducts()
      }
    }

    const checkAuth = () => {
      const storedAccessToken = localStorage.getItem('accessToken')
      const storedUid = localStorage.getItem('uid')
      const storedClient = localStorage.getItem('client')

      if (storedAccessToken && storedUid && storedClient) {
        return true;
      }
      return false;
    }

    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/shopping_cart', {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'uid': localStorage.getItem('uid'),
            'client': localStorage.getItem('client'),
          },
        });
        //setProduct(response.data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        //TO DO: how should we handle this error?
      } finally {
        setIsLoading(false)
      }
    }

  const handleSearch = (query) => {
    const searchTerms = query.split(',').map(term => term.trim().toLowerCase())
    if(query.length > 0){
       const searchedProduct = [...product].filter((item) => searchTerms.some(term => item.name.toLowerCase().includes(term)))
       setProduct(searchedProduct)
    }else {
     setProduct(testingArray);
    }
  }

  const handleSortAZ = () => {
    const sortedProducts = [...product].sort((a, b) => a.name.localeCompare(b.name));
    setProduct(sortedProducts)
  }

    const handleSortZA = () => {
    const sortedProducts = [...product].sort((a, b) => b.name.localeCompare(a.name));
    setProduct(sortedProducts)
  }

  const handleSortByPriceDescAndAZ = () => {
  const sortedProducts = [...product].sort((a, b) => {
    if (b.price !== a.price) {
      return b.price - a.price;
    }
    return a.name.localeCompare(b.name);
  });
  setProduct(sortedProducts)
}

const handleSortByPriceAscAndAZ = () => {
  const sortedProducts = [...product].sort((a, b) => {
    if (a.price !== b.price) {
      return a.price - b.price;
    }
    return a.name.localeCompare(b.name);
  });
  setProduct(sortedProducts);
}

 const incrementQuantity = (index) => {
    const updatedProducts = [...product];
    updatedProducts[index].quantity += 1;
    setProduct(updatedProducts);
  };

 const decrementQuantity = (index) => {
    const updatedProducts = [...product];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
    }
    setProduct(updatedProducts);
  };

const calculateTotalPrice = () => {
  const totalPrice = product.reduce((accumulator, product) => {
    const numericPrice = parseFloat(product.price.replace('$', ''))
    return accumulator + numericPrice * product.quantity;
  }, 0)
  return totalPrice
}

const totalPurchasePrice = calculateTotalPrice()

  if (isLoading || !product) return <Loader />

 return(
  <section className='mt-8 m-auto md:max-w-[800px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50 flex flex-col items-center '>
   < SearchInput onSearch={handleSearch} />
   <div className='flex gap-5 mt-4 items-center justify-center flex-wrap px-3'>
    <h2 className='w-full text-center text-base md:text-xl'>Sort by:</h2>
    < SortButton text='Higher price' onClick={handleSortByPriceDescAndAZ} />
    < SortButton text='Lower price' onClick={handleSortByPriceAscAndAZ}  />
    < SortButton text='A-Z' onClick={handleSortAZ} />
    < SortButton text='Z-A' onClick={handleSortZA}  />
   </div>
   <ul className='flex flex-col items-center mt-4 w-5/6'>
    {product.map(({name, quantity, price, picture}, index) => (
          <ShoppingItem
            key={index}
            quantity={quantity}
            name={name}
            price={price}
            picture={picture}
            onIncrement={() => incrementQuantity(index)}
            onDecrement={() => decrementQuantity(index)}
          />
        ))}
   </ul>
   <h3 className='mt-4 self-start ml-6 mb-8 md:ml-44'>Total price: ${totalPurchasePrice} </h3>
  </section>
 )
}
