import React, { useState, useCallback } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { Camera } from '../../../utils/icons';
import { uploadBannerAPI, uploadAvatarAPI, updateUserInfoAPI } from '../../../api/user';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import './profileForm.scss';

const initialState = user => {
    return {
        names: user.names || '',
        surnames: user.surnames || '',
        biography: user.biography || '',
        location: user.location || '',
        website: user.website || '',
        birthdate: user.birthdate || ''
    }
}

const ProfileForm = ({ user, setShowModal }) => {
    const baseURL = process.env.REACT_APP_API_URL
    const [formData, setFormData] = useState(initialState(user));
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [bannerURL, setBannerURL] = useState(user?.banner ? `${baseURL}/obtener-banner?id=${user.id}` : null);
    const [avatarURL, setAvatarURL] = useState(user?.avatar ? `${baseURL}/obtener-avatar?id=${user.id}` : null);
    const [loading, setLoading] = useState(false);

    const handleDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerURL(URL.createObjectURL(file));
        setBannerFile(file);
    }, []);

    const handlerDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarURL(URL.createObjectURL(file));
        setAvatarFile(file);
    }, []);

    const { getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: handleDropBanner
    });

    const { getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        noKeyboard: true,
        multiple: false,
        onDrop: handlerDropAvatar
    });

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        if (bannerFile) {
            await uploadBannerAPI(bannerFile).catch(() => {
                toast.warning('❌ Error al subir nuevo banner.');
            });
        }
        if (avatarFile) {
            await uploadAvatarAPI(avatarFile).catch(() => {
                toast.warning('❌ Error al subir nuevo avatar.');
            });
        }

        await updateUserInfoAPI(formData).then(() => {
            setShowModal(false);
        }).catch(() => {
            toast.warning('❌ Error al actualizar perfil.');
        });

        setLoading(false)
        window.location.reload();
    }

    return (
        <div className="profile-form">
            <div className="banner" style={{ backgroundImage: `url('${bannerURL}')` }} {...getRootBannerProps()}>
                <input {...getInputBannerProps()} />
                <Camera />
            </div>
            <div className="avatar" style={{ backgroundImage: `url('${avatarURL}')` }} {...getRootAvatarProps()}>
                <input {...getInputAvatarProps()} />
                <Camera />
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombres" name="names" defaultValue={formData.names} onChange={handleChange} />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Apellidos" name="surnames" defaultValue={formData.surnames} onChange={handleChange} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" row="3" type="text" placeholder="Agrega tu biografía" name="biography" defaultValue={formData.biography} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <DatePicker placeholder="Fecha de nacimiento" locale={es} selected={new Date(formData.birthdate)} onChange={date => setFormData({ ...formData, birthdate: date })} />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Sitio web" name="website" defaultValue={formData.website} onChange={handleChange} />
                        </Col>
                    </Row>
                </Form.Group>
                <Button className="btn-submit" variant="primary" type="submit">{loading && <Spinner animation="border" size="sm" />} Actualizar</Button>
            </Form>
        </div>
    );
}

export default ProfileForm;