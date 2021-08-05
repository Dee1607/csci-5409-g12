import {Container, Nav, Navbar} from "react-bootstrap";
import "../styles/DashboardNavbar.scss";

export default function DashboardNavbar(){

    return (
        <Navbar className="nav-bar-container">
            <Container>
                <Navbar.Brand className="nav-bar-text" href="/">Video Maker</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link title="Log Out" className="nav-bar-link" onClick={ () => {localStorage.removeItem('user')} } href="/">
                        <i className="fas fa-sign-out-alt"/>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}