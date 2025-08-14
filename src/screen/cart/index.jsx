import { Col, Container, Row, Card, Badge, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RemoveFromCart } from "../../redux/CartSlice";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Cart() {
  const cartItems = useSelector((state) => state.cart.storeCard);
  console.log("id is : ", cartItems);

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleRemove = (item) => {
    dispatch(RemoveFromCart(item));
  };
  var sum = 0;
  products.map((index) => {
    sum += index.price

  })
  async function fetchProductDetail(data) {
    try {
      const res = await Promise.all(
        data.map(async (item) => {
          const response = await fetch(`https://dummyjson.com/products/${item.id}`);
          return await response.json();
        })
      );
      return res;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return [];
    }
  }
  useEffect(() => {
    async function load() {
      const productDet = await fetchProductDetail(cartItems); // this is array of  id 
      setProducts(productDet);
    }

    if (cartItems.length > 0) {
      load();
    } else {
      setProducts([]); // clear when cart is empty
    }
  }, [cartItems]);

  return (
    <Container className="my-4" >
      <Row>

        <Col md={8}>
          <h2 className="mb-4">🛒 Shopping Cart</h2>
          <div className="my-container">
            {products.length > 0 ? (
              products.map((item) => (
                <Card key={item.id} className="mb-3 shadow-sm ">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="img-fluid"
                          style={{ maxHeight: "60px", objectFit: "contain",cursor:"pointer" }}

                          onClick={() => navigate(`/Product-detail/${item.id}`)}
                        />
                      </Col>

                      <Col xs={8} md={9}>
                        <h6 className="fw-semibold mb-1">{item.title}</h6>
                        <small className="text-muted  mb-1">{item.brand}</small>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="text-danger fw-bold">₹{item.price}</span>
                          <Badge bg="warning" text="dark">
                            {item.discountPercentage}% OFF
                          </Badge>
                        </div>
                        <span>In Stock</span>
                      </Col>

                      <Col xs={1} className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="p-1"
                          onClick={() => handleRemove(item)}
                        >
                          {/* <Trash3 size={18} /> */}
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </Col>

        {/* Right Column: Checkout Summary */}
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h4 className="mb-3">Summary</h4>
            <p>Total Items: <strong>{products.length}</strong></p>
            <p>
              Total Price:{" "}
              <strong>
                ${sum.toFixed(2)}
              </strong>
            </p>
            <Button variant="warning" className="mt-2 w-100" onClick={() => {
              navigate("/payment");
            }}>
              Proceed to Pay
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
