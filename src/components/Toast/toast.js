import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successToast = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER
    });
};

export const dangerToast = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    });
};

export const defaultToast = (component) => {
    toast(component, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        hideProgressBar: false
    });
};

export const infoToast = (message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_CENTER
    });
};
