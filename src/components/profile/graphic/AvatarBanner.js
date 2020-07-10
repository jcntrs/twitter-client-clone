import React from 'react';
import { Button } from 'react-bootstrap';
import AvatarNotFound from '../../../assets/img/png/avatar-not-found.png';
import useAuth from '../../../hooks/useAuth';
import './avatarBanner.scss';

const AvatarBanner = ({ user }) => {
    const baseURL = process.env.REACT_APP_API_URL
    const bannerURL = user?.banner ? `${baseURL}/obtener-banner?id=${user.id}` : null;
    const avatarURL = user?.avatar ? `${baseURL}/obtener-avatar?id=${user.id}` : AvatarNotFound;
    const currentUser = useAuth();

    return (
        <div className="avatar-banner" style={{ backgroundImage: `url('${bannerURL}')` }}>
            <div className="avatar" style={{ backgroundImage: `url('${avatarURL}')` }} />
            {user &&
                <div className="options">
                    {currentUser.user._id === user.id && <Button>Editar perfil</Button>}
                    {currentUser.user._id !== user.id && <Button>Seguir</Button>}
                </div>
            }
        </div>
    );
}

export default AvatarBanner;