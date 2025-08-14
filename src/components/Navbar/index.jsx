
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
export default function Header() {
    const counter = useSelector((state) => state.cart.counter)
    return (
        <>
            <Navbar expand="lg" className="bg-dark">
                <Container fluid >
                    <Navbar.Brand className='text-white'>🛒 CartXpress</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className="bg-white" />
                    <Navbar.Collapse id="navbarScroll">

                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} to="/" className='text-light'>Home</Nav.Link>
                            <Nav.Link as={Link} to="/cart" className=' text-light'>Cart</Nav.Link>
                        </Nav>
                        {/* Add Cart feature */}
                        {counter !== 0 ?
                            <Nav.Link as={Link} to="/cart" className='text-white' >🛒Cart <sup><Badge pill bg="primary">
                                {counter}
                            </Badge></sup></Nav.Link>
                            : null}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}
