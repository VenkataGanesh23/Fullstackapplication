import './App.css'
import Main from './component/main/Main'
import { CartProvider } from './context/CartContext'

function App() {

  return (
    <>
    <CartProvider>
      <Main/>
      </CartProvider>
    </>
  )
}

export default App
