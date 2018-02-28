import React from "react";
import { Button } from "semantic-ui-react";

const TermsAndConditions = ({ sign, networkId }) => (
  <div>
    {networkId === "1" ? (
      <div>
        <h1>TERMS AND CONDITIONS</h1>
        <p>
          The following terms and conditions have been deployed to IPFS and
          resolve to the following hash:{" "}
          <a
            as="a"
            href="https://ipfs.io/ipfs/QmZpeV44n5KzgXk9rYeHYX7QYovaTHyHgfAQ4PK5AkDr6c"
            target="_blank"
            rel="noopener noreferrer"
          >
            QmZpeV44n5KzgXk9rYeHYX7QYovaTHyHgfAQ4PK5AkDr6c
          </a>
        </p>
        <p>
          <strong>
            THIS SOFTWARE DEPLOYMENT TO THE ETHEREUM MAINNET IS TEMPORARY AND
            INTENDED FOR TESTING PURPOSES ONLY.
          </strong>
        </p>
        <p>
          The User understands and accepts that this Software and its Smart
          Contract System, collectively referred to as Software, are still in
          early development stage, i.e. of experimental nature and provided "as
          is". The deployment of the Software is conducted for testing purposes
          in a live environment only. The Software is neither deployed for nor
          ready for any other use than testing the Software in a live
          environment. Any expressed or implied warranties of merchantability
          and fitness for a particular purpose are disclaimed in full.
        </p>
        <p>
          <strong>ANY USE OF THE SOFTWARE IS AT USERS OWN RISK.</strong>
        </p>
        <p>
          Melonport AG nor its Contributors may be held liable for any direct,
          indirect, incidental, special, exemplary, consequential or other
          damages including, but not limited to, procurement of substitute goods
          or services; loss of use, data, or profits; or business interruption
          related to the use of the Software.
        </p>
        <p>
          User understands there are no rights of recourse or compensation
          whatsoever especially with regards to any complaints made around
          malfunctioning of any part of the Software, theft or in case of lost
          User private key. Further, the use of the Software may require to pay
          gas to the Ethereum network which will need to be borne by User alone.
        </p>
        <p>
          User understands that Melonport AG does not have control on traded
          assets. Melonport never holds custody of these tokens/assets, nor does
          it have the ability to do so.
        </p>
        <p>
          <strong>
            AT THE END OF THE TESTING PERIOD OR AT ANY ARBITRARY POINT IN TIME
            AS DEFINED BY MELONPORT AG, THE SOFTWARE WILL BE CLOSED DOWN WHICH
            WILL RESULT IN THE CLOSING DOWN OF THE SMART CONTRACT SYSTEM. THIS
            IS EXPECTED TO HAPPEN IN A MATTER OF DAYS OR WEEKS FROM DEPLOYMENT
            DATE. AT THIS POINT, THE USERS WON’T BE ABLE TO INTERACT WITH THE
            THE SMART CONTRACT SYSTEM ANYMORE THROUGH EXECUTING MAKE OR TAKE
            ORDERS, OR THROUGH THE INVEST FUNCTIONS.{" "}
          </strong>
        </p>
        <p>
          These terms, shall be governed by, interpreted and construed in
          accordance with the substantive laws of Switzerland. The competent
          courts of Zug, Switzerland, shall have exclusive jurisdiction for all
          disputes arising out of or in connection with this Agreement, subject
          to appeal, if any.
        </p>
        <p>
          <strong>
            BY SIGNING THE HASH OF THIS DOCUMENT THE USER UNDERSTANDS AND
            ACCEPTS ALL THE TERMS AND CONDITIONS AS SET HEREIN.
          </strong>
        </p>
      </div>
    ) : (
      <div>
        <h4>TERMS AND CONDITIONS</h4>
        <p>
          The following terms and conditions have been deployed to IPFS and
          resolve to the following hash:{" "}
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
          It is intended to be used on the Kovan testnet and is by no means
          intended to be used on the main net. Never send assets or tokens of
          real value to a fund contract on the test net; they could be
          impossible to recover.
        </p>
        <p>
          <strong>DO NOT USE REAL ETHER OR VALUE TOKEN.</strong>
        </p>
        <p>
          The User understands and accepts that in the event of announcing any
          Melon related competitions, the winners and prizes will be determined
          at full discretion by Melonport AG and Melonport AG alone.
        </p>
        <p>
          The User understands and accepts that this software is provided “as
          is” and any expressed or implied warranties of merchantability and
          fitness for a particular purpose are disclaimed. In no event shall
          Melonport AG or its Contributors be liable of any direct, indirect,
          incidental, special, exemplary, or consequential damages (including,
          but not limited to, procurement of substitute goods or services; loss
          of use, data, or profits; or business interruption).
        </p>
        <p>
          Neither Melonport AG nor its Contributors are liable for any damages,
          however caused and through any theory of liability, whether in
          contract, strict liability, or tort (including negligence or
          otherwise) arising in any way out of the use of this software, even if
          advised of the possibility of such damage.
        </p>
        <p>
          This Agreement, shall be governed by, interpreted and construed in
          accordance with the substantive laws of Switzerland. The competent
          courts of Zug, Switzerland, shall have exclusive jurisdiction for all
          disputes arising out of or in connection with this Agreement, subject
          to appeal, if any.
        </p>
        <p>
          <strong>
            BY SIGNING THE HASH OF THIS DOCUMENT THE USER UNDERSTANDS AND
            ACCEPTS ALL THE TERMS AND CONDITIONS AS SET HEREIN.
          </strong>
        </p>
      </div>
    )}
    <Button basic color="black" style={{ width: "100%" }} onClick={sign}>
      I understand and agree to sign the above terms and conditions.
    </Button>
  </div>
);

export default TermsAndConditions;
