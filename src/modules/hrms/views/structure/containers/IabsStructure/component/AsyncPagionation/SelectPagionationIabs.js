import React, { Component } from "react";
import request from "../../../../../../../services/api";
import { get } from "lodash";
import { AsyncPaginate } from "react-select-async-paginate";

class SelectPagionationIabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ?? null
    };
  }

  loadOptions = async (search, loadedOptions, { page }) => {
    const { attrSearch = "title", url, pageSize = 50, params } = this.props;
    var config_request = {
      params: {
        [attrSearch]: search,
        pageNumber: page - 1,
        pageSize,
        ...params
      }
    };
    try {
      const response = await request.get(url, config_request);
      const options = get(response, "data.content").map((r) => {
        return {
          value: get(r, "id"),
          label: `${get(r, "altAbsCode")} - ${get(r, "title")}`
        };
      });
      return {
        options,
        hasMore: !response.data.last,
        additional: {
          page: page + 1
        }
      };
    } catch (err) {
    }
  };

  setValue = (value) => {
    this.setState({
      ...this.state,
      value
    });
  };

  render() {
    const { value } = this.state;
    const { onChange, additional = { page: 1 } } = this.props;
    return (
      <AsyncPaginate
        loadOptions={this.loadOptions}
        onChange={(value) => {
          this.setValue(value);
          onChange(value);
        }}
        value={value}
        additional={additional}
        className="form-control form-control-sm rounded-0"
      />
    );
  }
}

export default SelectPagionationIabs;
