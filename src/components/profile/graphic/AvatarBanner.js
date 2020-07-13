import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { checkFollowAPI, followUserAPI, unFollowUserAPI } from '../../../api/follow';
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
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);

    const followUser = () => {
        followUserAPI(user.id).then(() => {
            setReloadFollow(true);
        });
    }

    const unFollowUser = () => {
        unFollowUserAPI(user.id).then(() => {
            setReloadFollow(true);
        });
    }

    useEffect(() => {
        if (user) {
            checkFollowAPI(user.id).then(response => {
                response?.status ? setFollowing(true) : setFollowing(false);
            })
            setReloadFollow(false);
        }
    }, [user, reloadFollow]);

    return (
        <div className="avatar-banner" style={{ backgroundImage: `url('${bannerURL}')` }}>
            <div className="avatar" style={{ backgroundImage: `url('${avatarURL}')` }} />
            {user &&
                <div className="options">
                    {currentUser.user._id === user.id && <Button onClick={() => setShowModal(true)}>Editar perfil</Button>}
                    {currentUser.user._id !== user.id && (
                        following !== null && (
                            following ? <Button className="unfollow" onClick={unFollowUser}><span>Siguiendo</span></Button> : <Button onClick={followUser}>Seguir</Button>
                        )
                    )}
                </div>
            }
            <ConfigModal show={showModal} setShowModal={setShowModal} title="Editar perfil">
                <ProfileForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    );
}

export default AvatarBanner;