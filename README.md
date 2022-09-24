# GemWallet - XRPL Web3 Authentication

## Introduction

![](Web3AuthGemWalletDemo.gif)

:warning: Don't forget to install [GemWallet](https://gemwallet.app)

This repository is showcasing how to create a web3 login (authentication) on the XRPL (XRP Ledger) thanks to GemWallet.

## How does the web3 authentication works?

Here is an high level flow diagram on how the flow within this repository is developed:

```mermaid
graph TD
    A(Click on login button) --> B{Public key shared by user with GemWallet}
    B --> |No| A
    B --> |Yes| C[Welcome the user]
    C --> D(Click on restricted button)
    D --> E[Fetch nonce made for the user public key]
    E --> F{Sign the nonce with GemWallet}
    F --> |No| C
    F --> |Yes| G{Verify the signature in backend}
    G --> |No| C
    G --> |Yes| H[Authenticated with JWT token]
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app production mode.

### `npm dev`

Run the hot-reload nodemon server to enhance the developer experience while coding within this repository.
