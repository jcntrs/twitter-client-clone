import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faUsers, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { logOutAPI } from '../../api/auth';
import LogoWhite from '../../assets/img/logo-white.png';
import AuthContext from '../../contexts/auth/AuthContext';
import './leftMenu.scss';

const LeftMenu = () => {
    const { setCheckLogin } = useContext(AuthContext);

    const logOut = () => {
        logOutAPI();
        setCheckLogin(true);
    }

    return (
        <div className="left-menu">
            <img className="logo" src={LogoWhite} alt="White Logo" />
            <Link to="/"><FontAwesomeIcon icon={faHome} /> Inicio</Link>
            <Link to="/perfil"><FontAwesomeIcon icon={faUser} /> Perfil</Link>
            <Link to="/usuarios"><FontAwesomeIcon icon={faUsers} /> Usuarios</Link>
            <Link to="" onClick={logOut}><FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión</Link>

            <Button>Nueva Publicación</Button>
        </div>
    );
}

export default LeftMenu;