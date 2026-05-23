import React from 'react';
import PartnershipHero from '../components/PartnershipHero';
import PartnershipCards from '../components/PartnershipCards';
import PartnershipLevels from '../components/PartnershipLevels';
import PartnershipCTA from '../components/PartnershipCTA';

const PartnershipPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PartnershipHero />
      <PartnershipCards />
      <PartnershipLevels />
      <PartnershipCTA />
    </div>
  );
};

export default PartnershipPage;
