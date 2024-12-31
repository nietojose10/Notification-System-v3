import { Route, Routes } from 'react-router-dom';
import { BroadcastMessage, LogHistory, NSAdmin, NotificationHome } from '../';

export const NotificationAdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <NotificationHome /> } > </Route>
        <Route path="/broadcastMessage" element={ <BroadcastMessage /> } > </Route>
        <Route path="/logHistory" element={ <LogHistory /> } > </Route>
        <Route path="/NSadmin" element={ <NSAdmin /> } > </Route>
    </Routes>
  )
}
