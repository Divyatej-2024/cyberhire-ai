import React from 'react';
import { render, screen } from '@testing-library/react';
import { CyberPathDashboard } from './CyberPathDashboard';

describe('CyberPathDashboard', () => {
  it('renders the core mission control modules', () => {
    render(<CyberPathDashboard />);

    expect(screen.getByText(/Mission Control/i)).toBeInTheDocument();
    expect(screen.getByText(/Opportunity Radar/i)).toBeInTheDocument();
    expect(screen.getByText(/Visa Compass/i)).toBeInTheDocument();
    expect(screen.getByText(/Interview Coach/i)).toBeInTheDocument();
  });
});
