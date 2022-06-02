import react from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav} from 'react-bootstrap';

function Nav_Bar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/produtos">Produtos</Nav.Link>
                    <Nav.Link href="/estoques">Estoques</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
        
    );
}

export default Nav_Bar;