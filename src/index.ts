import ClientApi from "./client";
import DocumentApi from "./document";

// Export types
export type * from "./client";
export type * from "./document";

// Export utils
export { number, date } from "./utils";

export type HeadersType = {
  [key: string]: string;
};

export type BodyType = {
  [key: string]: string | number | boolean | object;
};

export type QueryParametersType = {
  [key: string]: string[] | string | number | boolean;
};

export type RequestParameters = RequestBodyParameters | RequestNoBodyParameters;

export interface RequestBodyParameters {
  method: "POST" | "PUT" | "PATCH";
  endpoint: string;
  parameters?: QueryParametersType;
  headers?: HeadersType;
  body?: BodyType;
}

export interface RequestNoBodyParameters {
  method: "GET" | "DELETE";
  endpoint: string;
  parameters?: QueryParametersType;
  headers?: HeadersType;
  body?: undefined;
  contentType?: undefined;
}

export type Boolean = "yes" | "no";

export default class VendusClient {
  apiKey: string;
  baseUrl: string;
  debug: boolean;
  headers: HeadersType;
  client: ClientApi;
  document: DocumentApi;

  constructor({
    apiKey,
    baseUrl = "https://www.vendus.pt/ws/v1.1",
    debug = false,
  }: {
    apiKey: string;
    baseUrl?: string;
    debug?: boolean;
  }) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.debug = debug;
    this.headers = {
      accept: "application/json",
      "User-Agent": "Vendus-Node-JS",
    };
    this.client = new ClientApi({ client: this });
    this.document = new DocumentApi({ client: this });
  }

  async request({
    endpoint,
    headers,
    parameters,
    body,
    method,
  }: RequestParameters) {
    // Build query string
    const queryParamsString = this.queryParameters(parameters || {});

    // Build fetch options
    const fetchOptions: RequestInit = {
      method: method,
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
      fetchOptions.headers = {
        ...this.headers,
        ...{ "Content-Type": "application/json" },
        ...headers,
      };
    } else {
      fetchOptions.headers = { ...this.headers, ...headers };
    }

    fetchOptions.cache = "no-store";

    const url = `${this.baseUrl}/${endpoint}`;

    if (this.debug)
      console.log(
        `Sending request to ${url}`,
        JSON.stringify(
          {
            method: method,
            headers: fetchOptions.headers,
            parameters,
            body: body,
          },
          null,
          4
        )
      );

    // Make request
    const response: Response = await fetch(
      queryParamsString ? `${url}?${queryParamsString}` : url,
      fetchOptions
    );

    if (response.status >= 300) {
      throw {
        name: "Request failed",
        message: `Request failed with status ${response.status}: ${response.statusText}`,
        status: response.status,
        statusText: response.statusText,
        body: await response.json(),
        request: {
          url: `${url}?${queryParamsString}`,
          options: JSON.stringify(fetchOptions, null, 4),
        },
        response: response,
      };
    }

    // Parse response
    const data = await response.json();

    return data;
  }

  queryParameters(parameters: QueryParametersType) {
    return Object.entries(parameters)
      .map(([key, value]) =>
        Array.isArray(value)
          ? value
              .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
              .join("&")
          : `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`
      )
      .join("&");
  }

  authenticationHeader() {
    const token = Buffer.from(this.apiKey + ":").toString("base64");

    return {
      Authorization: `Basic ${token}`,
    };
  }
}
