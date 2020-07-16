import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { logOutAPI } from '../../api/auth';
import LogoWhite from '../../assets/img/png/logo-white.png';
import AuthContext from '../../contexts/auth/AuthContext';
import TweetModal from '../modals/tweet/TweetModal';
import useAuth from '../../hooks/useAuth';
import './leftMenu.scss';

const LeftMenu = () => {
    const [showModal, setShowModal] = useState(false);
    const { setCheckLogin } = useContext(AuthContext);
    const { user } = useAuth();

    const logOut = () => {
        logOutAPI();
        setCheckLogin(true);
    }

    return (
        <div className="left-menu">
            <img className="logo" src={LogoWhite} alt="White Logo" />
            <Link to="/"><FontAwesomeIcon icon={faHome} /> Inicio</Link>
            <Link to={`/perfil/${user?._id}`}><FontAwesomeIcon icon={faUser} /> Perfil</Link>
            <Link to="/usuarios"><FontAwesomeIcon icon={faUsers} /> Usuarios</Link>
            <Link to="" onClick={logOut}><FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión</Link>

            <Button onClick={() => setShowModal(true)}>Publicar</Button>
            <TweetModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}

export default LeftMenu;