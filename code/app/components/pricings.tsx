"use client"

import React, { useEffect } from "react";

export const StripePricingTable = () => {

	useEffect(() => {
	  const script = document.createElement("script");
	  script.src = "https://js.stripe.com/v3/pricing-table.js";
	  script.async = true;
	  document.body.appendChild(script);
	  
	  return () => {
		document.body.removeChild(script);
	  };
  
	}, []);
  
	return React.createElement("stripe-pricing-table", {
	  "pricing-table-id": "prctbl_1R7088KNed87YjIOLRB5xnvU",
	  "publishable-key":
		"pk_test_51Nj0LYKNed87YjIOoDVZg8oAhf0SUwx4LJTu0mu0xbf4yQdn5RYzdrZYJp6ZqN7ojxge3kVB00CobmpxIeJk6Gyn00gV4jY8eP",
	});
  
  };