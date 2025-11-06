'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './styles.module.scss';

const Map = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: ref.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [37.618423, 55.751244],
      zoom: 10,
    });
  }, []);
  return (
    <div ref={ref} className={styles.root}>
      index
    </div>
  );
};

export default Map;
