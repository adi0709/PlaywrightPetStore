import { request, APIResponse } from "@playwright/test";
import { MultipartType } from "../api/PetApiTypes";
export class RestApi {
  static async get(url: string, parameters?: Record<string, any>) {
    const requestContext = await request.newContext();
    const response = await requestContext.get(url, {
      headers: {
        Accept: "application/json",
      },
      params: parameters,
    });
    return response;
  }

  static async post(url: string, body?: object, params?: Record<string, any>) {
    const requestContext = await request.newContext();
    const response = await requestContext.post(url, {
      headers: {
        Accept: "application/json",
      },
      params: params,
      data: body,
    });
    return response;
  }

  static async postWithFile(
    url: string,
    multipart?: MultipartType,
    params?: Record<string, any>
  ) {
    const requestContext = await request.newContext();
    const response = await requestContext.post(url, {
      headers: {
        Accept: "application/json",
      },
      params: params,
      multipart: multipart,
    });
    return response;
  }

  static async delete(url: string, parameters?: Record<string, any>) {
    const reqeuestContext = await request.newContext();
    const response = reqeuestContext.delete(url, {
      headers: {
        accept: "application/json",
      },
      params: parameters,
    });
    return response;
  }

  static async put(
    url: string,
    data?: object,
    parameters?: Record<string, any>
  ) {
    const requestContext = await request.newContext();
    const response = await requestContext.put(url, {
      headers: {
        accept: "application/json",
      },
      data: data,
      params: parameters,
    });
    return response;
  }
}
