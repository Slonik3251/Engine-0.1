
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Crossroad, ThemeType } from '../../types';

interface MapViewProps {
  crossroads: Crossroad[];
  theme: ThemeType;
  onCrossroadClick: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ crossroads, theme, onCrossroadClick }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: string]: L.Layer }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      center: [53.4129, 58.9298],
      zoom: 13,
      zoomControl: false,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileUrl = theme === 'dark' 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap &copy; CARTO'
    }).addTo(mapRef.current);
  }, [theme]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    // Add new markers
    crossroads.forEach(cr => {
      const marker = L.circleMarker(cr.coordinates, {
        radius: 10,
        fillColor: '#99FF00',
        color: theme === 'dark' ? '#fff' : '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      })
      .addTo(mapRef.current!)
      .on('click', () => onCrossroadClick(cr.id));

      marker.bindTooltip(cr.name, { 
        permanent: false, 
        direction: 'top',
        className: theme === 'dark' 
          ? 'bg-black text-white border-none rounded px-2 py-1 text-xs shadow-lg' 
          : 'bg-white text-slate-900 border-none rounded px-2 py-1 text-xs shadow-lg'
      });

      markersRef.current[cr.id] = marker;
    });
  }, [crossroads, onCrossroadClick, theme]);

  return <div ref={containerRef} className="w-full h-full z-0" />;
};

export default MapView;
