import { toast, Bounce, ToastPosition, ToastTransition, Theme } from 'react-toastify';
export default class Alert {

    success = (content: any, position: ToastPosition, transition: ToastTransition, theme: Theme) => {
        return toast.success(content, {
            position: position ? position : 'top-center',
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: theme ? theme : 'colored',
            transition: transition ? transition : Bounce,
        });
    };
    error = (content: any, position: ToastPosition, transition: ToastTransition, theme: Theme) => {
        return toast.error(content, {
            position: position ? position : 'top-center',
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: theme ? theme : 'colored',
            transition: transition ? transition : Bounce,
        });
    };
    warning = (content: any, position: ToastPosition, transition: ToastTransition, theme: Theme) => {
        return toast.warning(content, {
            position: position ? position : 'top-center',
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: theme ? theme : 'colored',
            transition: transition ? transition : Bounce,
        });
    };
    info = (content: any, position: ToastPosition, transition: ToastTransition, theme: Theme) => {
        return toast.info(content, {
            position: position ? position : 'top-center',
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: theme ? theme : 'colored',
            transition: transition ? transition : Bounce,
        });
    };
}

export const alertToast = new Alert();
