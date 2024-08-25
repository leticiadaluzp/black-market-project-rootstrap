import { useState } from 'react';
import { UserSessionContext } from '../context/UserSessionProvider';

export function ProductDetail({ id }) {
  const { isLoggedIn } = useContext(UserSessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/products/${id}`, {
          headers: {
            'access-token': localStorage.getItem('accessToken'),
            'uid': localStorage.getItem('uid'),
            'client': localStorage.getItem('client')
          }
        });
        setProduct(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
        //   toast.error("You need to sign in or sign up before continuing.");
        } else {
        //   toast.error("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProduct();
    } else {
    //   toast.error("You need to be logged in to view this product.");
      setIsLoading(false);
    }
  }, [id, isLoggedIn]);


  if (isLoading) return <Loader />

  return(
    <>
      {isLoggedIn ? (
        <div>
           {/* TO DO: Add visual content */} 
        </div>
      ) : (
        <div>
          {/* TO DO: should we put something here? */}
        </div>
      )}
    </>
  )
}
