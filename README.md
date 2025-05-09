# PRLifterLoot

Welcome to PRLifterLoot - Your ultimate destination for premium lifting gear and apparel. This project is a modern e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS.

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/hvreynaldo/pr-lifter)

## Features
- Product browsing and filtering
- Shopping cart functionality
- User accounts and order history (Future)
- Responsive design for all devices
- Modern and clean UI

## Tech Stack
- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API (for Cart)
- **UI Enhancements**: Framer Motion, Lucide Icons

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   # HTTPS
   git clone https://github.com/your-username/prlifterloot.git
   # SSH
   # git clone git@github.com:your-username/prlifterloot.git
   cd prlifterloot
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   # yarn install
   ```

### Running the Development Server
```bash
npm run dev
# or
# yarn dev
```
Open your browser and navigate to `http://localhost:5173` (or the port specified in your Vite config).

### Building for Production
```bash
npm run build
# or
# yarn build
```
This will create a `dist` folder with the optimized production build.

### Linting
```bash
npm run lint
# or
# yarn lint
```

## Project Structure
```
prlifterloot/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context providers
│   ├── data/               # Mock data, constants
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page-level components
│   ├── styles/             # Global styles, Tailwind config
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point of the application
│   └── vite-env.d.ts       # Vite environment types
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Git ignore file
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # This file
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
└── tsconfig.node.json      # TypeScript Node configuration
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details (if applicable).
