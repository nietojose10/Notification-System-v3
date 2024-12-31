import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NotificationApp = () => {
  return (
      <Provider store={ store }>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
  )
}