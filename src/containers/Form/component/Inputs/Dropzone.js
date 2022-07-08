import React, {useEffect, useState} from "react";
import {ErrorMessage} from "@hookform/error-message";
import Dropzone from 'react-dropzone'
import styled from "styled-components";
import ApiService from "../../../../modules/hrms/Api";
import {toast} from "react-toastify";
import {get} from "lodash";

const Styled = styled.div`
  section {
    text-align: center;
    border: 1px dashed #72c02c;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    & > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const CustomDropzone = ({
                            register,
                            name,
                            label,
                            sort = "text",
                            errors,
                            params,
                            property,
                            defaultValue,
                            setValue,
                            column = [2, 6],
                            hideLabel = false,
                            ...rest
                        }) => {
    const [fileId, setFileId] = useState(null)

    const upload = (files) => {
        const formData = new FormData();
        formData.append('file', files[0]);
        ApiService.fileUpload(formData).then((res) => {
            toast.success('Success')
            setFileId(get(res, 'data.id', null))
        }).catch((error) => {
            toast.error('Error')
        })
    }

    useEffect(() => {
        setValue(name, fileId)
    }, [fileId])
    return (
        <>
            {!hideLabel && <label
                className={`col-${column[0]} col-form-label text-right`}
                htmlFor={name}
            >
                {label ?? name}
            </label>}
            <div className={`col-${column[1]}`}>
                <Styled>

                    <Dropzone onDrop={acceptedFiles => upload(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {fileId ? <p>File selected</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </Styled>

                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({messages = `${label ?? name} is required`}) => {
                        return <small className="form-control-feedback">{messages}</small>;
                    }}
                />
            </div>
        </>
    );
};

export default CustomDropzone;
