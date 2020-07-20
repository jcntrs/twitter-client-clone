import React from 'react';
import { Link } from 'react-router-dom';
import LogoBlue from '../../assets/img/png/logo-blue.png';
import Error404Img from '../../assets/img/png/error-404.png';
import './error404.scss';

const Error404 = () => {
    return (
        <div className="error404">
            <img src={LogoBlue} alt="Blue Logo" />
            <img src={Error404Img} alt="Error404" />
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}

export default Error404;