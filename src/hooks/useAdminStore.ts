import { useDispatch, useSelector } from 'react-redux';
import { nsApi } from '../api';
import Swal from 'sweetalert2';
import { onClearSavingUser, onLoadCategoriesUser, onLoadChannelsUser, onSavingUser, IRootState } from '../store';

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

interface SavingUserProps {
    name: string,
    email: string,
    phoneNumber: string,
    subscribed: string[],
    channels: string[],
}

export const useAdminStore = () => {
    
    const dispatch = useDispatch();
    const { isSaving, categories, channels } = useSelector( (state: IRootState) => state.auth );

    const startSavingUser = async({ name, email, phoneNumber, subscribed, channels }: SavingUserProps ) => {
        
        console.log('Calling startSavingUser');
        try {
            dispatch( onSavingUser() );
            await nsApi.post('/auth/register',{ name, email, phoneNumber, subscribed, channels });
            
            await Toast.fire({ icon: 'success', title: 'User Successfully created.' });
            // dispatch( onClearSavingUser() );
        } catch (error) {
            console.log(error);
            await Toast.fire({ icon: 'error', title: 'User could not be created.' });
            dispatch( onClearSavingUser() );

        }

    }

    const startLoadingCategories = async() => {
        try {
            
            const { data } = await nsApi.get('/admin/getMessageTypes');
            console.log(data);
            dispatch( onLoadCategoriesUser( data ) ); 

        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingChannels = async() => {
        try {
            
            const { data } = await nsApi.get('/admin/getNotificationTypes');
            dispatch( onLoadChannelsUser( data ) );

        } catch (error) {
            console.log(error);
        }
    }

    return {
    //*Properties
        isSaving,
        categories,
        channels,
    //*Methods
        startSavingUser,
        startLoadingCategories,
        startLoadingChannels
    }
}
