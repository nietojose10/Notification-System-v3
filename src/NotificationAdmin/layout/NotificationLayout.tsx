import { NavBar } from '../../ui';
import { NavLink } from 'react-router-dom';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const NotificationLayout = ({ children }: Props) => {
  return (
    <div className="notification-layout">
        <NavBar>
            <NavLink
              className="nav-link"
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              to={"/broadcastMessage"}  
            >
              Broadcast Message
            </NavLink>
            <NavLink
              className="nav-link"
              to={"/logHistory"}
            >
              Log History
            </NavLink>
            <NavLink
              className="nav-link"
              to={"/NSadmin"}
            >
              Admin
            </NavLink>
        </NavBar>
        <div className="container-in-layout" >
            { children }
        </div>
    </div>
  )
}
