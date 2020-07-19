import React from 'react';
import User from './User';
import './listUsers.scss';

const ListUsers = ({ users }) => {
    if (users.length === 0) {
        return <h2 className="users-not-found">No hay resultados</h2>
    }

    return (
        <ul className="list-users">
            {users.map(user => <User key={user.id} user={user} />)}
        </ul>
    );
}

export default ListUsers;