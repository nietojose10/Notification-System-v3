import { useDispatch, useSelector } from 'react-redux';
import { nsApi } from '../api';
import Swal from 'sweetalert2';
import { onClearSaving, onLoadCategories, onSavingNotification, IRootState } from '../store';
// import { useState, useRef, useEffect } from 'react';

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

interface SendingMessageProps {
    category: string,
    message: string,
}

export const useBroadcastMessageStore = () => {
    const dispatch = useDispatch();
    const { isSaving, categories, logHistory } = useSelector( ( state: IRootState ) => state.broadcastMessage );
    // const [timer, setTimer] = useState(0);
    // const timerRef = useRef<NodeJS.Timeout>();

    // const startTimer = () => {
    //     console.log({startTimerFn: timer});
    //     if (!timerRef.current) {
    //         timerRef.current = setInterval(() => {
    //             // timervalue.current += 1;
    //             setTimer( prevState => prevState + 1);
    //         }, 1000); 
    //     }
    // }

    // useEffect(() => {
    //   console.log(timer);
    // }, [timer]);

    // const stopTimer = () => {
    //     setTimer(0);
    //     if ( timerRef.current ) {
    //         clearInterval(timerRef.current);
    //         timerRef.current = undefined;
    //     }

    // }

    // useEffect(() => {
    //     return () => clearInterval(timerRef.current);
    // }, []);

    const startSendingMessage = async( { category, message }: SendingMessageProps ) => {

        try {
            // startTimer();
            dispatch( onSavingNotification() );
            await nsApi.post('/broadcast/sendMessage', { category, message } );      
            await Toast.fire({ icon: 'success', title: 'Message successfully sent.' });
            
            // stopTimer();
            dispatch( onClearSaving() );

        } catch (error) {
            console.log(error);
            await Toast.fire({ icon: 'error', title: 'Message could not be sent.' });
            dispatch( onClearSaving() );
        }

    }

    const startLoadingCategories = async() => {
        try {
            
            const { data } = await nsApi.get('/admin/getMessageTypes');
            dispatch( onLoadCategories( data ) ); 

        } catch (error) {
            console.log(error);
        }
    }

    return {
        //*Properties
            isSaving,
            categories,
            logHistory,
        //*Methods
            startSendingMessage,
            startLoadingCategories
    }
}
