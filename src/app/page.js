"use client";

import { useState } from "react";

export default function Home() {
  const [fromCurrency, setFromCurrency] = useState("CAD");
  const [toCurrency, setToCurrency] = useState([
    "USD",
    "YEN",
    "EUR",
    "GBP",
    "AUD",
    "WON",
  ]);

  return (
    <div class="flex items-center my-5 flex-col">
      <h1 class="text-3xl">How Much</h1>
      <p class="text-lg">Exchange rate application for currency conversion</p>
      {/* 10 different currencies */}
      {/* {toCurrency.forEach((currency) => {
        <div>
          <p>{currency}</p>
        </div>;
      })} */}
    </div>
  );
}
