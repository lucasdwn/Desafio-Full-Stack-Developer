import Navbar from 'react-bootstrap/Navbar';
import './styles.css';
import { Container, Nav} from 'react-bootstrap';
import { MdOutlineInventory2 } from 'react-icons/md'

function Nav_Bar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="tittle"href="/"> MY-STOCK  <MdOutlineInventory2 size={25}/></Navbar.Brand>
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