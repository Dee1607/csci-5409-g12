/* Author: Vishal Sancheti */

import '../styles/style.scss';
import React, { useState } from 'react';
import {Collapse} from 'react-bootstrap';
import { Drawer } from 'react-bootstrap-drawer';
import '../styles/DashboardSidebar.scss';
import { useLocation } from 'react-router-dom'

export default function Sidebar(props) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const handleToggle = () => setOpen(!open);

    return (
        <Drawer { ...props }>
            <Drawer.Toggle onClick={ handleToggle } />

            <Collapse in={ open }>
                <Drawer.Overflow>
                    <Drawer.ToC>
                        <Drawer.Item href="/dashboard">
                            <span className={location.pathname === "/dashboard" ? 'nav-item-active' : ''}>Dashboard</span>
                        </Drawer.Item>

                        <Drawer.Nav>
                            <Drawer.Item href="/clients">
                                <span className={location.pathname === "/clients" ? 'nav-item-active' : ''}>Clients</span>
                            </Drawer.Item>
                            <Drawer.Item  href="/projects">
                                <span className={location.pathname === "/projects" ? "nav-item-active" : ''}>Projects</span>
                            </Drawer.Item>
                            <Drawer.Item href="/timelogs">
                                <span className={location.pathname === "/timelogs" ? 'nav-item-active' : ''}>Time Logs</span>
                            </Drawer.Item>
                            <Drawer.Item href="/invoicemanagement">
                                <span className={location.pathname === "/invoicemanagement" ? 'nav-item-active' : ''}>Invoices</span>
                            </Drawer.Item>
                            <Drawer.Item href="/invoice-generation">
                                <span className={location.pathname === "/invoice-generation" ? 'nav-item-active' : ''}>Invoice Generation</span>
                            </Drawer.Item>
                            <Drawer.Item href="/testimonials">
                                <span className={location.pathname === "/testimonials" ? 'nav-item-active' : ''}>Testimonials</span>
                            </Drawer.Item>

                            <hr className="horizontal-break"/>

                            <Drawer.Item href="/todolist">
                                <span className={location.pathname === "/todolist" ? 'nav-item-active' : ''}>ToDo</span>
                            </Drawer.Item>
                            <Drawer.Item href="/calendar">
                                <span className={location.pathname === "/calendar" ? 'nav-item-active' : ''}>Calendar</span>
                            </Drawer.Item>
                        </Drawer.Nav>
                    </Drawer.ToC>
                </Drawer.Overflow>
            </Collapse>
        </Drawer>
    );
};