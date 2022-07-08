import React, {useState} from 'react';
import styled from "styled-components";
import {AsyncPaginate} from "react-select-async-paginate";
import {get} from "lodash";
import {hrmsRequest} from "../../services/api";
import {toast} from "react-toastify";

const StyledAsyncSelect = styled.div`
  min-width: 300px;

  .form-control {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
const AsyncSelect = ({
                         additional = {page: 1},
                         disabled = false,
                         onChangeHandler = () => {
                         },
                         attrSearch = "title",
                         pageSize = 75,
                         placeholder = 'Select',
                         params,
                         property,
                         url,
                         defaultValue = null,
                         ...rest
                     }) => {

    const [value, setValue] = useState(defaultValue);


    const loadOptions = async (search, loadedOptions, {page}) => {
        let config_request = {
            params: {
                [attrSearch]: search,
                pageNumber: page - 1,
                pageSize,
                ...params
            }
        }
        try {
            const {data} = await hrmsRequest.get(url, config_request);
            const options = get(data, "content", []).map((item) => {
                return {
                    value: get(item, property[0]),
                    label: `${get(item, property[1])}`
                };
            });
            return {
                options,
                hasMore: !data.last,
                additional: {
                    page: page + 1
                }
            };
        } catch (err) {
            toast.dismiss();
            toast.error(get(err, "message"), {
                position: "top-right",
                autoClose: 2000
            });
        }
    };
    return (
        <StyledAsyncSelect {...rest}>
            <AsyncPaginate
                loadOptions={loadOptions}
                onChange={(value) => {
                    setValue(value);
                    onChangeHandler(value);
                }}
                placeholder={placeholder}
                value={value}
                additional={additional}
                isDisabled={disabled}
                isClearable={true}
                className="form-control form-control-sm rounded-0"
            />
        </StyledAsyncSelect>
    );
};

export default AsyncSelect;
