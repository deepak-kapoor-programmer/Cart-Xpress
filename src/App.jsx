import Header from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./screen/home"
import Cart from "./screen/cart"
import ProductDetail from "./components/ProductCard-details"
import Payment from "./screen/Payment"
function App() {
  return (
    <>
      {/* <h1>Wait and watch</h1> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Product-detail/:id" element={<ProductDetail />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

    </>
  )
}
export default App
