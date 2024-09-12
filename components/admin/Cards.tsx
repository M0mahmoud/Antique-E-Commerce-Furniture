import { ScanEye, ShoppingCart, Users, Wallet } from "lucide-react";
import React from "react";
import DataCard from "./DataCard";

const Cards = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-4 2xl:gap-7">
      <DataCard title="views" total="$3.46K" rate="0.43%" levelUp>
        <ScanEye className="text-primary w-12 h-12" />
      </DataCard>
      <DataCard title="Profit" total="$45,2K" rate="4.35%" levelUp>
        <Wallet className="text-primary w-12 h-12" />
      </DataCard>
      <DataCard title="Products" total="245K" rate="2.59%" levelUp>
        <ShoppingCart className="text-primary w-12 h-12" />
      </DataCard>
      <DataCard title="Users" total="3.456" rate="0.95%" levelDown>
        <Users className="text-primary w-12 h-12" />
      </DataCard>
    </div>
  );
};

export default Cards;
