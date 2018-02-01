import React from "react";
import { Button } from "semantic-ui-react";

const TermsAndConditions = ({ sign }) => (
  <div>
    <h4>TERMS AND CONDITIONS</h4>
    <p>
      The following terms and conditions have been deployed to IPFS and resolve
      to the following hash:{" "}
      <a
        as="a"
        href="https://ipfs.io/ipfs/QmQrY13NWoSwK2Ani5eBwiyo1gsNa4xLQYfS8zBuHro8Lm"
        target="_blank"
        rel="noopener noreferrer"
      >
        QmQrY13NWoSwK2Ani5eBwiyo1gsNa4xLQYfS8zBuHro8Lm
      </a>
    </p>
    <p>
      <strong>THIS SOFTWARE IS INTENDED FOR TESTING PURPOSES ONLY.</strong>
    </p>
    <p>
      It is intended to be used on the Kovan testnet and is by no means intended
      to be used on the main net. Never send assets or tokens of real value to a
      fund contract on the test net; they could be impossible to recover.
    </p>
    <p>
      <strong>DO NOT USE REAL ETHER OR VALUE TOKEN.</strong>
    </p>
    <p>
      The User understands and accepts that in the event of announcing any Melon
      related competitions, the winners and prizes will be determined at full
      discretion by Melonport AG and Melonport AG alone.
    </p>
    <p>
      The User understands and accepts that this software is provided “as is”
      and any expressed or implied warranties of merchantability and fitness for
      a particular purpose are disclaimed. In no event shall Melonport AG or its
      Contributors be liable of any direct, indirect, incidental, special,
      exemplary, or consequential damages (including, but not limited to,
      procurement of substitute goods or services; loss of use, data, or
      profits; or business interruption).
    </p>
    <p>
      Neither Melonport AG nor its Contributors are liable for any damages,
      however caused and through any theory of liability, whether in contract,
      strict liability, or tort (including negligence or otherwise) arising in
      any way out of the use of this software, even if advised of the
      possibility of such damage.
    </p>
    <p>
      This Agreement, shall be governed by, interpreted and construed in
      accordance with the substantive laws of Switzerland. The competent courts
      of Zug, Switzerland, shall have exclusive jurisdiction for all disputes
      arising out of or in connection with this Agreement, subject to appeal, if
      any.
    </p>
    <p>
      <strong>
        BY SIGNING THE HASH OF THIS DOCUMENT THE USER UNDERSTANDS AND ACCEPTS
        ALL THE TERMS AND CONDITIONS AS SET HEREIN.
      </strong>
    </p>
    <Button basic color="black" style={{ width: "100%" }} onClick={sign}>
      I understand and agree to sign the above terms and conditions.
    </Button>
  </div>
);

export default TermsAndConditions;
