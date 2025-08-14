import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import { SpinnerCom } from '../Spinner';
export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    useEffect(() => {
        const fetchProduct = async () => {
            try {


                const res = await axios(`https://dummyjson.com/products/${id}`);
                setProduct(res.data);


            } catch (error) {
                console.error("Failed to fetch product:");
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <>
            {console.log(product)}
            {product ? (
                <>
                    <Row>
                        <Col lg={6}>
                            <Carousel>
                                {product.images.map((img, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className=" w-100"
                                            src={img}
                                            alt={`Slide ${index}`}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                        <Col>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text className="text-muted">{product.brand}</Card.Text>
                                    <Card.Text className="mb-3">{product.description}</Card.Text>

                                    <Card.Subtitle className="text-dark fw-bold">
                                        ${product.price.toFixed(2)}
                                        <span className="discount-label">
                                            {product.discountPercentage}% OFF
                                        </span>
                                    </Card.Subtitle>
                                </Card.Body>

                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><b>Rating:</b> {product.rating} ⭐</ListGroup.Item>
                                    <ListGroup.Item><b>Stock:</b> {product.stock}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <b>Dimensions:</b> {product.dimensions?.width}W × {product.dimensions?.height}H × {product.dimensions?.depth}D
                                    </ListGroup.Item>
                                    <ListGroup.Item><b>Shipping:</b> {product.shippingInformation}</ListGroup.Item>
                                    <ListGroup.Item><b>Warranty:</b> {product.warrantyInformation}</ListGroup.Item>
                                    <ListGroup.Item><b>Return Policy:</b> {product.returnPolicy}</ListGroup.Item>
                                    <ListGroup.Item><b>SKU:</b> {product.sku}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <b>Tags:</b>{' '}
                                        {product.tags?.map((tag, index) => (
                                            <span key={index} className="tag-badge">{tag}</span>
                                        ))}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>

                        </Col>
                    </Row>

                    <Card className="mt-5">
                        <Card.Header className="bg-light fw-bold fs-5">
                            <span role="img" aria-label="megaphone">📢</span> Customer Reviews
                        </Card.Header>
                        <Card.Body className="bg-light">
                            {console.log(product)}

                            {product.reviews.map((review) => (
                                <Card className="mb-3 shadow-sm" key={review.id}>
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <span className="text-warning fw-bold">⭐ {review.rating}</span>
                                                <span className="fw-semibold"> - {review.reviewerName}</span>
                                                <p className="mb-1 mt-2">{review.comment}</p>
                                            </div>
                                            <small className="text-muted text-end">
                                                {review.date.slice(0, 10)}<br />
                                                {review.reviewerEmail}
                                            </small>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </>

            ) : (
                <>
                    <SpinnerCom color="yellow" />
                </>
            )}

        </>
    );
}
