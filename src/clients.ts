import VendusClient from ".";

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

export type CreateOrUpdateClient = Omit<
  Client,
  "id" | "balance" | "price_group"
> & { price_group_id: string };

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
  async getClients(params: {
    q?: string;
    fiscal_id?: string;
    name?: string;
    email?: string;
    external_reference?: string;
    status?: ClientStatus;
    date?: string;
    id?: string;
  }): Promise<Client> {
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
}
