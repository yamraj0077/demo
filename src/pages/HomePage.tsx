import React from 'react';
import HeroSection from '../components/HeroSection';
import PageTitle from '../components/PageTitle';
import ToolsGrid from '../components/ToolsGrid';
import SEOHead from '../components/shared/SEOHead';

function HomePage() {
  return (
    <>
      <SEOHead 
        title="Free Online Developer Tools - PDF, Image, Text & More"
        description="Access free online tools for developers including PDF converters, image editors, text formatters, and more. No installation required, use directly in your browser."
      />
      <HeroSection />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <PageTitle 
          title="Popular Developer Tools"
          subtitle="Discover our most popular tools used by thousands of developers worldwide"
        />
        <ToolsGrid />
      </div>
    </>
  );
}

export default HomePage;