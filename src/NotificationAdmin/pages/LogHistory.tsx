import { Container } from 'react-bootstrap'
import { MessagesReport } from '../components/MessagesReport'
import { NotificationLayout } from '../layout/NotificationLayout'
import '../LogHistory.css';

export const LogHistory = () => {
  return (
    <NotificationLayout>
      <Container>
      <MessagesReport/>
      </Container>
    </NotificationLayout>
  )
}
