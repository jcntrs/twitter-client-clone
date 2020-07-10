import React from 'react';
import moment from 'moment';
import language from 'moment/locale/es';
import { Location, Link, DateBirth } from '../../../utils/icons';
import './profileInfo.scss';

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
            : <h2>no info</h2>
        }
    </>
);


export default ProfileInfo;