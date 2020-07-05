import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validations';
import { signInAPI, setTokenAPI } from '../../api/auth';
import './signInForm.scss';

const SignInForm = ({ setCheckLogin }) => {
    const initialFormValue = { email: '', password: '' };
    const [formData, setFormData] = useState(initialFormValue);
    const [signInLoading, setSignInLoading] = useState(false);

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();

        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
        });

        if (validCount !== size(formData)) {
            toast.warning('❌ Completa todos los campos del formulario.'); return
        }
        if (!isValidEmail(formData.email)) {
            toast.warning('❌ Email inválido.'); return
        }

        setSignInLoading(true);
        signInAPI(formData).then(response => {
            if (response.message) {
                toast.error(`❌ ${response.message}`);
            } else {
                toast.success('🚀 Login exitoso!');
                setTokenAPI(response.token);
                setCheckLogin(true);
            }
        }).catch(() => {
            toast.error(`❌ Error del servidor, inténtelo más tarde.`);
        }).finally(() => {
            setSignInLoading(false);
        });
    }

    return (
        <div className="sign-in-form">
            <h2>¿Listo para más?</h2>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email" name="email" defaultValue={formData.email} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Contraseña" name="password" defaultValue={formData.password} />
                </Form.Group>
                <Button variant="primary" type="submit">{!signInLoading ? 'Iniciar sesión' : <Spinner animation="border" />}</Button>
            </Form>
        </div>
    );
}

export default SignInForm;