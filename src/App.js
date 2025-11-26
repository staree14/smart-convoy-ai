import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('Plan Routes');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [vehicleType, setVehicleType] = useState('Truck');

  const menuItems = ['Dashboard', 'Plan Routes', 'Active Convoys', 'Analytics', 'Settings'];

  const convoyQueue = [
    { id: 2847, route: 'Visakhapatnam → Hyderabad', priority: 'High', status: 'In Route', time: '14:30', eta: '2h 15m', progress: 45 },
    { id: 2848, route: 'VSKP → VJA', priority: 'Medium', status: 'Optimized', time: '14:45', eta: '1h 30m', progress: 0 },
    { id: 2849, route: 'WGL → HYD', priority: 'Low', status: 'Pending', time: '15:00', eta: '3h 00m', progress: 0, mergeSuggested: true },
    { id: 2850, route: 'VJA → HYD', priority: 'High', status: 'In Route', time: '15:15', eta: '1h 45m', progress: 60 },
    { id: 2851, route: 'VSKP → SKL', priority: 'Medium', status: 'Optimized', time: '15:30', eta: '45m', progress: 0 },
    { id: 2852, route: 'WGL → GNT', priority: 'High', status: 'Pending', time: '15:45', eta: '2h 30m', progress: 0 },
    { id: 2853, route: 'HYD → VSKP', priority: 'Low', status: 'In Route', time: '16:00', eta: '3h 20m', progress: 25 },
    { id: 2854, route: 'VJA → WGL', priority: 'Medium', status: 'Optimized', time: '16:15', eta: '2h 00m', progress: 0 },
  ];

  // Routes aligned with Andhra Pradesh/Telangana state map
  // Only showing one active route
  const routes = [
    { id: 1, color: 'red', optimized: true, start: { x: 85, y: 44 }, end: { x: 5, y: 53 }, name: 'VSKP → HYD' },
    { id: 2, color: 'red', optimized: true, start: { x: 42, y: 80 }, end: { x: 5, y: 53 }, name: 'VJA → HYD' },
    { id: 3, color: 'yellow', optimized: false, start: { x: 85, y: 44 }, end: { x: 42, y: 80 }, name: 'VSKP → VJA' },
    { id: 4, color: 'green', optimized: false, start: { x: 92, y: 24 }, end: { x: 21, y: 35 }, name: 'SKL → WGL' },
  ];

  // Strategic checkpoints aligned with SVG map coordinates
  const checkpoints = [
    { x: 85, y: 44, label: 'VSKP', name: 'VSKP' },
    { x: 5, y: 53, label: 'HYD', name: 'HYD' },
    { x: 42, y: 80, label: 'VJA', name: 'VJA' },
    { x: 21, y: 35, label: 'WGL', name: 'WGL' },
    { x: 92, y: 24, label: 'SKL', name: 'SKL' },
    { x: 35, y: 88, label: 'GNT', name: 'GNT' },
  ];

  // High risk zones (border areas, sensitive regions)
  const highRiskZones = [
    { x: 5, y: 20, width: 15, height: 12, name: 'Border Zone - North', risk: 'High' },
    { x: 75, y: 15, width: 20, height: 10, name: 'Coastal Security Zone', risk: 'Medium' },
    { x: 20, y: 40, width: 12, height: 15, name: 'Sensitive Region', risk: 'High' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-warning-yellow';
      case 'Low': return 'bg-success-green';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Optimized': return 'text-success-green';
      case 'Pending': return 'text-warning-yellow';
      case 'In Route': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Sidebar - Smaller */}
      <div className="w-48 bg-navy text-white shadow-2xl">
        <div className="p-3 border-b border-navy/50">
          <h1 className="text-lg font-bold text-white">SmartConvoy AI</h1>
          <p className="text-xs text-gray-300 mt-0.5">Convoy Management</p>
        </div>
        <nav className="mt-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveMenu(item)}
              className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 ${activeMenu === item
                ? 'bg-army-green text-white border-l-4 border-warning-yellow'
                : 'text-gray-300 hover:bg-navy/70 hover:text-white'
                }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content - 80% */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Section: Form - Compact */}
        <div className="bg-gray-800 p-4 shadow-md border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-300 mb-1">Source</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g., Visakhapatnam Base Camp"
                className="w-full px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-army-green focus:border-transparent placeholder-gray-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-300 mb-1">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Hyderabad Base Camp"
                className="w-full px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-army-green focus:border-transparent placeholder-gray-400"
              />
            </div>
            <div className="w-32">
              <label className="block text-xs font-medium text-gray-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-army-green focus:border-transparent"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="w-40">
              <label className="block text-xs font-medium text-gray-300 mb-1">Vehicle Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-army-green focus:border-transparent"
              >
                <option>Truck</option>
                <option>Armored Vehicle</option>
                <option>Supply Vehicle</option>
                <option>Medical Vehicle</option>
              </select>
            </div>
            <button className="mt-6 px-6 py-1.5 bg-army-green text-white rounded-lg hover:bg-army-green/90 transition-colors shadow-md font-medium text-sm">
              Calculate Route
            </button>
          </div>
        </div>

        {/* Middle Section: Map and Queue */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map Area */}
          <div className="flex-1 bg-gray-900 p-6 relative overflow-hidden">
            <div className="bg-gray-800 rounded-lg shadow-lg h-full relative border-2 border-gray-700">
              {/* Map Legend */}
              <div className="absolute top-4 left-4 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg p-3 z-10 border border-gray-700">
                <p className="text-xs font-semibold text-gray-200 mb-2">Route Status</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-1 bg-success-green"></div>
                  <span className="text-xs text-gray-300">Optimized</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-1 bg-warning-yellow border-dashed border-t-2 border-warning-yellow"></div>
                  <span className="text-xs text-gray-300">Conflict</span>
                </div>
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <p className="text-xs font-semibold text-red-400 mb-1">Risk Zones</p>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500/30 border-2 border-red-500"></div>
                    <span className="text-xs text-gray-300">High Risk</span>
                  </div>
                </div>
              </div>
              {/* Map Container */}
              <div className="relative w-full h-full overflow-hidden">
                {/* State Map Background - Real Map Image */}
                <div className="absolute inset-0 z-0">
                  {/* Real Map Image */}
                  <img
                    src="/map-image.png"
                    alt="Andhra Pradesh Telangana Map"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{
                      zIndex: 0,
                      transform: 'scale(1.15) translateX(4%)',
                      transformOrigin: 'center center',
                    }}
                    onError={(e) => {
                      console.log('Map image not found, using fallback');
                      e.target.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      console.log('Map image loaded successfully');
                    }}
                  />
                  
                  {/* Dark grey background fallback - only shows if image fails */}
                  <div 
                    className="absolute inset-0 bg-gray-800"
                    style={{ zIndex: -1 }}
                  />
                  
                  {/* Optional: Subtle grid overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-10" style={{ zIndex: 1 }}>
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#9CA3AF" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* High Risk Zones */}
                  <div className="absolute inset-0 z-10">
                    {highRiskZones.map((zone, idx) => (
                      <div
                        key={idx}
                        className="absolute border-2 border-red-500 bg-red-500/20 rounded"
                        style={{
                          left: `${zone.x}%`,
                          top: `${zone.y}%`,
                          width: `${zone.width}%`,
                          height: `${zone.height}%`,
                          borderStyle: 'dashed',
                          animation: 'pulse 2s infinite',
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                          ⚠️ {zone.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Route Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
                  {routes.map((route) => (
                    <line
                      key={route.id}
                      x1={`${route.start.x}%`}
                      y1={`${route.start.y}%`}
                      x2={`${route.end.x}%`}
                      y2={`${route.end.y}%`}
                      stroke={route.color === 'green' ? '#10B981' : route.color === 'yellow' ? '#F59E0B' : '#EF4444'}
                      strokeWidth="4"
                      strokeDasharray={route.optimized ? '0' : '10,5'}
                      opacity="0.9"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>

                {/* Checkpoint Markers */}
                {checkpoints.map((cp, idx) => (
                  <div
                    key={idx}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{
                      left: `${cp.x}%`,
                      top: `${cp.y}%`,
                      zIndex: 4,
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-5 h-5 bg-white border-2 border-army-green rotate-45 shadow-xl" style={{ borderWidth: '2px' }}></div>
                      <div className="w-0.5 h-4 bg-army-green"></div>
                    </div>
                    <span className="mt-1 text-[10px] font-semibold text-white bg-army-green/80 px-1.5 py-0.5 rounded">
                      {cp.label}
                    </span>
                  </div>
                ))}

                {/* Truck Icons with labels */}
                {routes.map((route, idx) => {
                  const truckX = route.start.x + (route.end.x - route.start.x) * 0.3;
                  const truckY = route.start.y + (route.end.y - route.start.y) * 0.3;
                  return (
                    <div
                      key={`truck-${route.id}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${truckX}%`,
                        top: `${truckY}%`,
                        zIndex: 3,
                      }}
                    >
                      <div className="text-3xl drop-shadow-lg filter" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>
                        🚛
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-gray-700 text-white text-xs px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
                        {route.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Convoy Queue */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-3 border-b border-gray-700 bg-navy text-white">
              <h3 className="text-sm font-bold">Convoy Queue</h3>
              <p className="text-xs text-gray-300">Active & Pending</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {convoyQueue.map((convoy) => (
                <div
                  key={convoy.id}
                  className={`bg-gray-700 rounded-lg shadow-sm p-3 border-2 ${convoy.mergeSuggested
                    ? 'border-warning-yellow bg-yellow-900/30'
                    : 'border-gray-600'
                    }`}
                >
                  {convoy.mergeSuggested && (
                    <div className="mb-2 p-1.5 bg-warning-yellow/20 rounded border border-warning-yellow">
                      <p className="text-xs font-semibold text-warning-yellow flex items-center gap-1">
                        ⚠️ Merge with #2847
                      </p>
                      <button className="mt-1.5 w-full px-2 py-1 bg-warning-yellow text-white rounded text-xs font-medium hover:bg-warning-yellow/90 transition-colors">
                        Merge
                      </button>
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-200">#{convoy.id}</p>
                      <p className="text-xs text-gray-300 font-medium">{convoy.route}</p>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium text-white ${getPriorityColor(convoy.priority)}`}>
                      {convoy.priority}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  {convoy.status === 'In Route' && convoy.progress > 0 && (
                    <div className="mb-1.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-gray-400">Progress</span>
                        <span className="text-xs font-medium text-gray-300">{convoy.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${convoy.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${getStatusColor(convoy.status)}`}>
                        {convoy.status}
                      </span>
                      {convoy.eta && (
                        <span className="text-xs text-gray-400">ETA: {convoy.eta}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{convoy.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Metrics */}
        <div className="bg-gray-800 border-t border-gray-700 p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-army-green to-army-green/80 rounded-lg p-6 shadow-lg text-white">
              <p className="text-sm text-white/80 mb-1">Active Convoys</p>
              <p className="text-3xl font-bold">43</p>
            </div>
            <div className="bg-gradient-to-br from-success-green to-success-green/80 rounded-lg p-6 shadow-lg text-white">
              <p className="text-sm text-white/80 mb-1">Fuel Saved</p>
              <p className="text-3xl font-bold">₹12.4L</p>
            </div>
            <div className="bg-gradient-to-br from-navy to-navy/80 rounded-lg p-6 shadow-lg text-white">
              <p className="text-sm text-white/80 mb-1">Convoys Merged</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 shadow-lg text-white">
              <p className="text-sm text-white/80 mb-1">Conflicts</p>
              <p className="text-3xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

