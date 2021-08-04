import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

function App() {

  // create the state: const array[ value, func which will update this value]
  const [coins, setCoins] = useState ([])   //passed as an array [] in usestate( )
  const [search, setSearch]  = useState('')
  

  useEffect(() => {

    
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(response => {   // <-  using promises

      // using state
      setCoins(response.data);
      //console.log(response.data);   showing data infinitely for 100 coins
    })
    .catch(error => console.log(error));

  },[]);

  const handleChange = e =>{
    setSearch(e.target.value)   // whatever you type in and assign it to Onchange, it SEARCHES in real time
  }

  const filteredCoins = coins.filter(coin => 
      coin.name.toLowerCase().includes(search.toLowerCase())
    )//   making everything to lowercase so that it matches it, doesn't matter if we mis-spell it         
    //  whatever you type in and assign it to Onchange, it SEARCHES in real time


  return (
    <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input type="text" placeholder= "search" className="coin-input" onChange={handleChange} />
          </form>
        </div>
        {/* map through the coins and display different values that we showcase */}

        {filteredCoins.map(coin => {
          
            //return coin component
            return  <Coin 
              key= {coin.id} 
              name={coin.name} 
              image={coin.image}
              symbol = {coin.symbol}
              volume = { coin.total_volume}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              marketcap={coin.market_cap}
              />;
        })}
    </div>
  );
}

export default App;
