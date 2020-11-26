import axios from "axios";

const API_URL = process.env.REACT_APP_URL || "http://localhost:8000";

class Api {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    const token = localStorage.getItem("_token");
    if (token) paramsOrData._token = token;

    try {
      return (
        await axios({
          method: verb,
          url: `${API_URL}/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData,
        })
      ).data;
    } catch (err) {
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async login(data) {
    let res = await this.request("users/login/", data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request("users/register", data, "post");
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getMatches(username) {
    let res = await this.request(`matches/${username}`);
    return res.matches;
  }
}

export default Api;
