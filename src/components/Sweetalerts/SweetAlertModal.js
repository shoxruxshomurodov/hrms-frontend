import React from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
const SweetAlertModal = ({title='Сиз рўйхатдан ўтмагансиз',confirm = () =>{},cancel = () => {},icon='success',confirmButtonText='Ҳа албатта',cancelButtonText = 'Ортга қайтиш',...rest}) => {
    Swal.fire({
        title,
        icon,
        backdrop: 'rgba(0,0,0,0.9)',
        background: 'none',
        showCancelButton: true,
        confirmButtonColor: '#72c02c',
        confirmButtonText,
        cancelButtonText,
        customClass: {
            title: 'title-color',
            content: 'text-color',
            icon: 'icon-color',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            confirm();
        }
        cancel();
    });
    return <div></div>;
};

export default withRouter(SweetAlertModal);
