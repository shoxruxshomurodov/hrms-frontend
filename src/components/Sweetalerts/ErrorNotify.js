import React,{useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Toast(message) {
  const notify = () => {
    toast.dismiss();
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
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
