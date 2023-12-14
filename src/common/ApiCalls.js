import axios, { AxiosInstance } from "axios"
import { APIUrl } from "./helper"

class API {
  instance
  constructor() {
    this.instance = axios.create({
      baseURL: APIUrl.backendUrl,
    })
  }

  APICALL(methods, url, body, header) {
    const headerType =
      header == "header"
        ? {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("authUser")),
          }
        : header == "authHeader" ? {
          "Content-Type": "application/json",} 
          : header == "formdata"
        ? {
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("userToken"),
          }
    const config = {
      headers: headerType,
    }
    
    try {
      let response
      if (methods == "post") {
        response = this.instance.post(
          `${APIUrl.backendUrl}/${url}`,
          body,
          config
      ).then((result) => { return result }).catch((err) => { return err.response })
      } else if (methods == "get") {
        try {
          const response = this.instance.get(
            `${APIUrl.backendUrl}/${url}`,
            config
          )
          return response
        } catch (error) {
          return error
        }
      } else if (methods == "put") {
        response = this.instance
          .put(`${APIUrl.backendUrl}/${url}`, body, config)
          .then(result => {
            return result
          })
          .catch(err => {
            return err.response.data.error
          })
      } else if (methods == "delete") {
        response = this.instance
          .delete(`${APIUrl.backendUrl}/${url}`, "", config)
          .then(result => {
            return result
          })
          .catch(err => {
            return err.response.data.error
          })
      }
      console.log("response: " + (response))
      return response
    } catch (error) {
      // console.log("error: " + (error))
      return error
    }
  }
}
const apiInstance = new API()

export default apiInstance
