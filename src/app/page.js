"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState([
    "USD",
    "YEN",
    "EUR",
    "GBP",
    "AUD",
    "WON",
  ]);

  const handleCurrencyInput = (e) => {
    setFromCurrency(e.target.value);
  };

  useEffect(() => {
    console.log(fromCurrency * 10);
  }, [fromCurrency]);

  return (
    <div class="flex items-center my-5 flex-col">
      <div class="flex items-center flex-col max-w-2xl">
        <h1 class="text-3xl">How Much</h1>
        <p class="text-lg my-2">
          Exchange rate application for currency conversion
        </p>
        {/* Main container */}
        <div class="flex gap-4 w-full">
          {/* First container for currency to convert */}
          <div class="rounded-md border-inherit w-1/2 h-32 flex flex-col p-2 bg-slate-950">
            <p class="">From currency</p>
            <input
              placeholder={0}
              value={fromCurrency}
              onChange={handleCurrencyInput}
              type="number"
              class="bg-inherit text-5xl border-0 text-emerald-500 outline-none"
            />
            <select class="bg-inherit border-0 outline-none max-w-16">
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
              <option value="YEN">YEN</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="WON">WON</option>
            </select>
          </div>
          {/* Second container displaying all currency conversions */}
          <div class="w-1/2">
            <p>To Currency</p>
            {toCurrency.map((currency) => (
              <p key={currency}>
                {fromCurrency} {currency}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
