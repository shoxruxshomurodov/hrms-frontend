import React, {useState} from 'react';
import {get} from "lodash";
import {withTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import Actions from "../../../Actions";
import {toast} from "react-toastify";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ContentLoader from "../../../../../components/Loader/ContentLoader";

function FileUploadForm({t, user,getEmployeeFilesList}) {
    const [isFetched, setIsFetched] = useState(false);
    const dispatch = useDispatch();

    function uploadFile(values) {


        if (!get(values, 'fileId')) {
            toast.error('File not selected')
        } else {

            setIsFetched(true);

            const attributes = {
                employeeId: get(user, 'id'),
                ...values
            };

            dispatch({
                type: Actions.UPLOAD_EMPLOYEE_FILE.REQUEST,
                payload: {
                    attributes,
                    cb: {
                        success: (nData, data) => {
                            setIsFetched(false)
                            toast.dismiss();
                            toast.success('Успешно', {
                                position: "top-right",
                                autoClose: 1000,
                            })
                            getEmployeeFilesList({id:get(user, 'id')})
                            setIsFetched(false);
                        },
                        fail: (e) => {
                            setIsFetched(false)
                            toast.dismiss();
                            toast.error("Ошибка", {
                                position: "top-right",
                                autoClose: 1000,
                            })
                        },
                    },
                },
            });
        }

    }


    const values = [
        {
            id: 1,
            label: "File",
            name: "fileId",
            type: "dropzone",
            params: {required: true}
        },
        {
            id: 2,
            label: "Title",
            name: "title",
            type: "input",
            params: {required: true}
        },
        {
            id: 3,
            label: "Description",
            name: "description",
            type: "textarea",
        },

    ];


    return (
        <>
            {isFetched ? <ContentLoader/> :
                <Form
                    formRequest={uploadFile}
                    values={values}
                    buttonText={"Upload"}
                    CustomButton={CustomButton}
                    isFetched={true}
                    params={{required: false}}
                    property={{disabled: false}}
                    column={[2, 6]}
                />
            }
        </>
    );
}

export default withTranslation("HRMS")(FileUploadForm);
