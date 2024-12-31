import { Container } from 'react-bootstrap';
import { NotificationLayout, AdminForm } from '../';
import '../nsAdmin.css';

export const NSAdmin = () => {
  return (
    <NotificationLayout>
      <Container>
        <AdminForm/>
      </Container>
    </NotificationLayout>
  )
}
