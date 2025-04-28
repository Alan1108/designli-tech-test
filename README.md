## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd <project-directory>
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

## Development

- #### Node version: v23.11.0
- #### Vite version: v6.2.6
- #### Used Dependencies

  - @types/lodash: ^4.17.16,
  - @types/node: ^22.14.1,
  - chart.js: ^4.4.9,
  - chartjs-adapter-date-fns: ^3.0.0,
  - date-fns: ^4.1.0,
  - finnhub-ts: ^1.0.7,
  - lodash: ^4.17.21,
  - react: ^19.0.0,
  - react-chartjs-2: ^5.3.0,
  - react-dom: ^19.0.0,
  - react-icons: ^5.5.0,
  - styled-components: ^6.1.17,
  - vite-plugin-pwa: ^1.0.0

1. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   This command starts a local development server and opens the app in your default browser. Any changes you make to the code will automatically reflect in the browser thanks to Hot Module Replacement (HMR).

## Building for Production

1. **Build the application:**

   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

   This command creates an optimized production build of your application in the `dist` directory.

## Previewing the Production Build

1.  **Preview the production build locally:**

    ```bash
    npm run preview
    # or
    yarn preview
    # or
    pnpm preview
    ```

    This command starts a local server that serves the production build, allowing you to test it before deployment.

## Environment Variables

To make this app work, you need to add environment variables.

1.  **Create a `.env` file** in the root of your project.
2.  **Add your environment variables** in the `.env` file. For example:

    ```
    VITE_API_URL=<API url>
    VITE_APP_NAME=<API Key>
    ```

## Folder Structure

The project structure is organized as follows:

```
designli-tech-test/
├── public/                    # Static assets (e.g., images, fonts)
├── src/                       # Source code
│   ├── assets/                # Static assets (e.g., images, fonts)
│   ├── components/            # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── modules/               # A set of reusable components
│   ├── pages/                 # Page-level components
│   ├── services/              # API interaction and data fetching
│   ├── utils/                 # Utility functions
│   ├── App.tsx                # Main application component
│   ├── index.css              # Global styles
│   ├── main.tsx               # Entry point of the application
│   └── vite-env.d.ts          # TypeScript environment declarations
├── .env                       # Environment variables
├── .eslintrc.config.js        # ESLint configuration
├── .gitignore                 # Git ignore file
├── index.html                 # HTML template
├── manifest.json              # Manifest file for web app
├── package.json               # Project dependencies and scripts
├── pnpm-lock.yaml             # pnpm lock file
├── README.md                  # Project documentation
├── service-worker.js          # Service worker for webpush notifications
├── tsconfig.json              # TypeScript configuration
├── tsconfig.node.json         # TypeScript configuration for Node.js
└── vite.config.ts             # Vite configuration
```
## [Video Overview](https://drive.google.com/file/d/1EUVhEItt28LV31HNSFfiw-W4JUSzsK3A/view?usp=sharing)
 
