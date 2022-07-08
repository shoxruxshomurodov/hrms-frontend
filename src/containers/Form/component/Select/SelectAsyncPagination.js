import React, {Component} from "react";
import {hrmsRequest} from "../../../../services/api";
import {entries, get, groupBy, head, isEmpty, isEqual, last} from "lodash";
import Creatable from "react-select/creatable";
import {AsyncPaginate, reduceGroupedOptions, withAsyncPaginate} from "react-select-async-paginate";
import {toast, ToastContainer} from "react-toastify";
import {ErrorMessage} from "@hookform/error-message";
import {Controller} from "react-hook-form";

const CreatableAsyncPaginate = withAsyncPaginate(Creatable);

class SelectPaginate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value ?? null,
        };
    }


    loadOptions = async (search, loadedOptions, {page}) => {
        const {
            attrSearch = "title",
            url,
            pageSize = 75,
            params,
            apiParams,
            asyncSelectProperty: property,
            isGrouped = false,
            getOptionsLength = () => {},
        } = this.props;
        let config_request = {
            params: {
                [attrSearch]: search,
                pageNumber: page - 1,
                pageSize,
                ...apiParams,
                ...params

            }
        };
        try {
            const response = await hrmsRequest.get(url, config_request);
            let options = [];
            if (isGrouped) {
                options = entries(groupBy(get(response, "data.content").map((r) => {
                    return {
                        value: get(r, property[0]),
                        label: `${get(r, property[2])} - ${get(r, property[1])}`,
                        type: get(r, property[3])
                    };
                }), 'type')).map((entry) => ({label: head(entry), options: last(entry)}));
            } else {
                options = get(response, "data.content").map((r) => {
                    return {
                        value: get(r, property[0]),
                        label: `${get(r, property[2]) ? get(r, property[2]) : get(r, property[0])} - ${get(r, property[1])}`
                    };
                });
            }
            getOptionsLength(options.length);
            return {
                options,
                hasMore: !response.data.last,
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {value} = this.state;
        const {value: prevValue} = prevState;
        const {isMulti, setValue, name} = this.props;
        if (isMulti && !isEqual(value, prevValue) && value) {
            setValue(name, value)
        }

    }


    setValue = (value) => {
        this.setState({
            ...this.state,
            value
        });
    };


    render() {
        const {value} = this.state;


        const {
            onChange = (value) => console.log('value', value),
            onchange = () => {
            },
            getDependentValue = () => {
            },
            getOptionsLength = () => {
            },
            additional = {page: 1},
            name,
            column = [2, 6],
            label,
            property,
            errors,
            register,
            setValue,
            params,
            control,
            hideLabel = false,
            isMulti = false,
            creatable = false,
            create = () => {
            },
            properties,
        } = this.props;

        console.log('properties',properties)

        return (
            <>
                {creatable ? <>
                    {!hideLabel && <label
                        className={`col-${column[0]} col-form-label text-right`}
                        htmlFor={name}
                    >
                        {label ?? name}
                    </label>}
                    <div className={`col-${column[1]}`}>
                        <Controller
                            name={name}
                            control={control}
                            rules={{required: value ? false : true}}
                            defaultValue={get(value, "value")}
                            render={({field}) => (
                                <CreatableAsyncPaginate
                                    name={name}
                                    {...field}
                                    {...register(name, value ? !params : params)}
                                    SelectComponent={Creatable}
                                    onCreateOption={(val) => create(val)}
                                    loadOptions={this.loadOptions}
                                    onChange={(value) => {
                                        onChange(name, get(value, "value"));
                                        onchange(name, value);
                                        getDependentValue(get(value, "value"));
                                        this.setValue(value);
                                    }}
                                    value={value}
                                    additional={additional}
                                    isDisabled={get(property, "disabled")}
                                    className="form-control form-control-sm rounded-0"
                                    reduceOptions={reduceGroupedOptions}
                                    isMulti={isMulti}
                                />
                            )}
                        />


                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({messages = `${label ?? name} is required`}) => {
                                return <small className="form-control-feedback">{!value && messages}</small>;
                            }}
                        />
                    </div>
                    <ToastContainer/>
                </> : <>
                    {!hideLabel && <label
                        className={`col-${column[0]} col-form-label text-right`}
                        htmlFor={name}
                    >
                        {label ?? name}
                    </label>}
                    <div className={`col-${column[1]}`}>
                        <Controller
                            name={name}
                            control={control}
                            rules={{required: value ? false : true}}
                            defaultValue={get(value, "value")}
                            render={({field}) => (
                                <AsyncPaginate
                                    name={name}
                                    key={JSON.stringify(new Date().getTime())}
                                    {...field}
                                    {...register(name, value ? !params : params)}
                                    loadOptions={this.loadOptions}
                                    onChange={(value) => {
                                        onChange(name, get(value, "value"));
                                        onchange(name, value);
                                        getDependentValue(get(value, "value"));
                                        this.setValue(value);
                                    }}
                                    value={value}
                                    additional={additional}
                                    isDisabled={get(property, "disabled")}
                                    className="form-control form-control-sm rounded-0"
                                    reduceOptions={reduceGroupedOptions}
                                    isMulti={isMulti}
                                />
                            )}
                        />


                        <ErrorMessage
                            errors={errors}
                            name={name}
                            render={({messages = `${label ?? name} is required`}) => {
                                return <small className="form-control-feedback">{!value && messages}</small>;
                            }}
                        />
                    </div>
                    <ToastContainer/>
                </>}

            </>
        );
    }
}

export default SelectPaginate;
