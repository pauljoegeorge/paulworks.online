# Paul Works Online

Personal portfolio and blog built with React and Vite. Money Prophet lives in a separate repository; this app retains only forwarding routes for older links.

## Development

Use Node.js 24.15 or later.

```bash
npm ci
cp .env.sample .env.development.local
npm start
```

Open http://localhost:3002. Optional `VITE_GTM_CONTAINER_ID` configures analytics. `VITE_MONEY_PROPHET_URL` overrides the public destination for old app URLs; use `http://localhost:3001` for local development with the standalone app.

## Commands

- `npm run build`: production output in `build/`.
- `npm run preview`: preview the production build.
- `npm run lint`: lint source files.

## Structure

`src/containers/Home` contains the portfolio; `src/containers/Blog` contains the blog. `src/pages` defines page wrappers and routes. The shared layout, theme context, and portfolio helpers remain here. No financial API client, authentication, expense screens, budget screens, or maps are included.

## Migration

Former Money Prophet paths, including `/dashboard`, `/sign_in`, and `/expenses`, forward to the standalone site while preserving query parameters and hashes. Deploy the standalone app before publishing this portfolio build. Actual hosting identifiers and credentials belong in private deployment configuration.

## Deployment configuration

`npm run deploy:prod` builds and uploads using a privately configured `S3_BUCKET`; optional `CLOUDFRONT_DISTRIBUTION_ID` triggers invalidation. Use standard AWS credentials and optional `AWS_PROFILE` outside tracked source. No notification credentials are embedded in the deployment script.
