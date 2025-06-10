'use client';

import Link from 'next/link';
import { Planet } from '@/types/planet';

interface PlanetCardProps {
  planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <Link href={`/planets/${planet.planet_id}`} className="planet-card">
      <div className="planet-header">
        <div className="planet-id">
          PLANET #{planet.planet_id}
        </div>
        <h3 className="planet-name">
          {planet.name}
        </h3>
        <div className="planet-scientific">
          {planet.scientific_name}
        </div>
        <div className="planet-type">
          {planet.type}
        </div>
      </div>
      
      <div className="planet-content">
        <p className="planet-description">
          {planet.description}
        </p>
        
        <div className="planet-stats">
          <div className="stat-item">
            <div className="stat-label">Biome</div>
            <div className="stat-value">{planet.biome || 'Unknown'}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Year Length</div>
            <div className="stat-value">{planet.year_length_days || 'N/A'} days</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Day Length</div>
            <div className="stat-value">{planet.day_length_hours || 'N/A'} hours</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Atmosphere</div>
            <div className="stat-value">{planet.atmosphere_type || 'Unknown'}</div>
          </div>
        </div>
        
        <div className="planet-footer">
          <div className="planet-price">
            <span className="price-label">Price: </span>
            <span className="price-amount">${planet.price}</span>
          </div>
          
          <div className="discover-more-btn">
            Discover More
          </div>

          {planet.claimed && planet.claimer_name && (
            <div className="mt-3 p-2 bg-card-bg rounded-lg border border-card-border text-text-muted">
              <div className="text-sm font-medium">Claimed by: {planet.claimer_name}</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 