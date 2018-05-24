import React from 'react';
import axios from 'axios';

const SUCCESS   = "green";
const ERROR     = "red";
const INFO      = "blue";
const WARNING   = "orange";

export default class extends React.Component {
  constructor(props, context) {
    super(props)
    
    const {balances, address, message} = props;

    this.state = {
      valid: address != undefined,
      balances,
      address,
      message
    }
  }

  public static getInitialProps(context) {
    const {recaptcha, address, balances, error} = context.res;

    let message: any = undefined;
    if (error != undefined) {
      message = {data: error, status: ERROR}
    }

    return {
      recaptcha,
      balances, 
      address,
      message
    }
  }
  
  setMessage = (data, status) => {
    this.setState({message: {data, status}})
  }

  handleSubmit = event => {
    this.setMessage('Transfering assets', INFO);
    
    const captcha = document.getElementById('g-recaptcha-response').value;
    axios.post('/', {
      'g-recaptcha-response': captcha,
      address: this.state.address,
    })
    .then((res) => {
      this.setMessage('Done', SUCCESS);
      this.updateBalance(this.state.address, false);
    })
    .catch((err) => {
      this.setMessage(err.response.data.error, ERROR);
    })

    event.preventDefault();
  };

  updateBalance = (address, update=true) => {
    axios.get(`/balance?address=${address}`)
    .then((res) => {
      this.setState({
        balances: res.data,
        message: update ? undefined : this.state.message,
        valid: true,
      });
    })
    .catch((err) => {
      this.setMessage(err.response.data.error, ERROR);
      this.setState({valid: false, balances: undefined});
    })
  }
  
  onAddressChange = event => {
    const address = event.target.value;

    this.setState({
      address: address,
      message: address == "" ? undefined : this.state.message,
    })

    if (address != "") {
      this.updateBalance(address);
    }
  }
  
  render() {
    const { recaptcha } = this.props;

    const address   = this.state.address  || '';
    const balances  = this.state.balances || {ETH: '', MLN: ''};
    const message   = this.state.message;

    const valid = this.state.valid === true;

    return (
      <div className="ribbon">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
        <div className="container">
          <h2 className="title">Melon Faucet</h2>
          <div className="card" style={{"maxWidth": "600px"}}>
            <div className="card-block">
              <form className="form-register" onSubmit={this.handleSubmit}>
                <input type="text" name="address" value={address} onChange={this.onAddressChange} />
                {message &&
                  <div style={{"backgroundColor": message.status}}>
                    {message.data}
                  </div>
                }
                <div className="row">
                  <div className="col-5 offset-1">
                    <p>Ether</p>
                    <img src="/static/eth.png" />
                    <p><b>Balance</b>: {balances.ETH}</p>
                  </div>
                  <div className="col-5">
                    <p>MLN</p>
                    <img src="/static/mln.png" />
                    <p><b>Balance</b>: {balances.MLN}</p>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: recaptcha }} />
                <button type="submit" disabled={!valid}>Request</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
