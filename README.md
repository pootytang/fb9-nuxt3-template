# Firebase 9, Nuxt 3, Pinia, Tailwindcss template

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## INFO
To use this you'll need to create a firebase probject and enable Google Auth and Email auth.
Index has a link for /testauth/ where a simple index page and a secret page lives to test functionality
Deployed successfully on Netlify

## Setup

Set the following in your .env file
```bash
FB_API_KEY="<your api key>"
FB_APP_ID="<your app id>"
FB_AUTH_DOMAIN="<your auth domain>"
FB_PROJECT_ID="<your project id>"
FB_STORAGE_BUCKET="<your storage bucket>"
FB_MESSAGE_SENDER_ID="<your message sender id>"
```

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
