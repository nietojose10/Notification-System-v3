import { Col, Container, Row } from 'react-bootstrap';
import { NotificationLayout, AdminForm, AdminReport } from '../';
import '../nsAdmin.css';
import { useAdminStore } from '../../hooks';
import { useEffect } from 'react';

export const NSAdmin = () => {

  const { disableAdminForm } = useAdminStore();

  // useEffect(() => {
  //   disableAdminForm();
  // }, []);
  

  return (
    <NotificationLayout>
      <Container>
        <Row>
          <Col lg={12}>
            <AdminReport/>
          </Col>
          <Col lg={12}>
            <AdminForm/>
          </Col>
        </Row>
      </Container>
    </NotificationLayout>
  )
}
