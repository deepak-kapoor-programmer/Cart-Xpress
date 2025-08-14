import { useCallback, useEffect, useState } from "react"
import GetHomeAPI from "../../networking/product-home";
import { useSelector, useDispatch } from "react-redux";
import { appendProducts } from "../../redux/productSlice";
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { AddToCart } from "../../redux/CartSlice";
import { RemoveFromCart } from "../../redux/CartSlice";
import { Link } from "react-router-dom";
import { SpinnerCom } from "../../components/Spinner";
import { Toast, ToastContainer } from "react-bootstrap";
function Home() {
  const [loading, setLoading] = useState(false);


  const items = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.storeCard);
  const [skip, setskip] = useState(0);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const LoadData = useCallback(async () => {
    setLoading(true);
    try {

      const response = await GetHomeAPI(skip)
      console.log(response)
      dispatch(appendProducts(response.data));
    }
    catch (error) {
      //  console.log(error)
    }
    finally {
      setLoading(false);
    }
  }, [skip, dispatch]);
  useEffect(() => {
    if (items.length === 0) {
      <SpinnerCom />
      LoadData()
    }
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setskip((p) => p + 10)

      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items.length, LoadData]);
  useEffect(() => {
    if (skip !== 0) {
      LoadData();
    }
  }, [skip])
  const handleCart = (data) => {
    //  console.log("Cart",data);

    const isInCart = cartItems.some((cartItem) => cartItem.id === data.id);
    if (isInCart) {
      dispatch(RemoveFromCart(data));
    } else {

      dispatch(AddToCart(data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    }

  }
  return (
    <>
      {/* <h1>Product List ({items.length})</h1> */}
      {console.log(items)}


      <Container>
        <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            bg="dark"
            delay={2500}
            autohide
            className="border-0 shadow-lg rounded-4"
          >
            <Toast.Header
              closeButton={false}
              className="bg-warning text-dark d-flex align-items-center"
            >
              <strong className="me-auto fs-6">🏷️ Item Added</strong>
            </Toast.Header>
            <Toast.Body className="text-white fw-semibold text-center fs-6">
              ✔️ Product added to your cart!
            </Toast.Body>
          </Toast>
        </ToastContainer>



        <Row>

          {items.map((item) => {
            const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

            return (
              <Col lg={4} md={6} sm={12} key={item.id} className="mb-4">
                <Card className="card-custom h-100 d-flex flex-column justify-content-between">
                  <Link
                    to={`./product-detail/${item.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-fluid"
                    />
                    <Card.Body>
                      {/* <Card.Title className="card-2-lines mb-2">{item.title}</Card.Title> */}
                      <b><Card.Text className="card-2-lines">
                        {item.description}
                      </Card.Text></b>
                      <div className="d-flex align-items-center gap-1 mb-2">
                        <span className="text-warning fw-bold">{item.rating}★</span>
                      </div>
                      <div className="price-section">
                        ${Math.round(item.price - (item.price * item.discountPercentage) / 100)}
                        <span className="text-muted ms-2 text-decoration-line-through">
                          ${item.price}
                        </span>
                        <span className="discount-text">
                          ({item.discountPercentage}% off)
                        </span>

                      </div>
                      <div className="free-ship-text">FREE Ships in {item.shippingInformation}</div>
                    </Card.Body>
                  </Link>
                  <div className="p-2 pt-0">
                    <button
                      type="button"
                      onClick={() => handleCart(item)}
                      className={`btn w-100 ${isInCart ? 'btn-danger' : 'btn-warning'
                        } text-white fw-semibold`}
                    >
                      {isInCart ? 'Remove from Cart' : 'Add to cart'}
                    </button>
                  </div>
                </Card>
              </Col>

            );
          })}
          <SpinnerCom color="yellow" loading={loading} />

        </Row>
      </Container>
    </>
  )
}
export default Home