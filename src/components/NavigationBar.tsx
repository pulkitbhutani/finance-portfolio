import React, { useState } from "react";

import {
  LayoutDashboard,
  Clock,
  ArrowRightLeft,
  PersonStanding,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Activity", icon: Clock },
  { name: "Transactions", icon: ArrowRightLeft },
  { name: "Profile", icon: PersonStanding },
];

function NavigationBar() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  return (
    <div className="px-10 py-12 flex flex-col border border-r-1 w-1/5 h-screen">
      <div className="logo-div flex ">
        <img
          src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta-500x281.png"
          className="w-20"
        ></img>
        <span>Eze Finance</span>
      </div>

      <div className="mt-9 flex flex-col space-y-8">
        {navLinks.map((item, index) => (
          <div
            key={index}
            className={
              "flex space-x-3 p-2 rounded" +
              (activeNavIndex === index
                ? " bg-[#0081FB] text-white font-semibold"
                : "")
            }
            onClick={() => setActiveNavIndex(index)}
          >
            <item.icon></item.icon>
            <span>{item?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default NavigationBar;
