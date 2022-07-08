import React, {useEffect, useState} from "react";
import {ErrorMessage} from "@hookform/error-message";
import {EditorState, ContentState, convertFromHTML} from 'draft-js';
import {Editor} from "react-draft-wysiwyg";
import {convertToHTML} from 'draft-convert';
import styled from "styled-components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const StyledEditor = styled.div`
  .editorClassName {
    border: 1px solid #ccc;
    padding-left: 15px;
    padding-right: 15px;
    min-height: 25vh;
  }
`;
const CkeEditor = ({
                       register,
                       name,
                       params,
                       label,
                       errors,
                       property,
                       defaultValue = null,
                       getValues,
                       setValue,
                       watch,
                       column = [2, 6],
                       validations = {},
                       ...rest
                   }) => {
    console.log('validations',validations)

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (val) => {
        setEditorState(val)
    }
    useEffect(() => {
        setValue(name, convertToHTML(editorState.getCurrentContent()));
    }, [editorState])

    useEffect(() => {
        if (defaultValue) {
            setEditorState(EditorState.createWithContent(
                ContentState.createFromBlockArray(convertFromHTML(defaultValue))
            ))
        }

    }, [defaultValue])

    return (
        <>
            <label
                className={`col-${column[0]} col-form-label text-right`}
                htmlFor={name}
            >
                {label ?? name}
            </label>
            <div className={`col-${column[1]}`}>
                <StyledEditor>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        className="form-control rounded-0 form-control-md"
                        onEditorStateChange={onEditorStateChange}
                    />
                </StyledEditor>
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

export default CkeEditor;
