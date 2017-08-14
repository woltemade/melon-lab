import React from "react";
import {
  Table,
  List,
  Input,
  Button,
  Card,
  Icon,
  Divider,
} from "semantic-ui-react";

const ManagerView = () =>
  (<div className="App">
    <br />
    <div>
      <Card.Group>
        <Card centered>
          <Card.Content>
            <Card.Header>
              <strong>μέλλω Capital </strong>
            </Card.Header>
            <br />
            <Card.Meta>
              - Actively managed portfolio with <strong>crypto only</strong>{" "}
              exposure -
            </Card.Meta>
            <br />
            <List>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Inception date: 07/07/2017</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>AUM: 700 MLN</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Share Price: 2,007</List.Header>
                </List.Content>
              </List.Item>
              <Divider />
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Management fees: 2%</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Performance fees: 5%</List.Header>
                </List.Content>
              </List.Item>
              <Divider />
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Unclaimed rewards: 7 MLN</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Settings</List.Header>
                </List.Content>
              </List.Item>
              <Divider />
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Contact Manager</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
        </Card>
        <Card centered>
          <Card.Content>
            <Card.Header>Fund Activity</Card.Header>
            <br />
            <Card.Meta />
            <br />
            <List>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Recent Investments</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Recent Redeemals</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="black">
                Request full invest/redeem history
              </Button>
            </div>
            <br />
            <br />
            <br />
            <div className="ui two buttons">
              <Button basic color="black">
                Invest
              </Button>
              <Button basic color="black">
                Redeem
              </Button>
            </div>
          </Card.Content>
        </Card>
        <Card centered>
          <Card.Content>
            <Card.Header>Trading activity</Card.Header>
            <br />
            <Card.Meta />
            <br />
            <List>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Open orders</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Executed orders (since last visit)</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="black">
                Request full trading history
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
    <div>
      <br />
      <br />
      <p className="App-intro">Fund Holdings</p>
      <div>
        <Table celled size={"small"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>% of portfolio</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Trade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>MLN</Table.Cell>
              <Table.Cell>207</Table.Cell>
              <Table.Cell>29.57</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>ETH</Table.Cell>
              <Table.Cell>124</Table.Cell>
              <Table.Cell>70.43</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>DOT</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>XBT</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>EUR</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>REP</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>SNT</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>XRP</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>DGD</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>Buy/Sell</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
    <br />
    <br />
    <br />
    <div>
      <Card.Group>
        <Card centered>
          <Card.Content>
            <Card.Header>Place an order</Card.Header>
            <br />
            <br />
            <Card.Meta>
              Buy <strong>XBT</strong>
            </Card.Meta>
            <i className="shuffle icon" />

            <Card.Meta>
              Sell <strong>MLN</strong>
            </Card.Meta>
            <br />
            <List>
              <List.Item as="a">
                <List.Content>
                  <Input placeholder="Amount" />
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <List.Content>
                  <Input placeholder="Price" />
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <List.Content>
                  <Input placeholder="Total" />
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="black">
                Buy
              </Button>
            </div>
          </Card.Content>
        </Card>
        <Card centered>
          <Card.Content>
            <Card.Header>Overview</Card.Header>
            <br />
            <br />
            <Card.Meta>
              <strong>XBT/MLN</strong>
            </Card.Meta>
            <br />
            <List>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Last Price: 0.2290</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Bid : 0.2286</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Ask: 0.2291</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>24h Volume: 1700 XBT</List.Header>
                </List.Content>
              </List.Item>
              <Divider />
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>XBT Balance: 0</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>MLN Balance: 207</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
    <br />
    <br />
    <br />
    <div>
      <p className="App-intro">Orderbook for MLN/ETH</p>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
            <Table.HeaderCell>Vol.</Table.HeaderCell>
            <Table.HeaderCell>Bid</Table.HeaderCell>
            <Table.HeaderCell>Ask</Table.HeaderCell>
            <Table.HeaderCell>Vol.</Table.HeaderCell>
            <Table.HeaderCell>Cum. Vol.</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>4.3744</Table.Cell>
            <Table.Cell>4.3744</Table.Cell>
            <Table.Cell>0.2286</Table.Cell>
            <Table.Cell>0.2291</Table.Cell>
            <Table.Cell>4.3656</Table.Cell>
            <Table.Cell>4.3656</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>8.7881</Table.Cell>
            <Table.Cell>4.4137</Table.Cell>
            <Table.Cell>0.2266</Table.Cell>
            <Table.Cell>0.2311</Table.Cell>
            <Table.Cell>4.3263</Table.Cell>
            <Table.Cell>8.6920</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>13.2194</Table.Cell>
            <Table.Cell>4.4312</Table.Cell>
            <Table.Cell>0.2257</Table.Cell>
            <Table.Cell>0.2321</Table.Cell>
            <Table.Cell>4.3089</Table.Cell>
            <Table.Cell>13.0009</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
    {/* </div> */}
    <br />
    <br />
    <br />
    <div>
      <p className="App-intro">Recent trades for MLN/ETH</p>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Price (MLN/XBT)</Table.HeaderCell>
            <Table.HeaderCell>Amount (XBT)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>10.8.2017 15:42:44</Table.Cell>
            <Table.Cell>buy</Table.Cell>
            <Table.Cell>0.1120</Table.Cell>
            <Table.Cell>0.2291</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>10.8.2017 04:15:44</Table.Cell>
            <Table.Cell>buy</Table.Cell>
            <Table.Cell>0.1090</Table.Cell>
            <Table.Cell>7.7000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>10.8.2017 04:14:43</Table.Cell>
            <Table.Cell>sell</Table.Cell>
            <Table.Cell>0.1070</Table.Cell>
            <Table.Cell>0.7007</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
    <br />
    <br />
    <br />
    <div>
      <Card.Group>
        <Card centered>
          <Card.Content>
            <Card.Header>Settings</Card.Header>
            <br />
            <br />
            <br />
            <List>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Change reference currency: MLN</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Claim rewards: 7 MLN</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Shut down fund</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
        </Card>
        <Card centered>
          <Card.Content>
            <Card.Header>Statistiques</Card.Header>
            <br />
            <List>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>All time reward payout: 127 MLN</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>All time investment: 1270 MLN</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>All time redeemals: 570 MLN</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>All time number of trades: 1277</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>All time high share price: 2,170</List.Header>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>All time net asset value: 980</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
        </Card>
        <Card centered>
          <Card.Content>
            <Card.Header>Invest / Redeem</Card.Header>
            <br />
            <List>
              <List.Item as="a">
                <List.Content>
                  <Input placeholder="Amount" />
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <List.Content>
                  <Input placeholder="Price per share" />
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <List.Content>
                  <Input placeholder="Total" />
                </List.Content>
              </List.Item>
            </List>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="black">
                Invest / Redeem
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
    <br />
    <br />
    <br />
  </div>);

export default ManagerView;
