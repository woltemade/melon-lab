import React from "react";
import { Button, Card } from "semantic-ui-react";

// Explicitely decompose props here.
const TermsAndConditions = ({ sign }) => (
  <div centered>
    <h4>
      Please read carefully and make sure to understand the following before
      pressing the Sign button that will generate a cryptographic signature of
      manifesting yur understanding and agreement to the conditions of use of
      this software.
    </h4>
    <p>
      This T&Cs are deployed on IPFS, and the cryptographic signature of the
      IPFS hash shows that user read, understood and agreed to the above
      conditions of use. Please note that this is a beta version of the Melon
      portal with purpose intended for testing a software only. DO NOT USE REAL
      ETHER OR VALUE TOKEN. All data collected will be deleted from our database
      regularly. The User understands and accepts that in the event of
      announcing any Melon related competitions, the winners and prizes will be
      determined at full discretion by Melonport AG and Melonport AG alone. The
      user understands and accepts that this software is provided “as is” and
      any expressed or implied warranties of merchantability and fitness for a
      particular purpose are disclaimed. In no event shall the regrets or
      contributors be liable of any direct, indirect, incidental, special,
      exemplary, or consequential damages (including, but not limited to,
      procurement of substitute goods or services; loss of use, data, or
      profits; or business interruption). However caused and on any theory of
      liability, whether in contract, strict liability, or tort (including
      negligence or otherwise) arising in any way out of the use of this
      software, even if advised of the possibility of such damage.
    </p>
    <Button basic color="black" style={{ width: "100%" }} onClick={sign}>
      I agree to the above terms and conditions.
    </Button>
  </div>
);

export default TermsAndConditions;
