import { useQuery } from 'react-query';
import React, { useState } from 'react';
import fetchCoinsGrid from '../../services/fetchCoinsGrid';
import { useNavigate, useOutletContext } from 'react-router-dom';

function CryptoCoinTable() {
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState('usd');
    const [order, setOrder] = useState('market_cap_desc');
    const navigate = useNavigate();
    const { searchTerm } = useOutletContext();

    const currencySymbols = {
        usd: '$',
        eur: '€',
        gbp: '£',
        inr: '₹'
    };

    const { data, isLoading } = useQuery(['coins', page, currency, order], () => fetchCoinsGrid(page, currency, order), {
        retry: 3,
        retryDelay: 2000,
        cacheTime: 1000 * 60 * 2,
        cacheStaleTime: 1000 * 60 * 5
    });

    const filteredData = data?.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const jumpToCoinDetails = (id) => {
        navigate(`/coin/${id}`);
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value.toLowerCase());
    };

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        navigate(`/?page=${newPage}`);
    };

    return (
        <div className="overflow-x-auto my-5 mx-12 flex justify-center flex-col items-center gap-6">
            <div className="flex gap-4">
                <select 
                    className="select select-bordered w-full max-w-xs bg-base-200 text-primary border-primary/20 focus:border-primary" 
                    onChange={handleCurrencyChange} 
                    value={currency}
                >
                    <option disabled>Choose Currency</option>
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="gbp">GBP</option>
                    <option value="eur">EUR</option>
                </select>
                <select 
                    className="select select-bordered w-full max-w-xs bg-base-200 text-primary border-primary/20 focus:border-primary" 
                    onChange={handleOrderChange} 
                    value={order}
                >
                    <option disabled>Arrange Currency</option>
                    <option value="market_cap_desc">Market Cap Desc</option>
                    <option value="market_cap_asc">Market Cap Asc</option>
                    <option value="volume_asc">Volume Asc</option>
                    <option value="volume_desc">Volume Desc</option>
                    <option value="id_desc">Id Desc</option>
                </select>
            </div>
            <div className="w-full overflow-hidden rounded-lg border border-primary/20 bg-base-200/30 backdrop-blur-sm">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-300 text-primary border-b border-primary/20">
                            <th className="p-4 font-cyber text-center">Rank</th>
                            <th className="p-4 font-cyber text-left">Name</th>
                            <th className="p-4 font-cyber text-center">Price</th>
                            <th className="p-4 font-cyber text-center">Market Cap</th>
                            <th className="p-4 font-cyber text-center">Volume</th>
                            <th className="p-4 font-cyber text-center">Price Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.map((coin) => (
                            <tr 
                                key={coin.id} 
                                className="hover:bg-base-300/50 transition-all duration-200 cursor-pointer border-b border-primary/10" 
                                onClick={() => { jumpToCoinDetails(coin.id) }}
                            >
                                <td className="p-4 text-base-content text-center">{coin.market_cap_rank}</td>
                                <td className="p-4 text-base-content text-left">
                                    <div className='flex gap-2 items-center justify-start'>
                                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full ring-2 ring-primary/20" />
                                        <span className="font-medium">{coin.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-base-content text-center">
                                    {currencySymbols[currency]}{coin.current_price.toLocaleString()}
                                </td>
                                <td className="p-4 text-base-content text-center">
                                    {currencySymbols[currency]}{coin.market_cap.toLocaleString()}
                                </td>
                                <td className="p-4 text-base-content text-center">
                                    {currencySymbols[currency]}{coin.total_volume.toLocaleString()}
                                </td>
                                <td className={`p-4 text-center ${coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-error'}`}>
                                    {coin.price_change_percentage_24h?.toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isLoading && <span className="loading loading-ring loading-lg text-primary"></span>}
            <div className="join">
                <button 
                    disabled={page === 1} 
                    className="join-item btn bg-base-200 text-primary border-primary/20 hover:bg-base-300" 
                    onClick={() => { handlePageChange(page - 1); }}
                >
                    «
                </button>
                <button className="join-item btn bg-base-200 text-primary border-primary/20">
                    Page {page}
                </button>
                <button 
                    className="join-item btn bg-base-200 text-primary border-primary/20 hover:bg-base-300" 
                    onClick={() => { handlePageChange(page + 1); }}
                >
                    »
                </button>
            </div>
        </div>
    );
}

export default CryptoCoinTable;