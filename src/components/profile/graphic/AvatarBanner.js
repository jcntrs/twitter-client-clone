import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AvatarNotFound from '../../../assets/img/png/avatar-not-found.png';
import useAuth from '../../../hooks/useAuth';
import ConfigModal from '../../modals/config/ConfigModal';
import ProfileForm from '../edit/ProfileForm';
import './avatarBanner.scss';

const AvatarBanner = ({ user }) => {
    const baseURL = process.env.REACT_APP_API_URL
    const bannerURL = user?.banner ? `${baseURL}/obtener-banner?id=${user.id}` : null;
    const avatarURL = user?.avatar ? `${baseURL}/obtener-avatar?id=${user.id}` : AvatarNotFound;
    const currentUser = useAuth();

    const [showModal, setShowModal] = useState(false);

    return (
        <div className="avatar-banner" style={{ backgroundImage: `url('${bannerURL}')` }}>
            <div className="avatar" style={{ backgroundImage: `url('${avatarURL}')` }} />
            {user &&
                <div className="options">
                    {currentUser.user._id === user.id && <Button onClick={() => setShowModal(true)}>Editar perfil</Button>}
                    {currentUser.user._id !== user.id && <Button>Seguir</Button>}
                </div>
            }
            <ConfigModal show={showModal} setShowModal={setShowModal} title="Editar perfil">
                <ProfileForm user={user} setShowModal={setShowModal}/>
            </ConfigModal>
        </div>
    );
}

export default AvatarBanner;