import React from 'react';
import { List, Card, Divider, Image } from 'semantic-ui-react';
import MaybeLoading from '../molecules/MaybeLoading';
import MaybeData from '../molecules/MaybeData';

const Factsheet = ({
  aum,
  creationDate,
  managementReward,
  name,
  performanceReward,
  personalStake,
  sharePrice,
  totalSupply,
  rank,
  numberOfFunds,
  tweetHref,
  scrollTo,
  loading,
  dataValid,
  expectedPrize,
  isCompeting,
  quoteAsset,
}) => (
  <Card id="factsheet">
    <Card.Content>
      <Card.Header>
        <MaybeLoading>{name}</MaybeLoading>

        <a
          href={tweetHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ float: 'right' }}
        >
          <img src="/static/twitter.png" alt="Tweet" height="15" />
        </a>
      </Card.Header>
      {loading ? (
        <Image src="/static/melon-spinner.gif" size="tiny" centered />
      ) : (
        <List>
          <List.Item>
            <List.Content>
              Creation date: <MaybeLoading>{creationDate}</MaybeLoading>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content as="a" onClick={() => scrollTo('holdings')}>
              <MaybeData dataAvailable={dataValid}>
                AUM: <MaybeLoading>{aum}</MaybeLoading> {quoteAsset}
              </MaybeData>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content as="a" onClick={() => scrollTo('holdings')}>
              <MaybeData dataAvailable={dataValid}>
                Share price: <MaybeLoading>{sharePrice}</MaybeLoading>{' '}
                {quoteAsset}/Share
              </MaybeData>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content as="a" href="#/ranking">
              Ranking: <MaybeLoading>{rank}</MaybeLoading> out of{' '}
              <MaybeLoading>{numberOfFunds}</MaybeLoading> Melon Funds
            </List.Content>
          </List.Item>
          {isCompeting ? (
            <List.Item>
              <List.Content as="a" href="#/ranking">
                Expected Prize:
                <MaybeLoading> {expectedPrize}</MaybeLoading> MLN
              </List.Content>
            </List.Item>
          ) : (
            ''
          )}

          <List.Item>
            <List.Content>
              Total number of shares: <MaybeLoading>{totalSupply}</MaybeLoading>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              Shares owned by me: <MaybeLoading>{personalStake}</MaybeLoading>
            </List.Content>
          </List.Item>
          <Divider />
          <List.Item>
            <List.Content>
              Management Reward: <MaybeLoading>{managementReward}</MaybeLoading>%
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              Performance Reward:{' '}
              <MaybeLoading>{performanceReward}</MaybeLoading>%
            </List.Content>
          </List.Item>

          <Divider />
          <List.Item>
            <List.Content href="http://melon.email" target="_blank">
              Contact Investors/Managers
            </List.Content>
          </List.Item>
        </List>
      )}
    </Card.Content>
  </Card>
);

export default Factsheet;
