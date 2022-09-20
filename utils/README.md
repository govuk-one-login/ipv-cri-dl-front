# Digital Identity Credential Issuer

# di-ipv-cri-driving-licence-front

Frontend for Driving Licence Credential Issuer

This is the home for the front end user interface for a credential issuer as a part of the Identity Proofing and Verification (IPV) system within the GDS digital identity platform. Other repositories are used for core services or other credential issuers.

# Installation

Clone this repository and then run

```bash
yarn install
```

## Environment Variables

- `API_BASE_URL`: Externally accessible base url of the webserver. Used to generate the callback url as part of credential issuer oauth flows
- `PORT` - Default port to run webserver on. (Default to `5030`)

## Running Locally
```bash
yarn run dev
```



