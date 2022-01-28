import React, {useEffect,useState} from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import {Card,Row,Col,Input} from 'antd'
import Loader from "./Loader";

import { useGetCryptosQuery } from "../services/cryptoApi";

// *data:cryptosList; what we are doing here is we are renaming data as cryptosList
// *simplified; in this case will come from our props that we get from the homepage for example
    // *<Cryptocurrencies simplified={true}/>
const Cryptocurrencies=({ simplified })=>{
    // *if we are in are simplified view, we put it at 10 cryptos vs 100
    const count = simplified ? 10 : 100;
    
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

    // *cryptosList?.data?.coins; this will give us access to all the coins
    const [cryptos, setCryptos] = useState();
    console.log('[Cryptocurrencies.cryptos',cryptos)


    //*this allows us to filter out cryptos we want to view 
    const [searchTerm,setSearchTerm]=useState('')
    useEffect(()=>{
        setCryptos(cryptosList?.data?.coins)

        const filteredData = cryptosList?.data?.coins.filter((item)=>item.name.toLowerCase().includes(searchTerm))

        setCryptos(filteredData)
    }, [cryptosList,searchTerm])

    
    if(isFetching) return <Loader/>
    
    // * xs; means how wide is it going to be on extra small devices
    // * sm; means 2 per row
    // * src={currency.iconUrl}; currency.iconURL is provided inside of the key/value pair
    // * Row gutter; this will allow the cards to be spaced from each other
    // * {cryptos?.map((currency);  the "?." allows us to deal with undefined/unkowns
    return (
        <>
            {!simplified && (
                <div className='search-crypto'>
                    <Input placeholder='Search Cryptocurrency' onChange={(e)=> setSearchTerm(e.target.value)}/>
                </div>
            )}
            <Row gutter={[32,32]} className='crypto-card-container'>
                {cryptos?.map((currency)=>(
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                        {/* <Link to={`/crypto/${currency.uuid}`}> */}
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className='crypto-image' src={currency.iconUrl}/>}
                            hoverable
                            >
                            <p>Price: {millify(currency.price)}</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default Cryptocurrencies