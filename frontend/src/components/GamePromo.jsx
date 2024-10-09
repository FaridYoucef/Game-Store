import React from 'react';

const GamePromo = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-8 bg-gray-900">
      {/* First Section - Diablo IV */}
      <div className="relative col-span-2 row-span-2">
        <img
          src="../promoD.jpg"
          alt="Diablo IV"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
          <h2 className="text-white text-2xl font-bold mb-2">Diablo IV: Season of Hatred Rising</h2>
          <p className="text-gray-300 mb-4">Stand against hatred and the Realmwalkers with fearsome new power.</p>
          <button className="text-yellow-400 font-bold underline">GET IT NOW</button>
        </div>
      </div>

      {/* Second Section - Game Pass */}
      <div className="relative col-span-2 row-span-1">
        <img
          src="../promoG.jpg"
          alt="Game Pass"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center p-4">
          <h2 className="text-white text-xl font-bold mb-2">Discover your next favourite game</h2>
          <p className="text-gray-300 mb-4">Play hundreds of games for one low monthly price.</p>
          <button className="text-green-400 font-bold underline">JOIN NOW</button>
        </div>
      </div>

      {/* Third Section - Xbox Controller */}
      <div className="relative col-span-2 row-span-2">
        <img
          src="../promoC.jpg"
          alt="Xbox Controller"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
          <h2 className="text-white text-xl font-bold mb-2">Elevate your game</h2>
          <p className="text-gray-300 mb-4">Reveal the Xbox Wireless Controller - Ghost Cypher Special Edition.</p>
          <button className="text-yellow-400 font-bold underline">LEARN MORE</button>
        </div>
      </div>

      {/* Fourth Section Starfield */}
      <div className="relative col-span-2 row-span-1">
        <img
          src="../promoL.jpg"
          alt="Starfield"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
          <h2 className="text-white text-xl font-bold mb-2">Starfield: Shattered Space</h2>
          <p className="text-gray-300 mb-4">Uncover the secrets behind House Va’ruun in this new story expansion.</p>
          <button className="text-yellow-400 font-bold underline">GET IT NOW</button>
        </div>
      </div>

    </div>
  );
};

export default GamePromo;
