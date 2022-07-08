import {bpmnRequest, hrmsRequest} from "./index";
import {isEqual} from "lodash";

class Api {
    static getAll = (url, config, baseUrl = 'hrms', method = 'get') => {
        if (isEqual(baseUrl, 'bpmn')) {
            if (isEqual(method, 'post')) {
                return bpmnRequest.post(url, config);
            }
            return bpmnRequest.get(url, config);
        }
        if (isEqual(method, 'post')) {
            return hrmsRequest.post(url, config);
        }
        return hrmsRequest.get(url, config);
    }
    static getOne = (url, config,baseUrl='hrms') => {
        if(isEqual(baseUrl,'bpmn')){
            return bpmnRequest.get(url, config);
        }
        return hrmsRequest.get(url, config);
    }
    static getData = (url, config) => {
        return hrmsRequest.get(url, config);
    }

    static add = (url, attributes) => {
        return hrmsRequest.post(url, attributes);
    }

    static remove = (url, config) => {
        return hrmsRequest.delete(url, config);
    }

    static update = (url, attributes) => {
        return hrmsRequest.put(url, attributes);
    }
}

export default Api;
