import React from "react";
import CustomTabs from "../../components/Tabs/Tabs.js";
import TokenLock from "../../views/TokenLock/TokenLock.js";
import LiquidityLock from "../../views/LiquidityLock/LiquidityLock.js";

export default function Locks() {
  const tabItems = [
    { label: "Token Lock", component: TokenLock },
    { label: "Liquidity Lock", component: LiquidityLock },
  ];

  return <CustomTabs tabItems={tabItems} storageKey="locks" />;
}
