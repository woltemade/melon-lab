# Melon GraphQL Server
Deployed at: https://melon-graphql-server.now.sh/graphiql

Based on the great [apollo-starter-kit](https://github.com/apollostack/apollo-starter-kit)


## Getting started

```sh
git clone https://github.com/melonproject/graphql-server/
cd graphql-server
npm install
npm start
```

Then open [http://localhost:3000/graphiql](http://localhost:3000/graphql)

When you paste this on the left side of the page:

```
{
  getVaults(ids: [34, 45 ,1 ,2, 3]) {
    id
    name
    address
    symbol
    nav
  }
}
```

and hit the play button (cmd-return), then you should get this on the right side:

```json
{
  "data": {
    "getVaults": [
      {
        "id": 34,
        "name": "MEME CAPITAL",
        "address": "0x85d1e14a23ec0e2cac5fafeb13b0a69738c7bae6",
        "symbol": "MLN-P",
        "nav": "10000000000000000000"
      },
      // ...
    ]
  }
}
```  
