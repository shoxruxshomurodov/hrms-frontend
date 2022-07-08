import {hrmsRequest} from "../../api";

class ApiService {
  static checkAuth = (token = null) => {
    if (token) {
      return hrmsRequest.get("oauth/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          include: "profile.structureOrgRoot,permissionsNames,rolesNames",
        },
      });
    }

    return hrmsRequest.get("oauth/users/me", {
      params: {
        include: "profile.structureOrgRoot,permissionsNames,rolesNames",
      },
    });
  };
  static logout = (token = null) => {
    if (token) {
      return hrmsRequest.post("oauth/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return hrmsRequest.get("oauth/users/logout");
  };
}

export default ApiService;
