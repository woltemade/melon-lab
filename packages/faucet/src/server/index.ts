import { WSAEDESTADDRREQ } from "constants";

require('dotenv-extended').config();

const compression = require('compression');
const nextApp = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const Recaptcha = require('express-recaptcha').Recaptcha;

const web3 = require('web3');
const path = require('path');

const BigNumber = require('bignumber.js');

const {setup, getBalances, send, MLN} = require('./melon');

const recaptcha = new Recaptcha(
  process.env.RECAPTCHA_SITE_KEY,
  process.env.RECAPTCHA_SECRET_KEY,
);

const dev = process.env.NODE_ENV !== 'production';
const app = nextApp({ dir: 'src', dev });

const DEFAULT_RPC_ENDPOINT = "https://kovan.melonport.com"

const err = (res, msg) => {
  res.status(400).json({'error': msg})
}

const ok = (res, msg) => {
  res.status(200).json({'msg': msg})
}

app.prepare().then(() => {
  const server = express();
  const handle = app.getRequestHandler();

  if (process.env.NODE_ENV === 'production') {
    // Add gzip compression.
    server.use(compression());
  }

  // Amounts to send from env variables
  const eth = web3.utils.toWei(process.env.ETH, "ether");
  const mln = new BigNumber(process.env.MLN);
  
  // static content
  server.use('/static', express.static(path.join(__dirname, 'public')))

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded());

  server.get('/balance', async (req, res) => {
    const address = req.query.address;

    if (!web3.utils.isAddress(address)) {
      err(res, `${address} is not a valid address`)
    } else {
      try {
        const balances = await getBalances(address);
        res.json(balances)
      } catch(err) {
        err(res, `Failed to read balances: ${err}`)
      }
    }
  });
  
  server.get('/', async (req, res) => {
    res.recaptcha = recaptcha.render();

    const address = req.query.address || '';
    if (address != "") {
      if (!web3.utils.isAddress(address)) {
        res.error = `${address} is not a valid address`;
      } else {
        const balances = await getBalances(address);
        
        res.balances = balances;
        res.address  = address;
      }
    }

    return handle(req, res);
  });

  server.post('/', (req, res) => {
    const address = req.body.address || '';
    
    if (!web3.utils.isAddress(address)) {
      err(res, `${address} is not a valid address`)
      return
    }
    
    recaptcha.verify(req, async (error, data) => {
      if (error) {
        err(res, 'Captcha not valid')
      } else {
        try {
          // send 'mln' melon to the token symbol 'MLN'
          await send(address, mln, MLN); 
          // send ether
          await send(address, eth);

          ok(res, 'Done')
        } catch(error) {
          err(res, 'Failed to send the transactions. Please try later.')
        }
      }
    });
  });
  
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  
  try {
    setup(process.env.RPC_ENDPOINT || DEFAULT_RPC_ENDPOINT, process.env.WALLET, process.env.PASSWORD)
    .then(() => {
      server.listen(process.env.PORT);
    })
  } catch(err) {
    console.log(err)
    process.exit(1)
  }
});
