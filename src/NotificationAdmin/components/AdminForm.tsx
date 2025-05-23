import { FormEvent, useEffect, useState } from 'react';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Select, { MultiValue } from 'react-select';
import { useAdminStore, useForm } from '../../hooks';
import { useNavigate } from 'react-router-dom';


interface OptionType {
    value: string;
    label: string;
}

const formFields = {
    username: '',
    email: '',
    phoneNumber: ''
}

const formValidations = [
    {
      formField: 'username',
      fn: (value: string) => value.length >= 1,
      message: 'Username is a mandatory field'
    },
    {
      formField: 'email',
      fn: (value: string) => value.includes('@'),
      message: 'Enter a valid email'
    },
    {
        formField: 'phoneNumber',
        fn: (value: string) => value.length >= 1,
        message: 'Phone number is a mandatory field'
      }
  ];

export const AdminForm = () => {

    const { username, email, phoneNumber, usernameValid, emailValid, phoneNumberValid, 
            onInputChange, isFormValid
        } = useForm( formFields, formValidations );
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { startSavingUser, isSaving, startLoadingCategories, categories, startLoadingChannels, channels, adminFormStatus, disableAdminForm } = useAdminStore();
    const navigate = useNavigate();
    const [messageTypesSelect, setMessageTypesSelect] = useState<MultiValue<OptionType>>([]);
    const [notificationTypesSelect, setNotificationTypesSelect] = useState<MultiValue<OptionType>>([]);

    const handleMessageTypesChange = ( options: MultiValue<OptionType> ) => {
        setMessageTypesSelect( options );
    }

    const handleNotificationTypesChange = ( options: MultiValue<OptionType> ) => {
        setNotificationTypesSelect( options );
    }

    useEffect(() => {
      
        startLoadingCategories();
        startLoadingChannels();

    }, [])

    const handleSubmit = async( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        setFormSubmitted(true);
        if( !isFormValid ) return;

        const categoriesValues = messageTypesSelect.map( data => 
            data.value
        );

        const channelsValues = notificationTypesSelect.map( data => 
            data.value
        );

        await startSavingUser({name:username, email, phoneNumber, subscribed: categoriesValues, channels: channelsValues});
        navigate('/');
    }

    const handleDisableForm = () => {
        disableAdminForm();
    }

  return (
    <div className="ctn-admin-form" style={{ cursor: isSaving ? 'wait' : '', display: (!adminFormStatus) ? 'none' : 'block'  }}>
          <Row className="align-item-center">
              <Col>
                  <div className="title-form"><FontAwesomeIcon icon={faGears} size="2xl" style={{ color: "#BE7B72"}} /></div>
                  <hr className="hr-forms" />
              </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Row>
                <Form.Group 
                    as={Col} 
                    className="mb-3" 
                    controlId="id_username"
                >
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text"
                    data-testid="username"
                    placeholder="Enter an username"
                    name="username"
                    value={ username }
                    onChange={ onInputChange }
                    isInvalid={ !!usernameValid && formSubmitted }
                    />
                    <Form.Control.Feedback type="invalid">
                        { usernameValid }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group 
                    as={Col} 
                    className="mb-3" 
                    controlId="id_email"
                >
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text"
                    data-testid="email"
                    placeholder="Enter an email"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                    isInvalid={ !!emailValid && formSubmitted }

                />
                    <Form.Control.Feedback type="invalid">
                        { emailValid }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group 
                    as={Col} 
                    className="mb-3" 
                    controlId="id_phone_number"
                >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                    type="text"
                    data-testid="phoneNumber"
                    placeholder="Enter a phone number"
                    name="phoneNumber"
                    value={ phoneNumber }
                    onChange={ onInputChange }
                    isInvalid={ !!phoneNumberValid && formSubmitted }

                />
                    <Form.Control.Feedback type="invalid">
                        { phoneNumberValid }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="id_categories">
                    <Form.Label>Message Types</Form.Label>
                    <Select<OptionType, true>
                        isMulti
                        value={ messageTypesSelect }
                        aria-label="categories"
                        onChange={ handleMessageTypesChange }
                        options={
                            categories.map( ({ messageType}) => (
                                { value: messageType.toLowerCase(), label: messageType.charAt(0).toUpperCase() + messageType.substring(1) }
                            ))
                        }
                        placeholder="Select the subscriptions"
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="id_channels">
                    <Form.Label>Notification Types</Form.Label>
                    <Select
                        isMulti
                        value={ notificationTypesSelect }
                        aria-label="channels"
                        onChange={handleNotificationTypesChange}
                        options={
                            channels.map( ({ notificationType }) => (
                                { value: notificationType.toLowerCase(), label: notificationType.charAt(0).toUpperCase() + notificationType.substring(1) }
                            ))
                        }
                        placeholder="Select the notification types"
                    />
                </Form.Group>
            </Row>
            <Row className="ctn-admin-user-buttons">
                <Col lg={4} md={12} sm={12} >
                    <Button
                    aria-label="btn-cancel"
                    disabled={isSaving}
                    type="button"
                    className="btn-custom-primary"
                    onClick={handleDisableForm}
                    >
                    Cancel                    
                    </Button>        
                </Col>
                <Col lg={4} md={12} sm={12} >
                    <Button
                    aria-label="btn-save"
                    disabled={isSaving}
                    type="submit"
                    className="btn-custom-primary"
                    >
                    Save                    
                    </Button>        
                </Col>
            </Row>
          </Form>
    </div>
  )
}
