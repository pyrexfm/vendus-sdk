# Vendus API Unofficial JavaScript API

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/pyrexfm)

The documentation for the Vendus API is available here [here](https://www.vendus.pt/ws/). Not all endpoints are available but feel free to contribute!

## Installation

First, install the module with npm (or yarn):

```shell
npm install vendus-sdk
```

Then, depending upon your usage context, add a reference to it:

### CommonJS / Node

```typescript
const vendus = require("vendus-sdk");
```

### ESM / TypeScript

```typescript
import VendusClient from "vendus-sdk";
```

## Usage

To use this client you must have an API Key from Vendus.

```typescript
import VendusClient from "vendus-sdk";

const vendus = new VendusClient({
  apiKey: process.env.VENDUS_API_KEY,
});

const client = await vendus.clients.createClient({
  externalUserId: "test-user",
  market: "GB",
  locale: "en_US",
});
```

### Error Handling

If a response is returned with a code >= 300, instead of returning the response,
the response will be thrown as an error to be caught. The error has the following fields:

```typescript
{
  name: "Request failed",
  message: "Request failed with status 404: Not found",
  status: 404,
  statusText: "Not found",
  request: {
    url: `https://www.vendus.pt/ws/v1.1/notFound`,
    options: fetchOptions,
  }
  response: "Fetch response object"
}
```
