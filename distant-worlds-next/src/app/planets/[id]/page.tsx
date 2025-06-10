'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Planet, ClaimData } from '@/types/planet';
import { parseMarkdownToJSON } from '@/utils/parseMarkdown';
import ClaimModal from '@/components/ClaimModal';
import Notification from '@/components/Notification';
import StarField from '@/components/StarField';
import Link from 'next/link';

export default function PlanetDetailPage() {
  const { id } = useParams();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  useEffect(() => {
    if (id) {
      loadPlanetData(id as string);
    }
  }, [id]);

  const loadPlanetData = async (planetId: string) => {
    try {
      // Pad the planetId with leading zeros to match the markdown file format (e.g., 1 -> 001)
      const formattedPlanetId = planetId.padStart(3, '0');
      const filePath = `/world_${formattedPlanetId}.md`;
      const response = await fetch(filePath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath}`);
      }

      const text = await response.text();
      const parsedPlanet = parseMarkdownToJSON(text);
      
      if (parsedPlanet) {
        setPlanet(parsedPlanet);
      } else {
        setPlanet(null); // Or handle error: planet not found
      }
    } catch (error) {
      console.error('Error loading planet data:', error);
      setPlanet(null); // Indicate error
    } finally {
      setLoading(false);
    }
  };

  const handleClaimClick = () => {
    if (planet) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClaimSubmission = async (claimData: ClaimData) => {
    try {
      // This would typically involve an API call to update the planet's status
      // For now, we'll simulate the update locally
      if (planet) {
        setPlanet(prev => {
          if (!prev) return null;
          return {
            ...prev,
            claimed: true,
            claimer_name: claimData.claimerName,
            claimer_email: claimData.claimerEmail,
            claim_message: claimData.claimMessage,
          };
        });
      }

      // Send notification email (placeholder)
      await sendClaimNotification(claimData);

      setIsModalOpen(false);
      showNotification(
        `Planet ${claimData.planet.name} claimed successfully! Check your email for confirmation.`,
        'success'
      );
    } catch (error) {
      console.error('Claim submission failed:', error);
      showNotification('Failed to claim planet. Please try again.', 'error');
    }
  };

  const sendClaimNotification = async (claimData: ClaimData) => {
    // Placeholder for email sending logic
    const formData = new FormData();
    formData.append('planetName', claimData.planet.name);
    formData.append('planetId', claimData.planet.planet_id);
    formData.append('claimerName', claimData.claimerName);
    formData.append('claimerEmail', claimData.claimerEmail);
    formData.append('claimMessage', claimData.claimMessage || '');
    formData.append('price', claimData.planet.price.toString());

    // Example with FormSubmit (replace with your email endpoint)
    // await fetch('https://formsubmit.co/your-email@example.com', {
    //   method: 'POST',
    //   body: formData
    // });
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarField />
        <div className="relative z-10 text-text-light text-xl font-orbitron">
          Loading planet data...
        </div>
      </div>
    );
  }

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarField />
        <div className="relative z-10 text-danger text-2xl font-orbitron text-center">
          Planet not found.
          <br/>
          <Link href="/" className="text-primary hover:underline text-lg mt-4 block">Go back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <StarField />

      <div className="relative z-10 container py-12 md:py-20">
        <div className="mb-8">
          <Link href="/" className="text-muted hover:text-primary transition-colors flex items-center gap-2 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to All Worlds
          </Link>

          <h1 className="planet-name text-4xl md:text-5xl font-orbitron font-bold leading-tight mb-2">
            {planet.name}
          </h1>
          <p className="planet-scientific text-xl text-muted italic mb-4">
            {planet.scientific_name}
          </p>
          <div className="planet-type text-lg mb-6">
            {planet.type}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-orbitron font-bold text-light mb-4">Description</h2>
              <p className="planet-description text-lg mb-6">
                {planet.description}
              </p>

              <h2 className="text-2xl font-orbitron font-bold text-light mb-4 mt-6">Planet Stats</h2>
              <div className="planet-stats flex flex-col gap-3">
                <div className="stat-item">
                  <span className="stat-label">Biome:</span>
                  <span className="stat-value">{planet.biome || 'Unknown'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Gravity Source:</span>
                  <span className="stat-value">{planet.gravity_source || 'Unknown'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Atmosphere Type:</span>
                  <span className="stat-value">{planet.atmosphere_type || 'Unknown'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Year Length:</span>
                  <span className="stat-value">{planet.year_length_days || 'N/A'} days</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Day Length:</span>
                  <span className="stat-value">{planet.day_length_hours || 'N/A'} hours</span>
                </div>
                {planet.primary_resources && planet.primary_resources.length > 0 && (
                  <div className="stat-item">
                    <span className="stat-label">Primary Resources:</span>
                    <span className="stat-value">{planet.primary_resources.join(', ')}</span>
                  </div>
                )}
                {planet.scientific_interest && planet.scientific_interest.length > 0 && (
                  <div className="stat-item">
                    <span className="stat-label">Scientific Interest:</span>
                    <span className="stat-value">{planet.scientific_interest.join(', ')}</span>
                  </div>
                )}
                {planet.habitability && (
                  <div className="stat-item">
                    <span className="stat-label">Habitability:</span>
                    <span className="stat-value">{planet.habitability}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-orbitron font-bold text-light mb-4">Lore</h2>
              <p className="text-muted leading-relaxed mb-6">
                {planet.lore || 'No lore available.'}
              </p>

              <h2 className="text-2xl font-orbitron font-bold text-light mb-4">Extended Lore</h2>
              <p className="text-muted leading-relaxed mb-6">
                {planet.extended_lore || 'No extended lore available.'}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-light text-2xl font-orbitron mb-4">
              Current Price: <span className="text-success font-bold text-4xl">${planet.price}</span>
            </p>
            <button
              onClick={handleClaimClick}
              disabled={planet.claimed}
              className={`claim-btn text-xl px-8 py-4 ${planet.claimed ? 'claimed' : ''}`}
            >
              {planet.claimed ? 'CLAIMED' : 'CLAIM PLANET'}
            </button>
            {planet.claimed && planet.claimer_name && (
              <p className="text-muted mt-4">Claimed by: {planet.claimer_name}</p>
            )}
          </div>
        </div>
      </div>

      <ClaimModal
        planet={planet}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleClaimSubmission}
      />

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
} 