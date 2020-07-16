import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { getUserAPI } from '../../api/user';
import { replaceURLWithHTMLLinks } from '../../utils/functions';
import AvatarNotFound from '../../assets/img/png/avatar-not-found.png';
import moment from 'moment';
import './listTweets.scss';

const Tweet = ({ tweet }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [avatarURL, setAvatarURL] = useState(null);
    const baseURL = process.env.REACT_APP_API_URL
    console.log(tweet)
    useEffect(() => {
        getUserAPI(tweet.userID).then(response => {
            setUserInfo(response);
            setAvatarURL(response?.avatar ? `${baseURL}/obtener-avatar?id=${response.id}` : AvatarNotFound);
        });
        // eslint-disable-next-line
    }, [tweet]);

    return (
        <div className="tweet">
            <Image className="avatar" src={avatarURL} roundedCircle />
            <div>
                <div className="fullname">
                    {userInfo?.names} {userInfo?.surnames}
                    <span>{moment(tweet.createdAt).calendar()}</span>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(tweet.message) }}
                />
            </div>
        </div>
    );
}

const ListTweets = ({ tweets }) => {
    return (
        <div className="list-tweets">
            {tweets.map(tweet => (
                <Tweet key={tweet._id} tweet={tweet} />
            ))}
        </div>
    );
}

export default ListTweets;