import { nsApi } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, onLoadLogHistory } from '../store';
import { LogHistory, LogHistoryReport } from '../interfaces/interfaces';

export const useLogHistoryStore = () => {

    const dispatch = useDispatch();
    const { logHistory } = useSelector( ( state: IRootState ) => state.broadcastMessage );

    const startLoadingLogHistory = async() => {
        
        try {
            
            const { data } = await nsApi.get('/LogHistory/getLogHistory');
            const { messages } = data;
            dispatch( onLoadLogHistory(messages) );

        } catch (error) {
            console.log(error);
        }

    }

    const fromLogHistoryToReport = ( array: LogHistory[] ): LogHistoryReport[] => {
      
      // const { messageType, notificationType, user, creationDate } = array;

      // return { messageType, notificationType, creationDate, userName: user?.name ?? '', email: user?.email ?? '', phoneNumber: user?.phoneNumber ?? ''  }

      const dataReport = array.map( (data) => {
        const { messageType, notificationType, user, creationDate } = data;
        return { messageType, notificationType, creationDate, userName: user?.name ?? '', email: user?.email ?? '', phoneNumber: user?.phoneNumber ?? ''  }
      });

      return dataReport;

    }

  return {
    //*Properties
    logHistory,

    //*Methods
    startLoadingLogHistory,
    fromLogHistoryToReport
  }
}