import React, { useState, useEffect } from 'react';
import { Media, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserAPI } from '../../../api/user';
import AvatarNotFound from '../../../assets/img/png/avatar-not-found.png';

const User = ({ user }) => {
    const baseURL = process.env.REACT_APP_API_URL;
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        getUserAPI(user.id).then(response => {
            setUserInfo(response);
        })
        // eslint-disable-next-line
    }, []);

    return (
        <Media as={Link} to={`/perfil/${user.id}`} className="list-users-user">
            <Image
                width="64"
                height="64"
                className="mr-3"
                src={userInfo?.avatar ? `${baseURL}/obtener-avatar?id=${user.id}` : AvatarNotFound}
                alt={`${user.names} ${user.surnames}`}
                roundedCircle
            />
            <Media.Body>
                <h5>{user.names} {user.surnames}</h5>
                <p>{userInfo?.biography}</p>
            </Media.Body>
        </Media>
    );
}

export default User;