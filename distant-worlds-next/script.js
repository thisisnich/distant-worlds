// Planet data structure
const planetsData = [];

// Current pricing tier starts at $1
let currentPriceTier = 1;

// Email configuration (you'll need to set this up with your email service)
const EMAIL_SERVICE_ENDPOINT = 'https://formsubmit.co/your-email@example.com'; // Replace with your email

// Load planet data from markdown files
async function loadPlanetData() {
    const planetFiles = [
        'world_001_aetheris.md',
        'world_002_solithar.md',
        'world_003_calyx_vehl.md'
    ];

    for (const file of planetFiles) {
        try {
            const response = await fetch(file);
            const text = await response.text();
            const planetData = parseMarkdownToJSON(text);
            if (planetData) {
                planetsData.push(planetData);
            }
        } catch (error) {
            console.warn(`Could not load ${file}:`, error);
            // For demo purposes, we'll add some sample data
            addSampleData();
        }
    }

    // Sort planets by ID
    planetsData.sort((a, b) => a.planet_id - b.planet_id);
    
    // Render planets
    renderPlanets();
}

// Parse markdown content to JSON
function parseMarkdownToJSON(markdownText) {
    const lines = markdownText.split('\n');
    let inFrontMatter = false;
    let frontMatterLines = [];
    let description = '';
    let lore = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '---') {
            if (!inFrontMatter) {
                inFrontMatter = true;
                continue;
            } else {
                inFrontMatter = false;
                continue;
            }
        }
        
        if (inFrontMatter) {
            frontMatterLines.push(line);
        } else if (line.startsWith('## Description')) {
            // Get description content
            i++;
            while (i < lines.length && !lines[i].trim().startsWith('##')) {
                if (lines[i].trim()) {
                    description += lines[i].trim() + ' ';
                }
                i++;
            }
            i--; // Step back one line
        }
    }
    
    // Parse front matter
    const frontMatter = {};
    frontMatterLines.forEach(line => {
        if (line.includes(':') && !line.startsWith('-')) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            
            if (key.trim() === 'primary_resources' || key.trim() === 'scientific_interest') {
                frontMatter[key.trim()] = [];
            } else {
                frontMatter[key.trim()] = value;
            }
        } else if (line.startsWith('-') && line.includes(' ')) {
            const value = line.substring(1).trim();
            const lastKey = Object.keys(frontMatter).pop();
            if (Array.isArray(frontMatter[lastKey])) {
                frontMatter[lastKey].push(value);
            }
        }
    });
    
    return {
        ...frontMatter,
        description: description.trim(),
        price: calculatePrice(frontMatter.planet_id),
        claimed: false
    };
}

// Add sample data for demo
function addSampleData() {
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
        
        planetsData.push({
            planet_id: '002',
            name: 'Solithar',
            scientific_name: 'Solithar Crystallinus',
            type: 'Crystal Desert World',
            biome: 'Temporal Crystal Fields',
            gravity_source: 'Crystalline Core Resonance',
            atmosphere_type: 'Thin argon-helium mix with temporal particles',
            year_length_days: '298',
            day_length_hours: '18.4',
            description: 'A crystalline desert world where time moves differently near massive crystal formations. Purple auroras dance constantly in the thin atmosphere, creating mesmerizing light patterns.',
            price: 2,
            claimed: false
        });
        
        planetsData.push({
            planet_id: '003',
            name: 'Calyx Vehl',
            scientific_name: 'Calyx Vehlensis',
            type: 'Bio-Mechanical Hybrid',
            biome: 'Living Metal Forests',
            gravity_source: 'Organic-Mechanical Core',
            atmosphere_type: 'Oxygen-rich with metallic spores',
            year_length_days: '567',
            day_length_hours: '26.1',
            description: 'A world where organic life and technology have merged into something entirely new. Forests of living metal trees pulse with bioluminescent energy, creating a symphony of light and sound.',
            price: 3,
            claimed: false
        });
    }
}

// Calculate planet price based on claimed status
function calculatePrice(planetId) {
    const planetNumber = parseInt(planetId);
    return planetNumber; // Each subsequent planet costs $1 more
}

// Render planets in the grid
function renderPlanets() {
    const planetsGrid = document.getElementById('planets-grid');
    planetsGrid.innerHTML = '';
    
    planetsData.forEach(planet => {
        const planetCard = createPlanetCard(planet);
        planetsGrid.appendChild(planetCard);
    });
}

