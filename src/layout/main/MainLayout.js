import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftMenu from '../../components/menu/LeftMenu';
import './mainLayout.scss';

const MainLayout = ({ layoutClass, children }) => {
    return (
        <Container className={`main-layout ${layoutClass}`}>
            <Row>
                <Col xs={3} className="main-layout-menu">
                    <LeftMenu />
                </Col>
                <Col xs={9} className="main-layout-content">
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default MainLayout;