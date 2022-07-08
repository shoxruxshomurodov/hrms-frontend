import React, { Component } from "react";
import { hrmsRequest } from "../../services/api";
import { get } from "lodash";
import { AsyncPaginate } from "react-select-async-paginate";
import { toast, ToastContainer } from "react-toastify";

class SelectAsyncPaginate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ?? null
    };
  }

  loadOptions = async (search, loadedOptions, { page }) => {
    let {
      attrSearch = "title",
      url,
      pageSize = 75,
      params,
      property
    } = this.props;
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
          value: get(r, property[0]),
          label: `${get(r, property[2])} - ${get(r, property[1])}`
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
      toast.dismiss();
      toast.error(get(err, "message"), {
        position: "top-right",
        autoClose: 2000
      });
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
    const { onChange, additional = { page: 1 }, name, property } = this.props;
    return (
      <>
        <AsyncPaginate
          loadOptions={this.loadOptions}
          onChange={(value) => {
            this.setValue(value);
            onChange(name, get(value, "value"));
          }}
          value={value}
          additional={additional}
          isDisabled={get(property, "disabled")}
          className="form-control form-control-sm rounded-0"
        />
        <ToastContainer />
      </>
    );
  }
}

export default SelectAsyncPaginate;
