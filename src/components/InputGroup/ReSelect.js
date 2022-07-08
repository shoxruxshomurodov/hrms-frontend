import React from "react";
import Select from "react-select";
import {withTranslation} from "react-i18next";
import {get, isEqual} from "lodash";

const ReSelect = (props) => {
    let {
        options,
        defaultValue,
        property,
        onChange,
        menuPlacement = "bottom",
    } = props;
  return (
    <Select
      options={options}
      clearValue={""}
      onChange={(event) => {
        onChange(event);
      }}
      className="form-control form-control-sm rounded-0"
      isDisabled={get(property, "disabled")}
      menuPlacement={menuPlacement}
      placeholder="Выбрать..."
      defaultValue={options.filter((option) =>
        isEqual(get(option, "value"), defaultValue)
      )}
      isSearchable={true}
      isClearable={true}
    />
  );
};

export default withTranslation("HRMS")(ReSelect);
