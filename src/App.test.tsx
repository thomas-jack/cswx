import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('CSWX')).toBeInTheDocument();
    expect(screen.getByText('Welcome to CSWX')).toBeInTheDocument();
  });

  it('renders navigation and main content', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
