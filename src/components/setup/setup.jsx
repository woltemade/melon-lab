import React from "react";
import { List, Input, Button, Card, Grid, Icon } from "semantic-ui-react";

const Setup = props => (
  <div>

    <Card centered>
      <Card.Content>
        <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
          <div className="ui text loader">
                  Deploying your fund to the Ethereum blockchain
                </div>
        </div>
        <p>Welcome to the future of investment funds</p>
        <p className="App-intro">
              To get started, head to our{" "}
          <strong><a
            href="http://faucet.melon.network"
            target="_blank"
            rel="noopener noreferrer"
          >
                faucet
              </a></strong>{" "}
              to receive Kovan Ether and Kovan Melon
            </p>
        <p className="App-intro">
              Once you have received k-ETH and k-MLN, go ahead and create your Melon
              fund.
            </p>
        <br />
        <Card.Header>Setup your fund</Card.Header>

        <List>
          <List.Item as="a">
            <List.Content>
              <Input
                name="name"
                placeholder={props.name}
                onChange={props.onChange}
                style={{width: '100%'}}
              />
            </List.Content>
          </List.Item>
          <br />
          <h4>Melon Default Configuration:</h4>

          <List.Item>

            <List.Content>

                      Performance fee: {props.performanceFee}

            </List.Content>
          </List.Item>
          <List.Item>

            <List.Content>
                    Management fee: {props.managementFee}
            </List.Content>
          </List.Item>

          <List.Item
            as="a"
            href="https://kovan.etherscan.io/address/0x7f98f4790722a24de32478714f0350a56689825e"
            target="_blank"
          >

            <List.Content>
                    Exchange: OasisDex implementation
                  </List.Content>
          </List.Item>

          <List.Item
            as="a"
            href="https://kovan.etherscan.io/address/0x9ffe1fce6dc97834c5733362d229dfc997299a79"
            target="_blank"
          >

            <List.Content>
                    DataFeed: Melon Datafeed
                  </List.Content>
          </List.Item>

          <List.Item>

            <List.Content>

                      Asset Registrar: Melon Asset Universe (18 assets registered)

                  </List.Content>
          </List.Item>
          <List.Item as="a">

            <List.Content
              href="https://github.com/melonproject/protocol/blob/0.3.8-alpha.5/contracts/riskmgmt/RMMakeOrders.sol"
              target="_blank"
            >

                      Risk Management: Make/Take order permitted

                  </List.Content>
          </List.Item>
        </List>

        <Button basic color="black" onClick={props.onCreate} style={{ width: '100%' }}>
                  Create and deploy my fund!
                </Button>

      </Card.Content>
    </Card>

  </div>
);

export default Setup;
