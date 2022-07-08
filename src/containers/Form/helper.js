import React from "react"
import Input from "./component/Inputs/Input";
import InputMask from "./component/Inputs/InputMask";
import Textarea from "./component/Inputs/TextArea";
import SelectAsync from "./component/Select/SelectAsync";
import SelectAsyncPagination from "./component/Select/SelectAsyncPagination";
import DatePicker from "./component/Inputs/DatePicker";
import Checkbox from "./component/Inputs/Checkbox";
import {get} from "lodash";
import CkeEditor from "./component/Inputs/CkeEditor";
import Radio from "./component/Inputs/Radio";
import Sign from "./component/Inputs/Sign";
import CustomDatePicker from "./component/Inputs/CustomDatePicker";
import CustomDropzone from "./component/Inputs/Dropzone";
import RangeSlider from "./component/Inputs/RangeSlider";

class helper {
    static choose = (data) => {
        const renderInput = (data) => {
            const attrs = get(data, "attrs");
            const value = {
                name: get(data, "value.name"),
                type: get(data, "value.type"),
                sort: get(data, "value.sort", get(attrs, "sort")),
                url: get(data, "value.url", get(attrs, "url")),
                options: get(data, "value.options", []),
                property: get(data, "value.property", get(attrs, "property")),
                asyncSelectProperty: get(data, "value.asyncSelectProperty", get(attrs, "asyncSelectProperty")),
                params: get(data, "value.params", get(attrs, "params")),
                defaultValue: get(data, "value.defaultValue", ""),
                value: get(data, "value.value", get(attrs, "value")),
                label: get(data, "value.label", get(attrs, "label")),
                attrSearch: get(data, "value.attrSearch", get(attrs, "attrSearch")),
                onChange: get(data, "setValue"),
                mask: get(data, "value.mask"),
                isGrouped: get(data, "value.isGrouped", false),
                column: get(data, "value.column", [2, 6]),
                isMulti: get(data, "value.isMulti", false),
                apiParams: get(data, "value.apiParams"),
                signed: get(data, "value.values", {}),
                getDependentValue: get(data, 'value.getDependentValue', () => {
                }),
                getOptionsLength: get(data, 'value.getOptionsLength', () => {
                }),
                creatable: get(data, 'value.creatable', false),
                create: get(data, 'value.create', () => {
                }),
                hide: get(data, 'value.hide', () => {
                }),
                cancelSign: get(data, 'value.cancelSign', () => {
                }),
                values: get(data, 'value.values', () => {
                }),
                properties: get(data, 'value.properties', {}),
                validations: get(data, 'value.validations', {}),
                dateType:get(data, 'value.dateType', "date")
            };

            switch (get(value, "type")) {
                case "textarea":
                    return <Textarea {...attrs} {...value} />;
                case "input":
                    return <Input {...attrs} {...value} />;
                case "input-mask":
                    return <InputMask {...attrs} {...value} />;
                case "select":
                    return <SelectAsync {...attrs} {...value} />;
                case "select-pagination":
                    return <SelectAsyncPagination {...attrs} {...value} />;
                case "datepicker":
                    return <DatePicker {...attrs} {...value} />;
                case "custom-datepicker":
                    return <CustomDatePicker {...attrs} {...value} />;
                case "checkbox":
                    return <Checkbox {...attrs} {...value} />;
                case "sign":
                    return <Sign  {...attrs} {...value} />;
                case "ckeditor":
                    return <CkeEditor  {...attrs} {...value} />;
                case "radio":
                    return <Radio  {...attrs} {...value} />;
                case "dropzone":
                    return <CustomDropzone  {...attrs} {...value} />;
                case "slider":
                    return <RangeSlider  {...attrs} {...value} />;
                default:
                    return "";
            }
        };

        const customRender = get(data, "value.custom");
        if (customRender) {
            return customRender(data, renderInput(data));
        } else {
            return renderInput(data);
        }
    };

    static renderProperty = (
        data,
        params,
        defaultOption = {id: "", title: "No selected"},
        value = params[0],
        title = params[1],
        options = [defaultOption, ...data]
    ) => {
        return (
            options &&
            options.map((result) => {
                return {
                    value: get(result, value, ""),
                    label: get(result, title, "")
                };
            })
        );
    };
}

export default helper;
