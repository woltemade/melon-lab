
const Datastore = require('nedb');
const crypto = require('crypto');

const SECOND  = 1000;
const HOUR    = 60 * SECOND;
const DAY     = 24 * HOUR;

const CompactionTimeout = 10 * SECOND;

const sha256 = x =>
  crypto
    .createHash('sha256')
    .update(x, 'utf8')
    .digest('hex');
const now = () => new Date().getTime();

class Storage {
  _db: any;

  constructor(filename = './storage.db') {
    this._db = new Datastore({ filename: filename, autoload: true });
  }

  async close() {
    this._db.persistence.compactDatafile();

    return new Promise((resolve, reject) => {
      this._db.on('compaction.done', () => {
        this._db.removeAllListeners('compaction.done');
        resolve();
      });

      setTimeout(() => {
        resolve();
      }, CompactionTimeout);
    });
  }

  // check if 'ip' has done more than 'limit' request in 'span' of time
  async isValid(ip, limit = 3, span = DAY) {
    ip = sha256(ip);

    const total = await this._query(ip, span);

    if (total < limit) {
      await this._insert(ip);
      return true;
    }

    return false;
  }

  async _insert(ip) {
    const timestamp = now();

    return new Promise((resolve, reject) => {
      this._db.insert({ ip, timestamp }, (err, obj) => {
        if (err) reject();
        resolve();
      });
    });
  }

  // return how many request has 'ip' done in 'span' of time
  async _query(ip, span) {
    const timestamp = now();

    const query = {
      $and: [
        { ip: ip }, // Ip is the same
        { timestamp: { $gt: timestamp - span } },
      ],
    };

    return new Promise((resolve, reject) => {
      this._db.find(query, (err, docs) => {
        if (err) reject();
        resolve(docs.length);
      });
    });
  }
}
