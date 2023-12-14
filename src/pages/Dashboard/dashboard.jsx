import React, { useState, useEffect } from 'react';
import Topbar from "../Layout/topbar";
import Sidebar from "../Layout/sidebar";
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap'


const Dashboard = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  return (
    <>
    <Topbar toggleSidebar={toggleSidebar} />
    <Container fluid>
        <Row>
        <Col lg={3} xl={2} className={isSidebarOpen ? '' : 'd-none'}>
              <Sidebar isOpen={isSidebarOpen} />
            </Col>
            <Col md={9}>
                <div className="main-content">
                    
                        

                </div>
            </Col>
        </Row>
    </Container>
    </>
  );
};

export default Dashboard;
