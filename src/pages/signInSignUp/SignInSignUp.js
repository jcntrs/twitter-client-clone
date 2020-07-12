import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUsers, faComment } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LogoWhite from '../../assets/img/png/logo-white.png';
import LogoBlue from '../../assets/img/png/logo-blue.png';
import BasicModal from '../../components/modals/basic/BasicModal';
import SignUpForm from '../../components/signUp/SignUpForm';
import SignInForm from '../../components/signIn/SignInForm';
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

const RightComponent = ({ openModal, setShowModal, setCheckLogin }) => {
    return (
        <Col className="signin-signup-right" xs={6}>
            <div>
                <img src={LogoWhite} alt="White Logo" />
                <h2>Mira lo que está pasando en el mundo en este momento</h2>
                <h3>Únete hoy mismo.</h3>
                <Button variant="primary" onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}>Regístrate</Button>
                <Button variant="outline-primary" onClick={() => openModal(<SignInForm setCheckLogin={setCheckLogin} />)}>Iniciar sesión</Button>
            </div>
        </Col>
    )
}

const SignInSignUp = ({ setCheckLogin }) => {
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    const openModal = content => {
        setContentModal(content);
        setShowModal(true);
    }

    return (
        <>
            <Container className="signin-signup" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent openModal={openModal} setShowModal={setShowModal} setCheckLogin={setCheckLogin} />
                </Row>
            </Container>
            <BasicModal showModal={showModal} setShowModal={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    );
}

export default SignInSignUp;