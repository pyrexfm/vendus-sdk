import ClientApi from "./clients";

export type { Client, ClientStatus, CreateOrUpdateClient } from "./clients";

export type HeadersType = {
  [key: string]: string;
};

export type BodyType = {
  [key: string]: string | number | boolean;
};

export type QueryParametersType = {
  [key: string]: string[] | string | number | boolean;
};

export type RequestParameters = RequestBodyParameters | RequestNoBodyParameters;

export interface RequestBodyParameters {
  method: "POST" | "PUT";
  endpoint: string;
  parameters?: QueryParametersType;
  headers?: HeadersType;
  body?: BodyType;
  contentType: "none" | "json" | "x-www-form-urlencoded";
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
  headers: HeadersType;
  clients: ClientApi;

  constructor({
    apiKey,
    baseUrl = "https://api.tink.com",
  }: {
    clientId: string;
    apiKey: string;
    clientActorId?: string;
    baseUrl?: string;
    baseLinkURL?: string;
  }) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      accept: "application/json",
      "User-Agent": "Vendus-Node-JS",
    };
    this.clients = new ClientApi({ client: this });
  }

  async request({
    endpoint,
    headers,
    parameters,
    body,
    method,
    contentType,
  }: RequestParameters) {
    // Build query string
    const queryParamsString = this.queryParameters(parameters || {});

    // Build fetch options
    const fetchOptions: RequestInit = {
      method: method,
    };

    if (body && contentType !== "none") {
      if (contentType === "json") {
        fetchOptions.body = JSON.stringify(body);
        fetchOptions.headers = {
          ...this.headers,
          ...{ "Content-Type": "application/json" },
          ...headers,
        };
      } else {
        fetchOptions.body = new URLSearchParams(
          Object.entries(body).map(([k, v]) => [k, v.toString()])
        );
        fetchOptions.headers = {
          ...this.headers,
          ...{ "Content-Type": "application/x-www-form-urlencoded" },
          ...headers,
        };
      }
    } else {
      fetchOptions.headers = { ...this.headers, ...headers };
    }

    fetchOptions.cache = "no-store";

    const url = `${this.baseUrl}/${endpoint}`;

    // Make request
    const response: Response = await fetch(
      `${url}?${queryParamsString}`,
      fetchOptions
    );

    if (response.status >= 300) {
      throw {
        name: "Request failed",
        message: `Request failed with status ${response.status}: ${response.statusText}`,
        status: response.status,
        statusText: response.statusText,
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
    return {
      Authorization: `Basic ${this.apiKey}`,
    };
  }
}
