import React from "react";
import { Button, Card } from "semantic-ui-react";

// Explicitely decompose props here.
const TermsAndConditions = ({ sign }) => (
  <div centered>
    <h4>
      Please read carefully and make sure to understand the following before
      pressing the below button that will generate a cryptographic signature of
      manifesting yur understanding and agreement to the conditions of use of
      this software.
    </h4>
    <p>
      This T&Cs are{" "}
      <strong>
        <a
          as="a"
          href="https://ipfs.io/ipfs/QmagYH6pLdZcNcrRfvLEdyVuXLEgGUJk8GCXgNLCtnjKPx"
          target="_blank"
        >
          deployed on IPFS
        </a>
      </strong>, and the cryptographic signature of the IPFS hash shows that
      user read, understood and agreed to the above conditions of use.
    </p>

    <p>
      Please note that this is a beta version of the Melon portal with purpose
      intended for testing a software only.
    </p>

    <p>
      This software is intended for testing purposes only. It is intended to be
      used on the Kovan testnet and is by no mean intended to be used on the
      main net. Never send real value asset to a fund contract on the test net;
      they would be impossible to recover.
    </p>

    <h4>DO NOT USE REAL ETHER OR VALUE TOKEN.</h4>

    <p>
      The User understands and accepts that in the event of announcing any Melon
      related competitions, the winners and prizes will be determined at full
      discretion by Melonport AG and Melonport AG alone.
    </p>

    <p>
      The user understands and accepts that this software is provided “as is”
      and any expressed or implied warranties of merchantability and fitness for
      a particular purpose are disclaimed. In no event shall the regrets or
      contributors be liable of any direct, indirect, incidental, special,
      exemplary, or consequential damages (including, but not limited to,
      procurement of substitute goods or services; loss of use, data, or
      profits; or business interruption).
    </p>
    <p>
      However caused and on any theory of liability, whether in contract, strict
      liability, or tort (including negligence or otherwise) arising in any way
      out of the use of this software, even if advised of the possibility of
      such damage.
    </p>
    <Button basic color="black" style={{ width: "100%" }} onClick={sign}>
      I agree to the above terms and conditions.
    </Button>
  </div>
);

export default TermsAndConditions;
