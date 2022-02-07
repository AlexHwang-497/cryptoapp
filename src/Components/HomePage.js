import React from "react";
// *millify converst long numbers into strings
import millify from "millify";
import { Typography,Row,Col,Statistic } from "antd";
import {Link} from 'react-router-dom'
import Loader from "./Loader";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "../Components/Cryptocurrencies";
import News from "../Components/News";

// *by us destructing title from typography, we don't need to write Typography.Title.  we can jsut write <Title></Title>
// *Col span ={12}; this means it is going to take 12 spaces.  looks like it moves right and left
const {Title} = Typography


const HomePage=()=>{
    // *data and isFeching is provided by REDUX
    // * we have created a hook to manage the API request
    const { data, isFetching } = useGetCryptosQuery(10);
    console.log('[HomePage.data',data)
    // ! what is the point of the using the "?."" in this case?
    // *we will use this to represent our stats
    const globalStats = data?.data?.stats
    console.log('[HomePage.globalStats',data)
    // if(isFetching) return <Loader/>


    // * for <Cryptocurrencies simplified/> and <News simplified/>; 
        // *the simplified is utilied for when we want to show only for example the top 10 crypto currencies
    return (
        <>
            <Title level={1} className='heading'>Global CryptCurrency Stats</Title>
            {globalStats && <Row>
                
                <Col span ={12}><Statistic title='Total CryptoCurrencies' value ={globalStats.total} /></Col>
                <Col span ={12}><Statistic title='Total Exchanges' value ={millify(globalStats.totalExchanges)} /></Col>
                <Col span ={12}><Statistic title='Total Market Cap:' value ={millify(globalStats.totalMarketCap)} /></Col>
                <Col span ={12}><Statistic title='Total 24hr Volume' value ={millify(globalStats.total24hVolume)} /></Col>
                <Col span ={12}><Statistic title='Total Markets' value ={millify(globalStats.totalMarkets)} /></Col>
            </Row>}
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Crypto Currencies in the world</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified={true}/>

            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest News</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
            </div>
            <News simplified/>

        </>
    )
}
export default HomePage