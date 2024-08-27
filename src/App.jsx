import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Loader } from './component'

function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    renderPage();
  }, [])

  function renderPage() {
    setIsPageLoading(false);
  }
  return (
    <>
      <Header/>
      <main>
        {isPageLoading ? <Loader/> : <Outlet/>}
      </main>
    </>
  )
}

export default App
