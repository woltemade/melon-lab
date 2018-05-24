import React from 'react';
import axios from 'axios';

export default class extends React.Component {
  constructor(props, context) {
    super(props)
    
    const {balances, address, error} = props;

    this.state = {
      balances,
      address,
      error
    }
  }

  public static getInitialProps(context) {
    const {recaptcha, address, balances, error} = context.res;

    return {
      recaptcha,
      balances, 
      address,
      error
    }
  }

  handleSubmit = event => {
    const captcha = document.getElementById('g-recaptcha-response').value;
    axios.post('/', {
      'g-recaptcha-response': captcha,
      address: this.state.address,
    });

    event.preventDefault();
  };

  onAddressChange = event => {
    this.setState({
      address: event.target.value
    })

    axios.get(`/balance?address=${event.target.value}`)
    .then((res) => {
      this.setState({
        balances: res.data,
      });
    })
    .catch((err) => {
      this.setState({
        error: err.response.data.error,
      })
    })
  }
  
  render() {
    const { recaptcha } = this.props;

    const address   = this.state.address || '';
    const error     = this.state.error || '';
    const balances  = this.state.balances || {ETH: '', MLN: ''};
    
    return (
      <div className="ribbon">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
        <div className="container">
          <h2 className="title">Melon Faucet</h2>
          <div className="card" style={{"maxWidth": "600px"}}>
            <div className="card-block">
              <div style={{"backgroundColor": "red"}}>
                {error}
              </div>
              <form className="form-register" onSubmit={this.handleSubmit}>
                <input type="text" name="address" value={address} onChange={this.onAddressChange} />
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
                <button type="submit">Request</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
