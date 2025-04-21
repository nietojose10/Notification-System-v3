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
            console.log(data);
            dispatch( onLoadLogHistory(data) );

        } catch (error) {
            console.log(error);
        }

    }

    const fromLogHistoryToReport = ( array: LogHistory[] ): LogHistoryReport[] => {
      
      console.log(array);
      const dataReport = array.map( (data) => {
        const { typeMessage, channel, user, creationDate } = data;
        return { typeMessage, channel, creationDate, userName: user?.name ?? '', email: user?.email ?? '', phoneNumber: user?.phoneNumber ?? ''  }
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
