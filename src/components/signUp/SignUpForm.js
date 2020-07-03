import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { values, size } from 'lodash';
import { toast } from 'react-toastify';
import { isValidEmail } from '../../utils/validations';
import './signUpForm.scss';

const SignUpForm = ({ setShowModal }) => {
    const initialFormValue = { names: '', surnames: '', email: '', password: '', repeatPassword: '' };
    const [formData, setFormData] = useState(initialFormValue);

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();
        //setShowModal(false);
        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
        });

        if (validCount !== size(formData)) {
            toast.warning('❌ Complete todos los campos del formulario.'); return
        }
        if (!isValidEmail(formData.email)) {
            toast.warning('❌ Email inválido.'); return
        }
        if (formData.password !== formData.repeatPassword) {
            toast.warning('❌ Contraseñas no coinciden.'); return
        }
        if (size(formData.password) < 6) {
            toast.warning('❌ Contraseñas debe contener al menos 6 caracteres.'); return
        }

        toast.success('🚀 Formulario OK!')
        console.log(validCount)
    }

    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombres" name="names" defaultValue={formData.names} />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Apellidos" name="surnames" defaultValue={formData.surnames} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Correo electrónico" name="email" defaultValue={formData.email} />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="password" placeholder="Contraseña" name="password" defaultValue={formData.password} />
                        </Col>
                        <Col>
                            <Form.Control type="password" placeholder="Repetir Contraseña" name="repeatPassword" defaultValue={formData.repeatPassword} />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">Registrarse</Button>
            </Form>
        </div>
    );
}

export default SignUpForm;