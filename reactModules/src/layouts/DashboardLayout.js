/* Author: Vishal Sancheti */

import React from 'react';
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import {Col, Container, Row} from "react-bootstrap";

// Page Wrapper for Dashboard Pages
const DashboardLayout =({children}) =>{
    return(
        <>
            <header>
                <DashboardNavbar/>
            </header>
            <main>
                <Container fluid>
                    <Row>
                        <Col md={2} as={DashboardSidebar} />
                        <Col md={10}>
                            {children}
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default DashboardLayout;