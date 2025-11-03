# CSWX

A modern, modular web application built with Vite, React, TypeScript, and TailwindCSS. This project provides a responsive application shell with dark/light theme support, ready for adding utility tools and features.

## Features

- ⚡️ **Vite** - Lightning-fast development and build tooling
- ⚛️ **React 19** - Latest React with modern hooks and patterns
- 🎨 **TailwindCSS** - Utility-first CSS framework with custom theming
- 🌓 **Dark/Light Mode** - Persistent theme toggle with localStorage
- 📱 **Responsive Design** - Mobile-first responsive layout
- 🧭 **React Router** - Client-side routing
- 🧪 **Vitest + React Testing Library** - Comprehensive testing setup
- 🔍 **ESLint + Prettier** - Code quality and formatting
- 🐶 **Husky + lint-staged** - Pre-commit hooks for code quality
- 🚀 **GitHub Actions** - CI/CD pipeline with automated deployment
- 📄 **GitHub Pages** - Automated static site deployment

## Project Structure

```
cswx/
├── .github/
│   └── workflows/          # GitHub Actions workflows (CI/CD)
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── AppShell.tsx    # Main application layout
│   │   ├── Header.tsx      # App header with branding
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── ThemeToggle.tsx # Dark/light mode toggle
│   ├── context/            # React context providers
│   │   └── ThemeContext.tsx # Theme state management
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   │   └── HomePage.tsx    # Main landing page
│   ├── test/               # Test utilities and setup
│   │   └── setup.ts        # Vitest configuration
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   ├── App.test.tsx        # App smoke tests
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and CSS variables
├── .husky/                 # Git hooks
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # TailwindCSS configuration
├── eslint.config.js        # ESLint configuration
└── .prettierrc             # Prettier configuration
```

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **pnpm** 10+ (installation instructions below)

## Getting Started

### 1. Install pnpm (if not already installed)

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Or via npm:

```bash
npm install -g pnpm
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

### Development

- `pnpm dev` - Start development server with hot module replacement
- `pnpm build` - Build for production (TypeScript check + Vite build)
- `pnpm preview` - Preview production build locally

### Testing

- `pnpm test` - Run all tests once
- `pnpm test:watch` - Run tests in watch mode

### Code Quality

- `pnpm lint` - Lint code with ESLint (fails on warnings)
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

### Deployment

- `pnpm deploy` - Build and deploy to GitHub Pages

## Theme System

The application includes a robust dark/light theme system:

- **Toggle Button**: Located in the header, allows users to switch themes
- **Persistence**: Theme preference is saved to localStorage
- **System Preference**: Respects user's OS-level dark mode preference on first visit
- **CSS Variables**: Uses CSS custom properties for easy theming
- **TailwindCSS Integration**: Configured with `class` strategy for dark mode

### CSS Variables

The theme system uses CSS variables defined in `src/index.css`:

```css
:root {
  --color-background: #ffffff;
  --color-foreground: #171717;
  --color-border: #e5e5e5;
  --color-sidebar: #f5f5f5;
  --color-hover: #fafafa;
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
}

.dark {
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
  /* ... other dark mode colors */
}
```

## Testing

The project uses Vitest and React Testing Library for testing:

- **Unit Tests**: Component testing with React Testing Library
- **Web Crypto Mocking**: Setup includes mocks for Web Crypto APIs
- **Coverage**: Run tests with coverage reporting

Example test:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('CSWX')).toBeInTheDocument();
  });
});
```

## Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

1. **Automatic Deployment**: Push to `main` or `master` branch triggers deployment
2. **Manual Deployment**: Run `pnpm deploy` locally
3. **Base Path**: Configured for repository pages (`/cswx/`)

### Configuration

- `vite.config.ts`: Sets base path to `/cswx/` for production
- `src/main.tsx`: BrowserRouter basename set to `/cswx`
- `.github/workflows/deploy.yml`: Automated deployment workflow

## Code Quality & Git Hooks

### Pre-commit Hooks

Husky and lint-staged ensure code quality before commits:

- **ESLint**: Automatically fixes linting issues
- **Prettier**: Formats code according to project standards
- **Staged Files Only**: Only processes files being committed

Configuration in `.lintstagedrc`:

```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,jsx,json,css,md}": ["prettier --write"]
}
```

### ESLint Configuration

- TypeScript ESLint rules
- React and React Hooks rules
- TailwindCSS class ordering
- No unused variables (with underscore prefix exception)

### Prettier Configuration

- Single quotes
- 2-space indentation
- Semicolons
- TailwindCSS class sorting plugin

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow existing code style and conventions
4. **Run tests**: Ensure `pnpm test` passes
5. **Run linting**: Ensure `pnpm lint` passes
6. **Commit changes**: Pre-commit hooks will run automatically
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Code Style Guidelines

- Use functional components with hooks
- Prefer named exports for components
- Use TypeScript strict mode
- Follow existing file structure conventions
- Write tests for new features
- Use CSS variables for theming
- Keep components small and focused

## CI/CD Pipeline

### Continuous Integration (`.github/workflows/ci.yml`)

Runs on every push and pull request:

1. Checkout code
2. Setup pnpm and Node.js
3. Install dependencies
4. Lint code
5. Run tests
6. Build application
7. Upload build artifacts

### Continuous Deployment (`.github/workflows/deploy.yml`)

Runs on push to main/master:

1. Build application
2. Deploy to GitHub Pages
3. Update live site

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features required
- No IE11 support

## License

ISC

## Future Enhancements

This project provides a foundation for adding:

- 🛠️ Utility tools and calculators
- 📊 Data visualization components
- 🔌 API integrations
- 💾 State management (if needed)
- 🎯 More page routes and features

## Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Vite cache
rm -rf node_modules/.vite
```

### ESLint Errors

```bash
# Auto-fix most issues
pnpm lint:fix

# Check for remaining issues
pnpm lint
```

### Test Failures

```bash
# Run tests in watch mode to debug
pnpm test:watch

# Clear test cache
pnpm vitest --clearCache
```

## Support

For issues, questions, or contributions, please open an issue on GitHub.
