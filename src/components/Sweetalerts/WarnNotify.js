import React from 'react';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Toast(message) {
    const notify = () => {
        toast.dismiss();
        toast.warn(message, {
            position: "top-right",
            autoClose: 2000,
        })
        return true
    }
    return (
        <div>
            {notify()}
            <ToastContainer />
        </div>
    );
}

export default Toast;
