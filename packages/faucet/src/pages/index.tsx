import React from 'react';
import axios from 'axios';

export default class extends React.Component {
  public static getInitialProps(context) {
    return {
      recaptcha: context.res.recaptcha,
    };
  }

  handleSubmit = event => {
    const captcha = document.getElementById('g-recaptcha-response').value;
    axios.post('/', {
      'g-recaptcha-response': captcha,
      address: this.address.value,
    });

    event.preventDefault();
  };

  render() {
    const { recaptcha } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="address" ref={(node) => this.address = node} />
        <div dangerouslySetInnerHTML={{ __html: recaptcha }} />
        <button type="submit">Request</button>
      </form>
    );
  }
}
