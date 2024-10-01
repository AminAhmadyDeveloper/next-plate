import { Slot } from '@radix-ui/react-slot';
import type { PropsWithChildren } from 'react';
import React from 'react';

interface PseudoProps extends PropsWithChildren {
  before?: React.CSSProperties;
  after?: React.CSSProperties;
  firstLine?: React.CSSProperties;
  firstLetter?: React.CSSProperties;
}

const Pseudo: React.FC<PseudoProps> = ({
  children,
  after,
  before,
  firstLetter,
  firstLine,
}) => {
  const generatePseudoStyles = () => {
    let styles = `
            .pseudo-container div::before {
                content: '';
            }
            .pseudo-container div::after {
                content: '';
            }
            .pseudo-container div::first-line {
                content: '';
            }
            .pseudo-container div::first-letter {
                content: '';
            }
        `;

    if (before) {
      styles += `.pseudo-container div::before {`;
      Object.entries(before).forEach(([key, value]) => {
        styles += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`;
      });
      styles += `}`;
    }

    if (after) {
      styles += `.pseudo-container div::after {`;
      Object.entries(after).forEach(([key, value]) => {
        styles += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`;
      });
      styles += `}`;
    }

    if (firstLine) {
      styles += `.pseudo-container div::first-line {`;
      Object.entries(firstLine).forEach(([key, value]) => {
        styles += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`;
      });
      styles += `}`;
    }

    if (firstLetter) {
      styles += `.pseudo-container div::first-letter {`;
      Object.entries(firstLetter).forEach(([key, value]) => {
        styles += `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`;
      });
      styles += `}`;
    }

    return styles;
  };

  return (
    <Slot>
      <div className="pseudo-container">
        <style>{generatePseudoStyles()}</style>
        <div>{children}</div>
      </div>
    </Slot>
  );
};

export default Pseudo;
