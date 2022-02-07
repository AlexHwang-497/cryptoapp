import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges || []
  console.log('[exchangesList',exchangesList)

  if (isFetching) return <Loader />;

  return (
    <>
       <Row>
        <Col span={4}>Exchanges</Col>
        <Col span={4}>24h Trade Volume</Col>
        <Col span={4}>Markets</Col>
        <Col span={4}>price to BTC Price</Col>
        <Col span={4}>Current BTC Price($)</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={4}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={4}>${millify(exchange['24hVolume'])}</Col>
                    <Col span={4}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={4}>{exchange.btcPrice}</Col>
                    <Col span={4}>${millify(exchange.price)}</Col>
                    
                  </Row>
                  )}
              >
                {/* {HTMLReactParser(exchange.description || '')} */}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
