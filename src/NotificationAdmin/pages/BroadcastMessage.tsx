import { Container } from 'react-bootstrap';
import { BroadcastForm, NotificationLayout } from '../';
import '../broadcastMessage.css';

export const BroadcastMessage = () => {
  return (
    <NotificationLayout>
      <Container>
        <BroadcastForm/>
      </Container>
    </NotificationLayout>
  )
}
