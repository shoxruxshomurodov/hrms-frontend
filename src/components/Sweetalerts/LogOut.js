import React from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
const LogOut = (props) => {
    const {notLogOut,logoutAuth} = props;
    Swal.fire({
        title: 'Чиқишга ишончингиз комилми?',
        icon: 'warning',
        backdrop: 'rgba(0,0,0,0.9)',
        background: 'none',
        showCancelButton: true,
        confirmButtonColor: '#72c02c',
        confirmButtonText: 'Ҳа албатта',
        cancelButtonText: 'Ортга қайтиш',
        customClass: {
            title: 'title-color',
            content: 'text-color',
            icon: 'icon-color',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            logoutAuth();
        }
        notLogOut();
    });
    return <div></div>;
};

export default withRouter(LogOut);
