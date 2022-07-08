import React from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Toast(message) {
    const notify = () => {
        toast.dismiss();
        toast.success(message, {
            position: "top-right",
            autoClose:1500,
        })
        return true
    }
    return (
        <>
            {notify()}
            <ToastContainer />
        </>
    );
}

export default Toast;
