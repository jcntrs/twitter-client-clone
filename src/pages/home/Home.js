import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { getTweetsFollowersAPI } from '../../api/tweet';
import MainLayout from '../../layout/main/MainLayout';
import ListTweets from '../../components/list/tweets/ListTweets';
import './home.scss';

const modelFormat = tweets => {
    const tempTweets = [];

    tweets.map(tweet =>
        tempTweets.push({
            _id: tweet._id,
            userID: tweet.userRelationshipID,
            message: tweet.Tweets.message,
            createdAt: tweet.Tweets.createdAt
        })
    );

    return tempTweets;
}

const Home = () => {
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loadingTweets, setLoadingTweets] = useState(false);
    const moreData = () => {
        setLoadingTweets(true);
        setPage(page + 1);
    }

    useEffect(() => {
        getTweetsFollowersAPI(page).then(response => {
            if (!tweets && response) {
                setTweets(modelFormat(response));
            } else {
                if (!response) {
                    setLoadingTweets(0);
                } else {
                    const data = modelFormat(response)
                    setTweets([...tweets, ...data]);
                    setLoadingTweets(false);
                }
            }
        }).catch(() => { });
        // eslint-disable-next-line
    }, [page]);

    return (
        <MainLayout layoutClass="home">
            <div className="home-title">
                <h2>Inicio</h2>
            </div>
            {tweets && <ListTweets tweets={tweets} />}
            <Button onClick={moreData} className="load-more">
                {!loadingTweets
                    ? (loadingTweets !== 0 ? 'Más tweets' : 'No hay más tweets')
                    : (<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />)
                }
            </Button>
        </MainLayout>
    );
}

export default Home;