import { Col, Container, Row } from 'react-bootstrap';
import { CardHome, NotificationLayout } from '../';
import { faGears, faTableList, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import '../notificationHome.css';

export const NotificationHome = () => {
  return (
    <NotificationLayout>
        <Container className="ctn-notification-system-menu">
            <Row>
                <Col lg={4} md={12} sm={12}>
                    <CardHome 
                        title="Broadcast Message" 
                        icon={faTowerBroadcast} 
                        navigateRoute="/broadcastMessage"
                        description="Enter this option to send a message to every user who is subscribed to each available channel" />
                </Col>
                <Col lg={4} md={12} sm={12}>
                    <CardHome 
                        title="Log History" 
                        icon={faTableList}
                        navigateRoute="/logHistory" 
                        description="Check all the messages which have been sent" />
                </Col>
                <Col lg={4} md={12} sm={12}>
                    <CardHome 
                        title="Admin" 
                        icon={faGears}
                        navigateRoute="/NSadmin" 
                        description="Create a new user through this option" />
                </Col>
            </Row>
        </Container>
    </NotificationLayout>
  )
}
