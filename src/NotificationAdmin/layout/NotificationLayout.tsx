import { Nav } from 'react-bootstrap';
import { NavBar } from '../../ui';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const NotificationLayout = ({ children }: Props) => {
  return (
    <div className="notification-layout">
        <NavBar>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/broadcastMessage">Broadcast Message</Nav.Link>
            <Nav.Link href="/logHistory">Log History</Nav.Link>
            <Nav.Link href="/NSadmin">Admin</Nav.Link>
        </NavBar>
        <div className="container-in-layout" >
            { children }
        </div>
    </div>
  )
}
