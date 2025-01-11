import React from 'react';

interface LogoProps {
  className?: string; 
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <img
      className={`w-60 h-31 ${className}`}
      src="/logo.png"
      alt="HES logo"
    />
  );
}

export default Logo;
