const compression = require('compression');
const nextApp = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const Recaptcha = require('express-recaptcha').Recaptcha;
const Datastore = require('nedb');
const crypto = require('crypto');
const Api = require('@parity/api');

const {decryptWallet, sendEther, transferTo} = require('@melonproject/melon.js');
const fs = require('fs');

const api = new Api(new Api.Provider.Http('https://kovan.melonport.com', -1));
let wallet = undefined;

const recaptcha = new Recaptcha(
  process.env.RECAPTCHA_SITE_KEY,
  process.env.RECAPTCHA_SECRET_KEY,
);

const dev = process.env.NODE_ENV !== 'production';
const app = nextApp({ dir: 'src', dev });

app.prepare().then(() => {
  const server = express();
  const handle = app.getRequestHandler();

  if (process.env.NODE_ENV === 'production') {
    // Add gzip compression.
    server.use(compression());
  }

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded());

  server.get('/', (req, res) => {
    res.recaptcha = recaptcha.render();
    return handle(req, res);
  });

  server.post('/', (req, res) => {
    recaptcha.verify(req, async (error, data) => {
      if (error) {
        console.log('error');
      } else {
        console.log('success');
        
        // Hardcoded values
        const receipt = await send(req.body.address, 1, 'MLN-T');
        console.log(receipt);

        await send(req.body.address, 10000000)
      }
    });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });
  
  decryptWallet(fs.readFileSync(process.env.WALLET).toString(), process.env.PASSWORD).then((_wallet) => {
    wallet = _wallet;
    server.listen(process.env.PORT);
  })
  .catch(err => {
    console.error(err)
  })
});

// Melon

const ETH = 'ETH';

async function _sendEther(to, amount) {
  return sendEther({api, account: wallet}, {to, amount})
}

async function _sendToken(to, amount, token) {
  return transferTo({api, account: wallet}, {symbol: token, toAddress: to, quantity: amount})
}

async function send(to, amount, token=ETH) {
  return token == ETH ? _sendEther(to, amount) : _sendToken(to, amount, token)
}

// Storage

const CompactionTimeout = 10 * 1000

const sha256 = x => crypto.createHash('sha256').update(x, 'utf8').digest('hex');
const now = () => (new Date()).getTime();

class Storage {
    constructor(filename='./storage.db') {
        this._db = new Datastore({filename: filename, autoload: true})
    }

    async close() {
        this._db.persistence.compactDatafile()

        return new Promise((resolve, reject) => {
            this._db.on('compaction.done', () => {
                this._db.removeAllListeners('compaction.done')
                resolve()
            })

            setTimeout(() => {
                resolve()
            }, CompactionTimeout)
        })
    }

    // check if 'ip' has done more than 'limit' request in 'span' of time
    async isValid(ip, limit=3, span=time.DAY) {
        ip = sha256(ip);

        const total = await this._query(ip, span);
        
        if (total < limit) {
            await this._insert(ip);
            return true
        }

        return false
    }

    async _insert(ip) {
        const timestamp = now();

        return new Promise((resolve, reject) => {
            this._db.insert({ip, timestamp}, (err, obj) => {
                if (err) reject();
                resolve();
            })
        })
    }

    // return how many request has 'ip' done in 'span' of time
    async _query(ip, span) {
        const timestamp = now();

        const query = {
            $and: [
                {ip: ip},   // Ip is the same
                {timestamp: {$gt: timestamp - span}}
            ]
        }

        return new Promise((resolve, reject) => {
            this._db.find(query, (err, docs) => {
                if (err) reject();
                resolve(docs.length)
            })
        })
    }
}
