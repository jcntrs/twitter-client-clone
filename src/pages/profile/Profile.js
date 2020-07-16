import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserAPI } from '../../api/user';
import { getUserTweetsAPI } from '../../api/tweet';
import { ProfileTitleLoader } from '../../utils/loaders';
import { Button, Spinner } from 'react-bootstrap';
import MainLayout from '../../layout/main/MainLayout';
import AvatarBanner from '../../components/profile/graphic/AvatarBanner';
import ProfileInfo from '../../components/profile/info/ProfileInfo';
import ListTweets from '../../components/list/ListTweets';
import './profile.scss';

const Profile = ({ match: { params: { id } } }) => {
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingPosts, setLoadingPosts] = useState(false);
    
    const getMorePosts = () => {
        const tempPage = page + 1;
        setLoadingPosts(true);

        getUserTweetsAPI(id, tempPage).then(response => {
            if (!response) {
                setLoadingPosts(0);
            } else {
                setTweets([...tweets, ...response]);
                setPage(tempPage);
                setLoadingPosts(false);
            }
        });
    }

    useEffect(() => {
        getUserAPI(id).then(response => {
            response ? setUser(response) : toast.error(`❌ El usuario que has visitado no existe.`);
        }).catch(() => {
            toast.error(`❌ Error del servidor, inténtelo más tarde.`);
        });
    }, [id]);

    useEffect(() => {
        getUserTweetsAPI(id, 1).then(response => {
            setTweets(response);
        }).catch(() => {
            setTweets([]);
        });
    }, [id]);

    return (
        <MainLayout layoutClass="profile">
            <div className="profile-title">
                <h2>{user ? `${user.names} ${user.surnames}` : <ProfileTitleLoader />}</h2>
            </div>
            <AvatarBanner user={user} />
            <ProfileInfo user={user} />
            <div className="profile-post">
                <h3>Publicaciones</h3>
                {tweets && <ListTweets tweets={tweets} />}
                <Button onClick={getMorePosts}>
                    {!loadingPosts
                        ? loadingPosts !== 0 && 'Más publicaciones'
                        : <Spinner as="span" animation="grow" size="sm" role="status" arian-hidden="true" />
                    }
                </Button>
            </div>
        </MainLayout>
    );
}

export default withRouter(Profile);