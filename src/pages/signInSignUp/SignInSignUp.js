import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LogoWhite from '../../assets/img/logo-white.png';
import LogoBlue from '../../assets/img/logo-blue.png';
import BasicModal from '../../components/modals/BasicModal';
import './signInSignUp.scss';

const LeftComponent = () => {
    return (
        <Col className="signin-signup-left" xs={6}>
            <img src={LogoBlue} alt="Blue Logo" />
            <div>
                <h2><FontAwesomeIcon icon={faSearch} />Sigue lo que te interesa.</h2>
                <h2><FontAwesomeIcon icon={faUsers} />Entérate de qué está hablando la gente.</h2>
                <h2><FontAwesomeIcon icon={faComment} />Únete a la conversación.</h2>
            </div>
        </Col>
    )
}

const RightComponent = () => {
    return (
        <Col className="signin-signup-right" xs={6}>
            <div>
                <img src={LogoWhite} alt="White Logo" />
                <h2>Mira lo que está pasando en el mundo en este momento</h2>
                <h3>Únete hoy mismo.</h3>
                <Button variant="primary">Regístrate</Button>
                <Button variant="outline-primary">Iniciar sesión</Button>
            </div>
        </Col>
    )
}

const SignInSignUp = () => {
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    return (
        <>
            <Container className="signin-signup" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent />
                </Row>
            </Container>
            <BasicModal
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <h1>ModalContent</h1>
            </BasicModal>
        </>
    );
}

export default SignInSignUp;