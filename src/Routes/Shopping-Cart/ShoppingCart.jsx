import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';
import { UserSessionContext } from '../../component/context/UserSessionProvider';
import { SearchInput, Loader, SortButton, ShoppingItem } from '../../component';
import { axiosInstance } from '../../component/axios/axios';

export function ShoppingCart(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { checkAuth } = useContext(UserSessionContext);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);
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
      const response = await axiosInstance.get('/shopping_cart', {
        headers: {
          'access-token': localStorage.getItem('accessToken'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
        },
      });
      if (response && response.data && response.data.line_items){
        setProducts(response.data.line_items);
        setOriginalProducts(response.data.line_items);
        setSearchResultEmpty(false);
      }else{
        toast.error('Oops, an error occured. Please try refreshing and contact us if the problem persists')
      }
    } catch (error) {
      toast.error('Failed to fetch products.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (query) => {
    const searchTerms = query.split(',').map(term => term.trim().toLowerCase())
    if (query.length > 0) {
      const searchedProducts = originalProducts.filter((item) => 
        searchTerms.some(term => item.product.title.toLowerCase().includes(term))
      );
      setProducts(searchedProducts);
      setSearchResultEmpty(searchedProducts.length === 0);
    } else {
      fetchProducts();
      setSearchResultEmpty(false);
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
    const numericPriceA = parseFloat(a.product.unit_price.replace('$', ''));
    const numericPriceB = parseFloat(b.product.unit_price.replace('$', ''));
    if (numericPriceB !== numericPriceA) {
      return numericPriceB - numericPriceA;
    }
    return a.product.title.localeCompare(b.product.title);
    });
    setProducts(sortedProducts)
  }

  const handleSortByPriceAscAndAZ = () => {
    const sortedProducts = [...products].sort((a, b) => {
      const numericPriceA = parseFloat(a.product.unit_price.replace('$', ''));
      const numericPriceB = parseFloat(b.product.unit_price.replace('$', ''));
      if (numericPriceA !== numericPriceB) {
        return numericPriceA - numericPriceB;
      }
      return a.product.title.localeCompare(b.product.title);
    });
    setProducts(sortedProducts);
  }

  const incrementQuantity = (index) => {
    const updatedProducts = [...products];
    const productStock = updatedProducts[index].product.stock;

    if (updatedProducts[index].quantity < productStock) {
      updatedProducts[index].quantity += 1;
      setProducts(updatedProducts);
    } else {
      toast.error('Insufficient stock available.');
    }
  };

  const decrementQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
    }
    setProducts(updatedProducts);
  };

  const handleDelete = async (productId) => {
    console.log("id:" , productId)
    try {
      await axiosInstance.delete(`/shopping_cart/line_items/${productId}`, {
        headers: {
          'access-token': localStorage.getItem('accessToken'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
        },
      });
      setProducts(prevProducts => prevProducts.filter(product => product.product.id !== productId));
      console.log("prod dsp de eliminar" , products)
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete product.')
    }
  }

  const calculateTotalPrice = () => {
    const totalPrice = products.reduce((accumulator, product) => {
      const numericPrice = parseFloat(product.product.unit_price.replace('$', ''));
      if (!isNaN(numericPrice)) {
        return accumulator + numericPrice * product.quantity;
      }
      return accumulator;
    }, 0);
  
    return totalPrice;
  }
  
  const totalPurchasePrice = calculateTotalPrice()


  if (!isAuthenticated || isLoading || !products) return <Loader /> 

 return(
  <section className='mt-8 m-auto md:max-w-[800px] md:mt-14 md:pb-5 md:rounded-3xl md:border md:border-solid md:border-slate-50 flex flex-col items-center '>
    < SearchInput onSearch={handleSearch} />
    <div className='flex gap-5 mt-4 items-center justify-center flex-wrap px-3'>
      <h2 className='w-full text-center text-base md:text-xl'>Sort by:</h2>
      <SortButton text='Higher price' onClick={handleSortByPriceDescAndAZ} />
      <SortButton text='Lower price' onClick={handleSortByPriceAscAndAZ}  />
      <SortButton text='A-Z' onClick={handleSortAZ} />
      <SortButton text='Z-A' onClick={handleSortZA}  />
    </div>
   {products.length === 0 ? (
      <>
        <p className='mt-10 p-3 text-center text-4xl text-red-600'>
          {originalProducts.length === 0 ? 'Your shopping cart is empty' : 'No items match your search criteria'}  
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
              <ShoppingItem
                key={index}
                name={productData.title || 'Unnamed product'}
                quantity={product.quantity || 0}
                price={productData.unit_price || 'Price not available'}
                picture={picture}
                onIncrement={() => incrementQuantity(index)}
                onDecrement={() => decrementQuantity(index)}
                onDelete={() => handleDelete(product.id)}
              />
            );
          })}
        </ul>
        <h3 className='mt-8 text-center text-xl mb-8 p-3 border border-gray-300 shadow-md rounded-md'>Total price: ${totalPurchasePrice} </h3>
      </>
    )}
  </section>
 )
}
