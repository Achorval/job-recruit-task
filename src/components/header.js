import { 
  Navbar, 
  Nav, 
  Container
} from 'react-bootstrap';

export default function Header() {  

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Job Recruitment</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#">About</Nav.Link>
                        <Nav.Link href="#">Careers</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">Login</Nav.Link>
                        <Nav.Link eventKey={2} href="#">Create Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
