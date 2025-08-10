# ACS Web

A modern web frontend for the ACS (Access Control System) application.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd acs-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/           # Source code
│   ├── components/    # Reusable UI components
│   ├── pages/         # Application pages/routes
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── styles/        # Global styles and themes
│   └── types/         # TypeScript type definitions
├── public/        # Static assets
├── .env.example   # Environment variables template
└── README.md      # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run test` - Run tests
- `npm run type-check` - Run TypeScript type checking

## Technologies

- React 18
- TypeScript
- Next.js (or your preferred framework)
- Tailwind CSS (or your preferred styling solution)

## Contributing

Please read our contributing guidelines and code of conduct before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
