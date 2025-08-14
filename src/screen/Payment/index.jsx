import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const navigate = useNavigate();

    return (
        <Container className="mt-5">
            <Card className="p-4 shadow">
                <h2 className="mb-4">💳 Payment Page</h2>
                <p>This is a placeholder for payment gateway integration.</p>
                <Button variant="success" onClick={() => navigate("/")}>
                    Go to Home
                </Button>
            </Card>
        </Container>
    );
}
