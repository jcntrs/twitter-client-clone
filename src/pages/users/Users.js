import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getFollowsAPI } from '../../api/follow';
import { useDebouncedCallback } from 'use-debounce';
import queryString from 'query-string';
import MainLayout from '../../layout/main/MainLayout';
import ListUsers from '../../components/list/users/ListUsers';
import './users.scss';

const useQuery = location => {
    const { page = 1, type = 'follow', search } = queryString.parse(location.search);

    return { page, type, search };
}

const Users = ({ location, history }) => {
    const [users, setUsers] = useState(null);
    const params = useQuery(location);
    const [userType, setUserType] = useState(params.type);
    const [btnLoading, setBtnLoading] = useState(false);

    const [onSearch] = useDebouncedCallback(value => {
        setUsers(null);
        history.push({ search: queryString.stringify({ ...params, search: value, page: 1 }) });
    }, 500); // Ejecuta la función después de medio segundo

    const moreData = () => {
        setBtnLoading(true);
        const newPage = parseInt(params.page) + 1;
        history.push({ search: queryString.stringify({ ...params, page: newPage }) });
    }

    const handleTypeChange = type => {
        setUsers(null);
        type === 'new' ? setUserType('new') : setUserType('follow');
        history.push({ search: queryString.stringify({ type, page: 1, search: '' }) });
    }

    useEffect(() => {
        getFollowsAPI(queryString.stringify(params)).then(response => {
            if (parseInt(params.page) === 1) {
                response ? setUsers(response) : setUsers([]);
            } else {
                if (response) {
                    setUsers([...users, ...response]);
                    setBtnLoading(false);
                } else {
                    setBtnLoading(0);
                }
            }
        }).catch(() => {
            setUsers([]);
        });
        // eslint-disable-next-line
    }, [location]);

    return (
        <MainLayout layoutClass="users" title="Usuarios">
            <div className="users-title">
                <h2>Usuarios</h2>
                <input type="text" placeholder="Busca un usuario..." onChange={event => onSearch(event.target.value)} />
            </div>
            <ButtonGroup className="users-options">
                <Button className={userType === 'follow' && 'active'} onClick={() => handleTypeChange('follow')}>Siguiendo</Button>
                <Button className={userType === 'new' && 'active'} onClick={() => handleTypeChange('new')}>Nuevos</Button>
            </ButtonGroup>
            {!users
                ? <div className="users-loading">
                    <Spinner animation="border" variant="info" />
                    Buscando usuarios
                </div>
                : <>
                    <ListUsers users={users} />
                    <Button onClick={moreData} className="load-more">
                        {!btnLoading
                            ? btnLoading !== 0 && 'Más usuarios'
                            : <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                        }
                    </Button>
                </>
            }
        </MainLayout>
    );
}

export default withRouter(Users);