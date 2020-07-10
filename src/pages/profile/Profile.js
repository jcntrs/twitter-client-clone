import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserAPI } from '../../api/user';
import MainLayout from '../../layout/main/MainLayout';
import AvatarBanner from '../../components/profile/graphic/AvatarBanner';
import ProfileInfo from '../../components/profile/info/ProfileInfo';
import ContentLoader from 'react-content-loader'
import './profile.scss';

const ProfileTitleLoader = () => (
    <ContentLoader
        height={19}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 380 33"
    >
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="4" ry="4" width="300" height="13" />
        <rect x="0" y="23" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
)

const Profile = ({ match: { params: { id } } }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserAPI(id).then(response => {
            response ? setUser(response) : toast.error(`❌ El usuario que has visitado no existe.`);
        }).catch(() => {
            toast.error(`❌ Error del servidor, inténtelo más tarde.`);
        });
    }, [id]);

    return (
        <MainLayout layoutClass="profile">
            <div className="profile-title">
                <h2>{user ? `${user.names} ${user.surnames}` : <ProfileTitleLoader />}</h2>
            </div>
            <AvatarBanner user={user} />
            <ProfileInfo user={user} />
            <div className="profile-post">Lista de publicaciones!</div>
        </MainLayout>
    );
}

export default withRouter(Profile);