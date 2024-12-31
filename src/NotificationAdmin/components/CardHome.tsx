import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
    title: string,
    icon: IconDefinition,
    description: string,
    navigateRoute: string,
}

export const CardHome = ( { title, icon, description, navigateRoute }: Props ) => {
  const navigate = useNavigate();
  return (
    <Card data-testid="id-card-notification-home" onClick={ () => navigate(navigateRoute) } className="card-notification-home">
        <Card.Header><Col lg={3} md={2} sm={2}> <span className="icon-frame"><FontAwesomeIcon icon={icon} size="2xl" style={{color: "#BE7B72",}} /></span> </Col><Col lg={9} md={10} sm={10}></Col></Card.Header>
        <Card.Body>
            <Card.Title><span className="custom-card-title" >{ title }</span></Card.Title>
            <Card.Text>
                { description }
            </Card.Text>
        </Card.Body>
    </Card>
  )
}
