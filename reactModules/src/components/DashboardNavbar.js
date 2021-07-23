/* Author: Vishal Sancheti */

import {Container, Nav, Navbar} from "react-bootstrap";
import "../styles/DashboardNavbar.scss";

export default function DashboardNavbar(){
    return (
        <Navbar className="nav-bar-container">
            <Container>
                <Navbar.Brand className="nav-bar-text" href="/">Freelance Dashboard</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link title="Notification" className="nav-bar-link" href="#notification">
                        <i className="fas fa-bell"/>
                    </Nav.Link>
                    <Nav.Link title="Profile" className="nav-bar-link" href="#profile">
                        <i className="fas fa-user"/>
                    </Nav.Link>
                    <Nav.Link title="Log Out" className="nav-bar-link" href="/">
                        <i className="fas fa-sign-out-alt"/>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}