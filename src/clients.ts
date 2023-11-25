import VendusClient, { type Boolean } from ".";

export type ClientStatus = "active" | "inactive";

export type Client = {
  id: number;
  fiscal_id: string;
  external_reference: string;
  default_pay_due: string;
  name: string;
  address: string;
  city: string;
  postalcode: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  country: string;
  price_group: {
    id: number;
    title: string;
    is_default: string;
  };
  send_email: Boolean;
  irs_retention: Boolean;
  status: ClientStatus;
  notes: string;
  date: string;
  balance: {
    total: string;
    on_time: string;
    overdue: string;
  };
};

export type ClientWithoutBalance = Omit<Client, "balance">;

export type CreateClient = Omit<Client, "id" | "balance" | "price_group"> & {
  price_group_id: string;
};

export type UpdateClient = Partial<CreateClient> & { id: number };

export default class ClientApi {
  client: VendusClient;

  constructor({ client }: { client: VendusClient }) {
    this.client = client;
  }

  /**
   * Returns the current user accounts
   * @param userAccessToken - The user access token. Requires the accounts:read scope.
   * @param pageSize - The number of accounts to return per page
   * @param pageToken - The page token to use for pagination
   * @param types - The types of accounts to return
   * @returns the current accounts
   */
  async getClients(params?: {
    q?: string;
    fiscal_id?: string;
    name?: string;
    email?: string;
    external_reference?: string;
    status?: ClientStatus;
    date?: string;
    id?: string;
  }): Promise<ClientWithoutBalance> {
    const response = await this.client.request({
      endpoint: "clients",
      parameters: {
        ...params,
      },
      headers: this.client.authenticationHeader(),
      method: "GET",
    });

    return response;
  }

  async getClient(id: number): Promise<Client> {
    const response = await this.client.request({
      endpoint: `clients/${id}`,
      headers: this.client.authenticationHeader(),
      method: "GET",
    });

    return response;
  }

  async updateClient(params: UpdateClient): Promise<Client> {
    const { id, ...client } = params;
    const response = await this.client.request({
      endpoint: `clients/${id}`,
      headers: this.client.authenticationHeader(),
      method: "PATCH",
      body: client,
    });

    return response;
  }

  async createClient(params: CreateClient): Promise<Client> {
    const response = await this.client.request({
      endpoint: `clients`,
      headers: this.client.authenticationHeader(),
      method: "POST",
      body: params,
    });

    return response;
  }
}
