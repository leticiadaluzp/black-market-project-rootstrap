import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { UserSessionContext } from '../../component/context/UserSessionProvider';
import { Loader, ShoppingItem } from '../../component';
import { axiosInstance } from '../../component/axios/axios';

export function Orders(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { checkAuth } = useContext(UserSessionContext);
  const [originalProducts, setOriginalProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleAuthentication()
    }, [])

  const handleAuthentication = () => {
    setIsLoading(true)
    const authStatus = checkAuth()
    setIsAuthenticated(authStatus)
    if (!authStatus) {
      navigate('/sign-in')
    } else {
      fetchProducts()
    }
  }

  const fetchProducts = async () => {

    try {
      const response = await axiosInstance.get('/orders', {
        headers: {
          'access-token': localStorage.getItem('accessToken'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
        },
      });
      if (response && response.data && response.data.line_items){
        setProducts(response.data.line_items);
        setOriginalProducts(response.data.line_items);
      }else{
        toast.error('Oops, an error occured. Please try refreshing and contact us if the problem persists')
      }
    } catch (error) {
      toast.error('Failed to fetch products.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated || isLoading || !products) return <Loader />

 return(
  <section className='mt-8 m-auto md:max-w-[800px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50 flex flex-col items-center '>
    <h1 className='text-2xl mt-3 md:mt-10 md:text-4xl mb-8'>Your orders</h1>
   {products.length === 0 ? (
      <>
        <p className='mt-10 p-3 text-center text-4xl text-red-600'>
          {originalProducts.length === 0 ? 'Your orders are empty' : 'No items match your search criteria'}
        </p>
        <p className=' text-center text-s '>There are not products to show</p>
      </>
    ) : (
      <>
        <ul className='flex flex-col items-center mt-4 w-5/6'>
          {products.map((product, index) => {
            const productData = product.product || {};
            const picture = (productData.pictures && productData.pictures.length > 0)
              ? productData.pictures[0]
              : 'default-image.png';

            return (
                <li key={index} className='flex flex-col md:flex-row gap-4 items-center md:justify-around border-2 border-slate-200 rounded-lg py-4 md:py-2 w-full md:px-6 mt-4'>
                  <div className='flex-shrink-0 w-24 h-24 md:w-12 md:h-12 overflow-hidden rounded'>
                    <img src={picture} alt="product" className='w-full h-full object-cover' />
                  </div>
                    <h2 >{product.title}</h2>
                  <div className='flex gap-8'>
                  <div className='flex flex-col items-center md:w-24'>
                    <h2>Price</h2>
                    <p>{product.unit_price}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    )}
  </section>
 )
}
