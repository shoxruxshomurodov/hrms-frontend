import React from 'react';
import {get} from "lodash";
import Select from "react-select";
import styled from "styled-components";

const StyledSelect = styled.div``;
const RSelect = ({name='select',onChangeHandle = () =>{},options = [],defaultValue="",...rest}) => {
    return (
        <StyledSelect {...rest}>
            <Select
                name={name}
                onChange={(event) => {
                    onChangeHandle(get(event, "value", ""));
                }}
                isClearable={true}
                clearValue={""}
                options={options}
                className="form-control form-control-sm rounded-0"
                menuPlacement={"bottom"}
                placeholder="Choose..."
                defaultValue={defaultValue}
                isSearchable={false}
            />
        </StyledSelect>
    );
};

export default RSelect;
