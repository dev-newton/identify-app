import axios from "axios";
const LocalURL = `${process.env.REACT_APP_API_ENDPOINT}`;
/* eslint-disable import/no-anonymous-default-export */

export default {
  url: LocalURL,
  headers(fileupload = false) {
    const token = localStorage.getItem("token");

    let header = {};
    if (fileupload) {
      header["Content-type"] = "multipart/form-data";
    } else {
      header["Content-type"] = "application/json";
      header["Accept"] = "*/*";
      header["Access-Control-Allow-Origin"] = "*";
      header["x-api-key"] = process.env.REACT_APP_API_KEY;
      header["app-id"] = process.env.REACT_APP_APP_ID;
    }
    if (token && token !== undefined) {
      header["Authorization"] = `Bearer ${token}`;
    }
    return header;
  },

  verifyBvnWithFace(data) {
    return axios({
      method: "post",
      url: `${this.url}/api/v2/biometrics/merchant/data/verification/bvn_w_face`,
      headers: this.headers(),
      data,
    });
  },
  livenessCheck(data) {
    return axios({
      method: "post",
      url: `${this.url}/api/v2/biometrics/merchant/face/liveliness_check`,
      headers: this.headers(),
      data,
    });
  },
};
