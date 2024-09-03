import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { UserSessionContext } from '../../component/context/UserSessionProvider';
import {SearchInput, Loader, SortButton, FavoriteItem} from '../../component';
import {axiosInstance} from '../../component/axios/axios';

export function Favorites(){
  const { checkAuth } = useContext(UserSessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleAuthentication()
  }, [])

  const handleAuthentication = () => {
    setIsLoading(true);
    const authStatus = checkAuth();
    if (!authStatus) {
      navigate('/sign-in');
    } else {
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/favorites', {
        headers: {
          'access-token': localStorage.getItem('accessToken'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
        },
      });
      if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        toast.error("Something went wrong. Pleade try again later.")
      }
    } catch (error) {
        toast.error("Something went wrong. Pleade try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (query) => {
    const searchTerms = query.split(',').map(term => term.trim().toLowerCase())
    if (query.length > 0) {
      const searchedProducts = products.filter((item) =>
        searchTerms.some(term => item.product.title.toLowerCase().includes(term))
      );
      setProducts(searchedProducts);
    } else {
      fetchProducts();
    }
  };

  const handleSortAZ = () => {
    const sortedProducts = [...products].sort((a, b) => a.product.title.localeCompare(b.product.title));
    setProducts(sortedProducts)
  }

  const handleSortZA = () => {
    const sortedProducts = [...products].sort((a, b) => b.product.title.localeCompare(a.product.title));
    setProducts(sortedProducts)
  }

  const handleSortByPriceDescAndAZ = () => {
    const sortedProducts = [...products].sort((a, b) => {
    const numericPriceA = parseFloat(a.product.unit_price.replace('$', '').replace(',', '').trim())
    const numericPriceB = parseFloat(b.product.unit_price.replace('$', '').replace(',', '').trim())
    if (numericPriceB !== numericPriceA) {
      return numericPriceB - numericPriceA;
    }
    return a.product.title.localeCompare(b.product.title);
    });
    setProducts(sortedProducts)
  }

  const handleSortByPriceAscAndAZ = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const numericPriceA = parseFloat(a.product.unit_price.replace('$', '').replace(',', '').trim());
      const numericPriceB = parseFloat(b.product.unit_price.replace('$', '').replace(',', '').trim());
      if (numericPriceA !== numericPriceB) {
        return numericPriceA - numericPriceB;
      }
      return a.product.title.localeCompare(b.product.title);
    });
    setProducts(sortedProducts);
  }

  const handleFavoriteToggle = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.product.id !== productId));
  };

  if (isLoading || !products) return <Loader />

  return(
    <section className='mt-8 m-auto md:max-w-[800px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50 flex flex-col items-center '>
      <h1 className='text-2xl mt-3 md:mt-10 md:text-4xl mb-8'>Your favorite products</h1>
      <SearchInput onSearch={handleSearch} />
      <div className='flex gap-5 mt-4 items-center justify-center flex-wrap px-3'>
        <h2 className='w-full text-center text-base md:text-xl'>Sort by:</h2>
        <SortButton text='Higher price' onClick={handleSortByPriceDescAndAZ}/>
        <SortButton text='Lower price' onClick={handleSortByPriceAscAndAZ}/>
        <SortButton text='A-Z' onClick={handleSortAZ}/>
        <SortButton text='Z-A' onClick={handleSortZA}/>
      </div>
      {products.length === 0 ? (
        <p className='mt-10 p-3 text-center text-2xl text-red-600'>You have no favorite products to show</p>
      ) : (
      <>
        <ul className='flex flex-col items-center mt-4 w-5/6'>
          {products.map((product, index) => {
          const productData = product.product || {};
          const picture = (productData.pictures && productData.pictures.length > 0)
          ? productData.pictures[0]
          : 'default-image.png';
          return (
            <FavoriteItem
            key={index}
            name={productData.title || 'Unnamed product'}
            price={productData.unit_price || 'Price not available'}
            picture={picture}
            isFavorite={productData.is_favorite}
            id={productData.id}
            onFavoriteToggle={handleFavoriteToggle}
            />
          );
          })}
        </ul>
      </>
      )}
    </section>
  )
}