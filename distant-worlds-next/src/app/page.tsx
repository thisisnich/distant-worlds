'use client';

import { useState, useEffect } from 'react';
import { Planet } from '@/types/planet';
import { parseMarkdownToJSON } from '@/utils/parseMarkdown';
import PlanetCard from '@/components/PlanetCard';
import StarField from '@/components/StarField';

export default function HomePage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);

  // Load planet data on component mount
  useEffect(() => {
    loadPlanetData();
  }, []);

  const loadPlanetData = async () => {
    const planetFiles = [
      'world_001_aetheris.md',
      'world_002_solithar.md',
      'world_003_calyx_vehl.md'
    ];

    const planetsData: Planet[] = [];

    for (const file of planetFiles) {
      try {
        const response = await fetch(`/${file}`);
        const text = await response.text();
        const planetData = parseMarkdownToJSON(text);
        if (planetData) {
          planetsData.push(planetData);
        }
      } catch (error) {
        console.warn(`Could not load ${file}:`, error);
        // Add sample data for demo if fetch fails
        addSampleData(planetsData);
        break;
      }
    }

    // Sort planets by ID
    planetsData.sort((a, b) => parseInt(a.planet_id) - parseInt(b.planet_id));
    setPlanets(planetsData);
    setLoading(false);
  };

  const addSampleData = (planetsData: Planet[]) => {
    if (planetsData.length === 0) {
      planetsData.push({
        planet_id: '001',
        name: 'Aetheris',
        scientific_name: 'Aetheris Invertum',
        type: 'Hollow-Core Terrestrial',
        biome: 'Cloud-Wreathed Continental Shell',
        gravity_source: 'Central Graviton Core',
        atmosphere_type: 'Oxygen-Nitrogen blend with high particulate density',
        year_length_days: '412',
        day_length_hours: '31.6',
        description: 'Aetheris is a hollow, shifting planet suspended in orbit by a mysterious graviton core — defying orbital physics. Its blue-violet surface twists endlessly, hiding answers no species has ever recovered.',
        price: 1,
        claimed: false
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarField />
        <div className="relative z-10 text-text-light text-xl font-orbitron">
          Loading distant worlds...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <StarField />
      
      <div className="relative z-10 container">
        {/* Hero Section */}
        <header className="hero animate-fadeInUp">
          <h1 className="title">
            Distant Worlds
          </h1>
          <p className="subtitle">
            Procedural Planet Collection
          </p>
          <p className="tagline">
            Minted, not discovered.
          </p>
        </header>

        {/* Info Section */}
        <section className="info-section animate-fadeInUp">
          <div className="info-grid">
            <div className="info-card">
              <h3>
                🌍 Weekly Drops
              </h3>
              <p>
                New procedurally generated planets every week
              </p>
            </div>
            <div className="info-card">
              <h3>
                📈 Dynamic Pricing
              </h3>
              <p>
                First claim sets the price, next planet costs $1 more
              </p>
            </div>
            <div className="info-card">
              <h3>
                🎨 100% Human-Made
              </h3>
              <p>
                Created with Blender, no AI generation
              </p>
            </div>
          </div>
        </section>

        {/* Planets Section */}
        <section className="animate-fadeInUp">
          <h2 className="section-title">
            Available Worlds
          </h2>
          <div className="planets-grid">
            {planets.map((planet) => (
              <PlanetCard
                key={planet.planet_id}
                planet={planet}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>
            &copy; 2024 Distant Worlds. All renders are unique digital assets.
          </p>
        </footer>
      </div>
    </div>
  );
}
