import React from "react";
import { List, Input, Button, Card, Grid, Icon } from "semantic-ui-react";

const Setup = props => (
  <div>
    <Grid padded={false}>
      <Grid.Row columns={1} style={{marginBottom: '2em' }}>
        <Grid.Column>
          <h2>Welcome to the future of investment funds</h2>
          <p className="App-intro">
              To get started, head to our{" "}
            <a
              href="http://faucet.melon.network"
              target="_blank"
              rel="noopener noreferrer"
            >
                faucet
              </a>{" "}
              to receive Kovan Ether and Kovan Melon
            </p>
          <p className="App-intro">
              Once you have received k-ETH and k-MLN, go ahead and create your Melon
              fund.
            </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={16}>
        <Grid.Column width={4} />
        <Grid.Column width={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card>
            <Card.Content>
              <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
                <div className="ui text loader">
                  Deploying your fund to the Ethereum blockchain
                </div>
              </div>

              <Card.Header>Setup your fund</Card.Header>
              <br />
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

                <List.Item as="a">
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Header>
                      Performance fee: {props.performanceFee}
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item as="a">
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Header>Management fee: {props.managementFee}</List.Header>
                  </List.Content>
                </List.Item>

                <List.Item
                  as="a"
                  href="https://kovan.etherscan.io/address/0x7f98f4790722a24de32478714f0350a56689825e"
                  target="_blank"
                >
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Header>Exchange: OasisDex implementation</List.Header>
                  </List.Content>
                </List.Item>

                <List.Item
                  as="a"
                  href="https://kovan.etherscan.io/address/0x9ffe1fce6dc97834c5733362d229dfc997299a79"
                  target="_blank"
                >
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Header>DataFeed: Melon Datafeed</List.Header>
                  </List.Content>
                </List.Item>

                <List.Item as="a">
                  <Icon name="right triangle" />
                  <List.Content>
                    <List.Header>
                      Asset Registrar: Melon Asset Universe (18 assets registered)
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item as="a">
                  <Icon name="right triangle" />
                  <List.Content
                    href="https://github.com/melonproject/protocol/blob/0.3.8-alpha.5/contracts/riskmgmt/RMMakeOrders.sol"
                    target="_blank"
                  >
                    <List.Header>
                      Risk Management: Make/Take order permitted
                    </List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="black" onClick={props.onCreate}>
                  Create and deploy my fund!
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={4} />
      </Grid.Row>
    </Grid>

  </div>
);

export default Setup;
