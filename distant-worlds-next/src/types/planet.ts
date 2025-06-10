export interface Planet {
  planet_id: string;
  name: string;
  scientific_name: string;
  type: string;
  biome: string;
  gravity_source: string;
  nickname?: string;
  atmosphere_type: string;
  primary_resources?: string[];
  scientific_interest?: string[];
  habitability?: string;
  year_length_days: string;
  day_length_hours: string;
  description: string;
  lore?: string;
  extended_lore?: string;
  price: number;
  claimed: boolean;
  claimer_name?: string;
  claimer_email?: string;
  claim_message?: string;
}

export interface ClaimData {
  planet: Planet;
  claimerName: string;
  claimerEmail: string;
  claimMessage?: string;
} 