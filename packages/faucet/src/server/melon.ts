
const fs    = require('fs');
const Api   = require('@parity/api');

const web3 = require('web3');

const {
    decryptWallet,
    sendEther,
    transferTo,
    getBalance,
} = require('@melonproject/melon.js');

const BigNumber = require('bignumber.js');

let api = undefined;
let wallet = undefined;

const balancePrecision = 3;

export const ETH = 'ETH';
export const MLN = 'MLN-T';

// setup

export async function setup(endpoint: String, keystoreFile: String, password: String) {
    const keystore = fs.readFileSync(process.env.WALLET).toString();

    api     = new Api(new Api.Provider.Http(endpoint, -1));
    wallet  = await decryptWallet(keystore, password);
}

// send

async function _sendEther(to, amount) {
    return sendEther({ api, account: wallet }, { to, amount });
}

async function _sendToken(to, amount, token) {
    return transferTo(
        { api, account: wallet },
        { symbol: token, toAddress: to, quantity: amount },
    );
}

export async function send(to, eth, mln) {
    try {
        await _sendEther(to, eth)
        await _sendToken(to, mln, MLN)
    } catch(err) {
        return err
    }
}

// balance

async function _getEther(addr) {
    const amount = await (api as any).eth.getBalance(addr);
    return new BigNumber(web3.utils.fromWei(amount.toString(), 'ether'));
}

async function _getToken(addr, token) {
    return await getBalance({api}, {tokenSymbol: token, ofAddress: addr});
}

export async function getBalances(addr) {
    try {
        let mln = await _getToken(addr, MLN);
        let eth = await _getEther(addr);

        return {
            'MLN': mln.toFixed(balancePrecision).toString(),
            'ETH': eth.toFixed(balancePrecision).toString(),
        }
    } catch(err) {
        return err
    }
}
