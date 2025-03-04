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
	  "pricing-table-id": "prctbl_1QybXTKNed87YjIOmFWmSxIK",
	  "publishable-key":
		"pk_live_51Nj0LYKNed87YjIO4oXzTi2k3KuOVfvGfREZIMDPSwia9epS9u0wMukT1z1KE48zuxHFyDNf93Fv9hHjD64GTPgd00S3FP7FOD",
	});
  
  };