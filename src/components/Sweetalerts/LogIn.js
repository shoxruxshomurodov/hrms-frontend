import React,{useEffect} from 'react';
import Swal from 'sweetalert2';
import {connect} from "react-redux";
import Actions from "../../modules/auth/Actions";


const Notify = ({notifyTriggerRequest,position='center',icon='success',title='Успешно загружено',...rest}) => {
    useEffect(()=>{
        return () => {
            notifyTriggerRequest();
        }
    },[])
    Swal.fire({
        position: position,
        icon: icon,
        backdrop: 'rgba(0,0,0,0.9)',
        background: 'none',
        title: title,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
            title: 'title-color',
        },
    });
    return <div></div>;
};

const mapStateToProps = (state) => {
    return{}
}
const mapDispatchToProps = (dispatch) => {
    return{
        notifyTriggerRequest:()=>dispatch({type:Actions.SHOW_WELCOME_NOTIFY.TRIGGER})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Notify);
