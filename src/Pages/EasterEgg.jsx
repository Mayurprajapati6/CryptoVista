import React, { useState } from "react";

function EasterEgg() {
  const facts = [
    "The mysterious creator of Bitcoin, Satoshi Nakamoto, remains anonymous to this day.",
    "Bitcoin's maximum supply is capped at 21 million coins. No more can ever be created!",
    "The first real-world Bitcoin transaction was for two pizzas, purchased for 10,000 BTC in 2010.",
    "Ethereum, the second-largest cryptocurrency, introduced smart contracts to the blockchain world.",
    "Dogecoin started as a joke but now has a strong community and significant value.",
    "The world's first Bitcoin ATM was installed in Vancouver, Canada, in 2013.",
    "There are over 22,000 cryptocurrencies in existence today!",
    "The term 'HODL' originated from a typo in a Bitcoin forum post and now means 'Hold On for Dear Life'.",
    "El Salvador became the first country to adopt Bitcoin as legal tender in 2021.",
    "Over 18% of the Bitcoin supply has been lost forever due to forgotten keys and inaccessible wallets.",
  ];

  const [fact, setFact] = useState("");

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setFact(facts[randomIndex]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-base-200/30 backdrop-blur-sm text-primary p-8 rounded-lg shadow-lg border border-primary/20 max-w-lg text-center">
        <h2 className="text-3xl font-cyber mb-4">Crypto Easter Egg 🥚</h2>
        <p className="text-lg text-base-content mb-6">
          Click the button below to discover a random fun fact about cryptocurrencies!
        </p>
        <button
          onClick={getRandomFact}
          className="bg-primary text-base-100 px-6 py-2 rounded-lg font-cyber hover:bg-primary/90 transition-all duration-200"
        >
          Reveal a Fact
        </button>
        {fact && (
          <div className="mt-6 text-base-content text-lg">
            <p className="bg-base-300/50 p-4 rounded-lg border border-primary/10">{fact}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EasterEgg;
