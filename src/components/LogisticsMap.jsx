import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";

export const LogisticsMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const layersRef = useRef({ markers: [], polyline: null });
  const [activeRoute, setActiveRoute] = useState("Route A");

  const routes = {
    "Route A": {
      name: "Route A — Hamilton Corridor",
      id: "Route A",
      origin: [43.6532, -79.3832], // Toronto
      destination: [43.2557, -79.8711], // Hamilton
      waypoints: [
        [43.6532, -79.3832],
        [43.6012, -79.5422], // Etobicoke
        [43.4474, -79.6877], // Oakville
        [43.3258, -79.7997], // Burlington
        [43.2557, -79.8711]  // Hamilton
      ],
      status: "In Transit",
      eta: "14:45",
      sla: "Normal",
      slaColor: "#1A4FBF"
    },
    "Route B": {
      name: "Route B — Kitchener Express",
      id: "Route B",
      origin: [43.5890, -79.6441], // Mississauga
      destination: [43.4516, -80.4925], // Kitchener
      waypoints: [
        [43.5890, -79.6441],
        [43.5183, -79.8841], // Milton
        [43.5422, -80.2505], // Guelph
        [43.4516, -80.4925]  // Kitchener
      ],
      status: "Delayed",
      eta: "16:20 (SLA At Risk)",
      sla: "High Alert",
      slaColor: "#B8960C"
    },
    "Route C": {
      name: "Route C — Markham Local",
      id: "Route C",
      origin: [43.6532, -79.3832], // Toronto
      destination: [43.8561, -79.3370], // Markham
      waypoints: [
        [43.6532, -79.3832],
        [43.7615, -79.4111], // North York
        [43.8163, -79.3639], // Thornhill
        [43.8561, -79.3370]  // Markham
      ],
      status: "Delivered",
      eta: "Completed",
      sla: "SLA Met",
      slaColor: "#1abf4f"
    }
  };

  useEffect(() => {
    // Initialize map
    if (!mapRef.current && mapContainerRef.current) {
      // Create Leaflet Map instance
      const map = L.map(mapContainerRef.current, {
        center: [43.55, -79.75],
        zoom: 9,
        scrollWheelZoom: false
      });

      // CartoDB Positron Tile Layer (Editorial Light theme)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20
      }).addTo(map);

      mapRef.current = map;
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous route layers
    layersRef.current.markers.forEach((m) => map.removeLayer(m));
    layersRef.current.markers = [];

    if (layersRef.current.polyline) {
      map.removeLayer(layersRef.current.polyline);
      layersRef.current.polyline = null;
    }

    // Draw active route data
    const route = routes[activeRoute];

    // Polylines
    const polyline = L.polyline(route.waypoints, {
      color: route.slaColor,
      weight: 4,
      opacity: 0.8
    }).addTo(map);
    layersRef.current.polyline = polyline;

    // Origin Pin
    const originMarker = L.marker(route.origin, {
      icon: L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: var(--color-ink); width: 12px; height: 12px; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
        iconSize: [12, 12]
      })
    })
      .addTo(map)
      .bindPopup(`<strong>Origin</strong><br/>Hub Coordinator Dispatch`);
    layersRef.current.markers.push(originMarker);

    // Destination Pin
    const destMarker = L.marker(route.destination, {
      icon: L.divIcon({
        className: "custom-div-icon",
        html: `<div style="background-color: ${route.slaColor}; width: 16px; height: 16px; border: 2px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.6);"></div>`,
        iconSize: [16, 16]
      })
    })
      .addTo(map)
      .bindPopup(
        `<strong>Destination Delivery</strong><br/>
         Status: <strong>${route.status}</strong><br/>
         ETA: ${route.eta}<br/>
         SLA: <span style="color: ${route.slaColor}; font-weight: bold">${route.sla}</span>`
      );
    layersRef.current.markers.push(destMarker);

    // Auto fit map bounds
    map.fitBounds(polyline.getBounds(), {
      padding: [40, 40]
    });

    // Auto open destination popup
    destMarker.openPopup();

  }, [activeRoute]);

  return (
    <div className="leaflet-map-wrapper" style={{ height: "450px", width: "100%" }} aria-label="Interactive Southern Ontario Logistics Map">
      <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
      
      {/* Map Interactive Control Panel Overlay */}
      <div className="map-control-panel">
        <h4 className="map-control-title">Active Dispatches</h4>
        <div className="map-route-list">
          {Object.values(routes).map((r) => (
            <button
              key={r.id}
              className={`map-route-btn ${activeRoute === r.id ? "active" : ""}`}
              onClick={() => setActiveRoute(r.id)}
            >
              <strong>{r.name}</strong>
              <span>Status: {r.status} ({r.sla})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