// Create individual planet card
function createPlanetCard(planet) {
    const card = document.createElement('div');
    card.className = 'planet-card';
    card.setAttribute('data-planet-id', planet.planet_id);
    
    const claimedStatus = planet.claimed ? 'claimed' : '';
    const buttonText = planet.claimed ? 'CLAIMED' : 'CLAIM PLANET';
    const buttonClass = planet.claimed ? 'claim-btn claimed' : 'claim-btn';
    
    card.innerHTML = `
        <div class="planet-header">
            <div class="planet-id">PLANET #${planet.planet_id}</div>
            <h3 class="planet-name">${planet.name}</h3>
            <div class="planet-scientific">${planet.scientific_name}</div>
            <div class="planet-type">${planet.type}</div>
        </div>
        <div class="planet-content">
            <p class="planet-description">${planet.description}</p>
            <div class="planet-stats">
                <div class="stat-item">
                    <div class="stat-label">Biome</div>
                    <div class="stat-value">${planet.biome || 'Unknown'}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Year Length</div>
                    <div class="stat-value">${planet.year_length_days || 'N/A'} days</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Day Length</div>
                    <div class="stat-value">${planet.day_length_hours || 'N/A'} hours</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Gravity Source</div>
                    <div class="stat-value">${planet.gravity_source || 'Standard'}</div>
                </div>
            </div>
            <div class="planet-price">
                <div class="price-amount">$${planet.price}</div>
                <div class="price-note">per render set (10 views)</div>
            </div>
            <button class="${buttonClass}" onclick="handleClaimClick('${planet.planet_id}')" ${planet.claimed ? 'disabled' : ''}>
                ${buttonText}
            </button>
        </div>
    `;
    
    return card;
}

// Handle claim button click
function handleClaimClick(planetId) {
    const planet = planetsData.find(p => p.planet_id === planetId);
    if (!planet || planet.claimed) return;
    
    openClaimModal(planet);
}

// Open claim modal
function openClaimModal(planet) {
    const modal = document.getElementById('claimModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalTitle.textContent = `Claim Planet ${planet.name}`;
    modalDescription.textContent = `You are about to claim Planet #${planet.planet_id}: ${planet.name} for $${planet.price}. This includes all 10 rendered views of the planet.`;
    
    // Store current planet ID in modal for form submission
    modal.setAttribute('data-planet-id', planet.planet_id);
    
    modal.style.display = 'block';
    
    // Clear form
    document.getElementById('claimForm').reset();
}

// Close modal
function closeModal() {
    const modal = document.getElementById('claimModal');
    modal.style.display = 'none';
}

// Handle form submission
async function handleClaimSubmission(event) {
    event.preventDefault();
    
    const modal = document.getElementById('claimModal');
    const planetId = modal.getAttribute('data-planet-id');
    const planet = planetsData.find(p => p.planet_id === planetId);
    
    if (!planet) return;
    
    const formData = new FormData(event.target);
    const claimData = {
        planetId: planetId,
        planetName: planet.name,
        price: planet.price,
        claimerName: formData.get('claimerName') || document.getElementById('claimerName').value,
        claimerEmail: formData.get('claimerEmail') || document.getElementById('claimerEmail').value,
        message: formData.get('claimMessage') || document.getElementById('claimMessage').value
    };
    
    // Send email notification
    try {
        await sendClaimNotification(claimData);
        
        // Mark planet as claimed
        planet.claimed = true;
        
        // Re-render planets
        renderPlanets();
        
        // Close modal
        closeModal();
        
        // Show success message
        showNotification(`Successfully claimed Planet ${planet.name}! You will receive a confirmation email shortly.`, 'success');
        
    } catch (error) {
        console.error('Error submitting claim:', error);
        showNotification('There was an error processing your claim. Please try again.', 'error');
    }
}

// Send claim notification email
async function sendClaimNotification(claimData) {
    // Using FormSubmit.co for easy email handling
    // You can replace this with your preferred email service
    
    const emailBody = `
New Planet Claim Request

Planet: #${claimData.planetId} - ${claimData.planetName}
Price: $${claimData.price}
Claimer: ${claimData.claimerName}
Email: ${claimData.claimerEmail}
Message: ${claimData.message || 'No message provided'}

Please process this claim and send payment instructions to the claimer.
    `;
    
    // Create a hidden form for FormSubmit
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = EMAIL_SERVICE_ENDPOINT;
    form.style.display = 'none';
    
    // Add form fields
    const fields = {
        '_subject': `Planet Claim: ${claimData.planetName}`,
        '_captcha': 'false',
        '_template': 'table',
        'Planet': `#${claimData.planetId} - ${claimData.planetName}`,
        'Price': `$${claimData.price}`,
        'Claimer Name': claimData.claimerName,
        'Claimer Email': claimData.claimerEmail,
        'Message': claimData.message || 'No message provided'
    };
    
    Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 2000;
        max-width: 300px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load planet data
    loadPlanetData();
    
    // Modal close events
    const modal = document.getElementById('claimModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = closeModal;
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Form submission
    document.getElementById('claimForm').addEventListener('submit', handleClaimSubmission);
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 