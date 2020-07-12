import React from 'react';
import { Location, Link, DateBirth } from '../../../utils/icons';
import moment from 'moment';
import language from 'moment/locale/es';
import ContentLoader from 'react-content-loader'
import './profileInfo.scss';

const ProfileInfoLoader = () => (
    <ContentLoader
        height={140}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 380 70"
    >
        {/* Only SVG shapes */}
        <rect x="10" y="3" rx="4" ry="4" width="150" height="7" />
        <rect x="10" y="15" rx="3" ry="3" width="75" height="5" />
        <rect x="10" y="30" rx="3" ry="3" width="200" height="6" />
        <rect x="10" y="45" rx="4" ry="4" width="300" height="7" />
    </ContentLoader>
)

const ProfileInfo = ({ user }) => (
    <>
        {user
            ? <div className="profile-info">
                <h2 className="name">
                    {user.names} {user.surnames}
                </h2>
                <p className="email">{user.email}</p>
                {user?.biography && <div className="description">{user.biography}</div>}
                <div className="more-info">
                    {user?.location && <div><p><Location />{user.location}</p></div>}
                    {user?.website &&
                        <a
                            href={user.website}
                            alt={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Link />{user.website}
                        </a>
                    }
                    {user?.birthdate && <p><DateBirth />{moment(user.birthdate).locale('es', language).format('LL')}</p>}
                </div>
            </div>
            : <ProfileInfoLoader />
        }
    </>
);


export default ProfileInfo;