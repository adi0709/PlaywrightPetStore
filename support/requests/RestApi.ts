const headers = {
  Accept: "application/json",
  Authorization: "special-key",
};
export class RestApi {
  static post(
    request: any,
    endpointUrl: string,
    data: Record<string, any>,
    parameters?: Record<string, any>
  ): Promise<any> {
    return request.post(endpointUrl, {
      data: data,
      headers: headers,
      params: parameters,
    });
  }

  static postWithFile(
    request: any,
    endpointUrl: string,
    multipart?: Record<string, any>
  ): Promise<any> {
    return request.post(endpointUrl, {
      headers: headers,
      multipart: multipart,
    });
  }

  static get(
    request: any,
    endpointUrl: string,
    parameters?: Record<string, any>
  ): Promise<any> {
    return request.get(endpointUrl, {
      headers: headers,
      params: parameters,
    });
  }

  static delete(
    request: any,
    endpointUrl: string,
    parameters?: Record<string, any>
  ): Promise<any> {
    return request.post(endpointUrl, {
      headers: headers,
      params: parameters,
    });
  }

  static put(
    request: any,
    endpointUrl: string,
    data: Record<string, any>,
    parameters?: Record<string, any>
  ): Promise<any> {
    return request.post(endpointUrl, {
      data: data,
      headers: headers,
      params: parameters,
    });
  }
}
