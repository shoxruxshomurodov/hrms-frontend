import {isEqual, get, slice,orderBy,hasIn} from "lodash";
import man1 from "../../assets/profile/man1.svg";
import man2 from "../../assets/profile/man2.svg";
import man3 from "../../assets/profile/man3.svg";
import woman1 from "../../assets/profile/woman1.svg";
import woman2 from "../../assets/profile/woman2.svg";
import woman3 from "../../assets/profile/woman3.svg";


class Utils {
    static isEqualsArrsAttr = (arr1, arr2, attrs) => {
        let eqsCount = 0;
        // eslint-disable-next-line array-callback-return
        attrs.map((attr) => {
            if (isEqual(get(arr1, attr), get(arr2, attr))) {
                eqsCount++;
            }
        });
        return eqsCount === attrs.length;
    };

    static capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    static getEmployeeNameAndSurname = (string = "") => {
        return `${get(string.split(" "), `[1][0]`)}.${get(string.split(" "), `[0]`)}`;
    };

    static hasAccess = ({
                            permissions = [],
                            roles = [],
                            can = "",
                            cant = "",
                            exceptCant = ""
                        }) => {
        let getAccessPermission = can.toString() === "*";
        let cantAccessPermission = cant.toString() === "*";
        let exceptCantAccessPermission = exceptCant.toString() === "*";
        const itemsPermission = can.toString().replace(" ", "").trim().split(",");
        const itemsPermissionCant = cant
            .toString()
            .replace(" ", "")
            .trim()
            .split(",");
        const itemsPermissionExceptCant = exceptCant
            .toString()
            .replace(" ", "")
            .trim()
            .split(",");

        if (Array.isArray(itemsPermission)) {
            itemsPermission.map((value) => {
                if (
                    getAccessPermission === false &&
                    permissions.includes(value) === true
                ) {
                    getAccessPermission = true;
                }
            });
        }
        if (Array.isArray(itemsPermissionCant)) {
            itemsPermissionCant.map((value) => {
                if (
                    cantAccessPermission === false &&
                    permissions.includes(value) === true
                ) {
                    cantAccessPermission = true;
                }
            });
        }
        if (Array.isArray(itemsPermissionExceptCant)) {
            itemsPermissionExceptCant.map((value) => {
                if (
                    exceptCantAccessPermission === false &&
                    permissions.includes(value) === true
                ) {
                    exceptCantAccessPermission = true;
                }
            });
        }

        let getAccessRoles = can.toString() === "*";
        let cantAccessRoles = cant.toString() === "*";
        let exceptCantAccessRoles = exceptCant.toString() === "*";
        const itemsRole = can.toString().replace(" ", "").trim().split(",");
        const itemsRoleCant = cant.toString().replace(" ", "").trim().split(",");
        const itemsRoleExceptCant = exceptCant
            .toString()
            .replace(" ", "")
            .trim()
            .split(",");

        if (Array.isArray(itemsRole)) {
            itemsRole.map((value) => {
                if (getAccessRoles === false && roles.includes(value) === true) {
                    getAccessRoles = true;
                }
            });
        }
        if (Array.isArray(itemsRoleCant)) {
            itemsRoleCant.map((value) => {
                if (cantAccessRoles === false && roles.includes(value) === true) {
                    cantAccessRoles = true;
                }
            });
        }
        if (Array.isArray(itemsRoleExceptCant)) {
            itemsRoleExceptCant.map((value) => {
                if (exceptCantAccessRoles === false && roles.includes(value) === true) {
                    exceptCantAccessRoles = true;
                }
            });
        }

        const cantExceptAccessData =
            !(cantAccessPermission || cantAccessRoles) ||
            exceptCantAccessRoles ||
            exceptCantAccessPermission;
        const canAccessData = getAccessPermission || getAccessRoles;
        return cantExceptAccessData && canAccessData;
    };

    static userCanStyle = (userCan, can, cant = "", exceptCant = "") => {
        return {display: !userCan(can, cant, exceptCant) ? "none" : ""};
    };

    static userCanView = (roles, role) => {

    }

    static takeAvatar = (avatarType) => {
        switch (avatarType) {
            case "man1":
                return man1;
            case "man2":
                return man2;
            case "man3":
                return man3;
            case "woman1":
                return woman1;
            case "woman2":
                return woman2;
            case "woman3":
                return woman3;
        }
    };

    //FORM FIELDS BPMN

    static toFormsFieldsToFormInputsArray = (formsFieldsDTO) => {
        if (formsFieldsDTO == null) {
            return [];
        }

        let arr = [];

        formsFieldsDTO.map((formWithFields) => {
            let form = get(formWithFields, "form", {});
            arr.push({
                form,
                fields: Utils.toFormFieldsToFormInputsArray(formWithFields)
            });
        });

        return arr;

    }

    static toFormFieldsToFormInputsArray = (formFieldsDTO) => {
        if (formFieldsDTO == null) {
            return [];
        }
        let fields = get(formFieldsDTO, "fields", []);
        let values = get(formFieldsDTO, "values", {});
        if (fields == null) {
            return null;
        }

        let arr = [];
        fields = fields.map(field => hasIn(field,'properties.sort') ? ({...field,properties:{...get(field,'properties',{}),sort:parseInt(get(field,'properties.sort'))}}) : ({...field,properties:{...get(field,'properties',{}),sort:20}}))
        fields = orderBy(fields,['properties.sort'],['asc'])
        console.log('fields',fields)

        fields.map((field) => {
            arr.push({
                id: get(field, "name"),
                name: get(field, "name"),
                label: get(field, "label"),
                code: get(field, "code"),
                defaultValue: get(values, get(field, "defaultValue"),null),
                properties: get(field, "properties", {}),
                url:get(field, "properties.url"),
                asyncSelectProperty: [get(field, "properties.id"), get(field, "properties.search_param")],
                validations: get(field, "validations", {}),
                options: get(field, 'values', []).map(({code, name}) => ({value: code, label: name})),
                params:{required:false},
                type: Utils.getTypeFromFormFieldInput(get(field, "fieldType", "STRING"), get(field, "type", ""), get(field, "properties", {})),
                values: values,
            });
        });


        return arr;

    }

    static getTypeFromFormFieldInput(type, custom, properties) {
        if (isEqual(type, "STRING")) {
            return "input";
        }
        if (isEqual(type, "LONG")) {
            if (isEqual(get(properties,'type'), 'slider')) {
                return 'slider';
            }
            return "input";
        }
        if (isEqual(type, "CUSTOM_TYPE")) {
            if (custom) {
                if (isEqual(custom, 'text')) {
                    if (isEqual(get(properties, 'editor'), 'ckeditor')) {
                        return "ckeditor";
                    }
                    return "textarea";
                }
                if (isEqual(custom, 'sign')) {
                    return 'sign';
                }

                if (isEqual(get(properties, 'type'), 'async_select')) {
                    return "select-pagination";
                }
                return "textarea";
            }
            return "input";
        }
        if (isEqual(type, "ENUM")) {
            return "select";
        }
        if (isEqual(type, "DATE")) {
            return "custom-datepicker";
        }
        if (isEqual(type, "BOOL")) {
            return "radio";
        }

        return "input";
    }

    static getFormattedPhoneNumber(phone) {
        if (phone) {
            return `+99 8${phone.substring(0, 2)} ${phone.substring(2)}`;
        }
        return "+99 8-- -------";
    }

    static base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    static saveByteArray(reportName, byte) {
        var blob = new Blob([byte], {type: "application/pdf"});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    };
}

export default Utils;
