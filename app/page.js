"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Upgrade from "../components/Upgrade";
import AutoClicker from "../components/AutoClicker";
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  // Initialize state for upgrades - an object containing all available upgrades
  const [cookies, setCookies] = useState(0);
// Each upgrade is an object with properties defining its behavior
  const [upgrades, setUpgrades] = useState({
    cursor: {
      count: 0,
      baseCost: 15,      // Achievable in ~1 minute
      name: "Cursor",
      description: "Auto-clicks once every 10 seconds",
      cps: 0.1,
      image: "/upgrades/cursor.png",
    },
    grandma: {
      count: 0,
      baseCost: 100,     // ~6.7x previous
      name: "Grandma",
      description: "A nice grandma to bake cookies",
      cps: 1,            // 10x previous
      image: "/upgrades/grandma.png",
    },
    farm: {
      count: 0,
      baseCost: 1100,    // 11x previous
      name: "Cookie Farm",
      description: "Grows cookie plants",
      cps: 8,            // 8x previous
      image: "/upgrades/cookie-farm.png",
    },
    mine: {
      count: 0,
      baseCost: 12000,   // ~11x previous
      name: "Cookie Mine",
      description: "Mines cookie dough from the ground",
      cps: 47,           // ~6x previous
      image: "/upgrades/cookie-mine.png",
    },
    factory: {
      count: 0,
      baseCost: 130000,  // ~11x previous
      name: "Cookie Factory",
      description: "Mass produces cookies",
      cps: 260,          // ~5.5x previous
      image: "/upgrades/cookie-factory.webp",
    },
    bank: {
      count: 0,
      baseCost: 1400000, // ~11x previous
      name: "Cookie Bank",
      description: "Generates cookies from interest",
      cps: 1400,         // ~5.4x previous
      image: "/upgrades/cookie-bank.webp",
    },
    temple: {
      count: 0,
      baseCost: 20000000, // ~14x previous
      name: "Cookie Temple",
      description: "Generates cookies through divine powers",
      cps: 7800,          // ~5.6x previous
      image: "/upgrades/temple.webp",
    },
    wizardTower: {
      count: 0,
      baseCost: 330000000, // ~16.5x previous
      name: "Wizard Tower",
      description: "Conjures cookies using magic",
      cps: 44000,          // ~5.6x previous
      image: "/upgrades/wizard-tower.webp",
    },
  });

  // this makes the cost of the upgrade increase by * 1.15 each time or 15%
  const calculateCost = (baseCost, count) => {
    return Math.floor(baseCost * Math.pow(1.15, count));
  };

  // Function to handle purchasing upgrades
  const purchaseUpgrade = (upgradeKey) => {
    const upgrade = upgrades[upgradeKey];
    const cost = calculateCost(upgrade.baseCost, upgrade.count);
// if the number of cookies clicked is greater than the cost of the upgrade, then purchase the upgrade
    if (cookies >= cost) {
      // subtract the cost of the upgrade from the number of cookies clicked 
      // subtracts the cost of the upgrade from the number of cookies clicked
      setCookies(prev => prev - cost);
      // increase the count of the upgrade by 1
      setUpgrades(prev => ({
        ...prev,
        [upgradeKey]: {
          ...prev[upgradeKey],
          count: prev[upgradeKey].count + 1,
        }
      }));
    }
  };

  // Effect to update the number of cookies based on upgrades
  useEffect(() => {
    const interval = setInterval(() => {
      let totalCps = 0;
       // For each upgrade, multiply its cps by how many we own
       // Add the total cps to the totalCps variable
      Object.values(upgrades).forEach(upgrade => {
        totalCps += upgrade.count * upgrade.cps;
      });
      
      if (totalCps > 0) {
        //if total cps is greater than 0, then update the number of cookies
        // Update the number of cookies based on the total cookies per second
        setCookies(prev => prev + totalCps);
      }
    }, 1000); //this means 1000 milliseconds or 1 second
    // this effect runs every second to update the number of cookies based on upgrades
    return () => clearInterval(interval);
  }, [upgrades]);

  // Calculate how many cursors to show (max 8 to avoid cluttering)
  const cursorCount = Math.min(upgrades.cursor.count, 8);

  // Add state for click effects
  const [clickEffects, setClickEffects] = useState([]);

  // Function to add click effect
  const addClickEffect = (angle) => {
    const id = Math.random();
    const effect = { id, angle };
    setClickEffects(prev => [...prev, effect]);
    setTimeout(() => {
      setClickEffects(prev => prev.filter(e => e.id !== id));
    }, 1000);
  };

  // Effect to trigger click animations
  useEffect(() => {
    const interval = setInterval(() => {
      if (cursorCount > 0) {
        const randomAngle = Math.floor(Math.random() * 360);
        addClickEffect(randomAngle);
      }
    }, 1000 / cursorCount); // Distribute clicks evenly

    return () => clearInterval(interval);
  }, [cursorCount]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 bg-amber-50">
      <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center">
        Cookies: {Number.isInteger(cookies) ? cookies : cookies.toFixed(1)}
      </h1>

      <main className="relative flex items-center justify-center">
        {/* Cookie container with cursors */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Auto-clicker cursors */}
          <div className="relative">
            {[...Array(cursorCount)].map((_, index) => (
              <AutoClicker
                key={index}
                index={index}
                total={cursorCount}
                angle={(360 / cursorCount) * index}
              />
            ))}
            
            {/* Click effects */}
            <AnimatePresence>
              {clickEffects.map(effect => (
                <motion.div
                  key={effect.id}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-1/2 top-1/2 w-4 h-4 -ml-2 -mt-2"
                >
                  <motion.div
                    className="w-full h-full bg-amber-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Cookie button */}
            <motion.button
              onClick={() => {
                setCookies(prev => prev + 1);
                addClickEffect(Math.random() * 360);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Image
                src="/cookie.png"
                alt="Cookie"
                width={200}
                height={200}
                priority
              />
            </motion.button>
          </div>
        </div>

        {/* Upgrades container - positioned to the right */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 max-h-[70vh] overflow-y-auto bg-amber-50/80 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-amber-800 mb-4 sticky top-0 bg-amber-50/95 py-2">
            Upgrades
          </h2>
          <div className="space-y-4">
            {Object.entries(upgrades).map(([key, upgrade]) => (
              <Upgrade
                key={key}
                name={upgrade.name}
                description={upgrade.description}
                cost={calculateCost(upgrade.baseCost, upgrade.count)}
                count={upgrade.count}
                image={upgrade.image}
                onPurchase={() => purchaseUpgrade(key)}
                canAfford={cookies >= calculateCost(upgrade.baseCost, upgrade.count)}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="text-amber-600 mt-8 text-center">
        Click the cookie to earn more cookies!
      </footer>
    </div>
  );
}
