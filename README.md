# Evenia

This project implements an Events Management Service. Anyone can list and search events. Users can create accounts to create and manage their own events.

It consists of a Next.js frontend and a RESTful API backend.

## Setup Clerk

We'll be using Clerk for user management. Users can sign up using their email or their MetaMask account.

1. Create a new application

  - Go to your Clerk account and create a new application.
  - In the sign in options of the new application turn the `Email` and `MetaMask` options on.
  - Turn the rest of the options off.

2. Configure email address attribute

  - On Clerk's menu go to **Configure** » **User & Authentication** » **Email, Phone, Username**.
  - On the **Contact Information** card click the settings icon for the **Email address**.
  - Turn `Require`, `Sign-in` and `Verify at sign-up` on.
  - Under **Verification methods** turn `Email verification link` off and `Email verification code` on.
  - Press Continue.
  - On the **Authentication strategies** card turn `Email verification code` on. Turn the rest of the options off.

3. Generate a JWT template

  - On Clerk's menu go to **Configure** » **JWT Templates**.
  - Create a new `Blank` template.
  - Set `Claims` to
    ```json
    {
      "aud": "evenia.com"
    }
    ```
  - Copy the value of the `Issuer` attribute. You'll need this later to setup your stack.

4. Get your API keys

  - On Clerk's menu go to **Configure** » **Developers** » **API Keys**.
  - On the **Quick Copy** card select `Next.js`.
  - Copy the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` variable values. You'll need this later to setup your secrets.

## Setup your development environment

```bash
cd packages/core
npm run generate-migration
```

```bash
pnpm sst secrets set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY <COPIED FROM CLERK DEVELOPERS API KEYS>
pnpm sst secrets set CLERK_SECRET_KEY <COPIED FROM CLERK DEVELOPERS API KEYS>
```

You can run

```bash
pnpm sst secrets list
```

to see the secrets.
