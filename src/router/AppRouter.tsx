import { Route, Routes } from 'react-router-dom';
import { NotificationAdminRoutes } from '../NotificationAdmin';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/*" element={ <NotificationAdminRoutes /> } > </Route>
    </Routes>
  )
}
