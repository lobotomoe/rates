## ETH / ERC20 ORN dashboard

Simple backend auth-less service that allow to store multiple addresses and track their balances and exchange rates.

- Add ETH or ERC20 ORN address
- Binance websocket endpount used for getting trade streams and save it into database
- Web3 used for balance checking
- Socket.io used for client-side app communication
- HTTP requests handler / web-framework is Koa

## Instructions
- Copy `.env.example` to `.env` and set required settings
- Run `yarn distribute`

## Docker

- Run `docker run -e "WEB3_HTTP_PROVIDER_API=YOUR_PROVIDER" msurf/ethornbackend`