import React, { Component } from "react";
import {hrmsRequest} from "../../../../../../../../services/api";
import {get, isEmpty} from "lodash";
import { AsyncPaginate } from "react-select-async-paginate";

class SelectPaginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ?? null
    };
  }

  loadOptions = async (search, loadedOptions, { page }) => {
    const { attrSearch = "title", url, pageSize = 75, params ,property=["code","title"]} = this.props;
    var config_request = {
      params: {
        [attrSearch]: search,
        pageNumber: page - 1,
        pageSize,
        ...params
      }
    };
    try {
      const response = await hrmsRequest.get(url, config_request);
      const options = get(response, "data.content").map((r) => {
        return {
          value: isEmpty(get(r,property[0])) ?get(r, "id",""):get(r, property[0],""),
          label: `${get(r, property[2],"")} - ${get(r, property[1])}`
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
    const { onChange, additional = { page: 1 },name,defaultValue } = this.props;
    return (
      <AsyncPaginate
        style={{width:15}}
        loadOptions={this.loadOptions}
        onChange={(value) => {
          this.setValue(value);
          onChange(value);
        }}
        defaultValue={defaultValue}
        value={value}
        additional={additional}
        className="form-control form-control-sm rounded-0"
        name={name}
      />
    );
  }
}

export default SelectPaginate;
