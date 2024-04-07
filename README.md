# Evenia

This project implements an Events Management Service. Anyone can list and search events. Users can create accounts to create and manage their own events.

It consists of a Next.js frontend and an AWS Lambda RESTful API backend and uses SST to manage the infrastructure.

## Setup SST prerequisites

You'll need at least [Node.js 18](https://nodejs.org/) and[ npm 7](https://www.npmjs.com/). You also need to have an AWS account and [AWS credentials configured locally](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file).


## Setup Clerk

Evenia uses Clerk for user management. Users can sign up using their email or their MetaMask account.

1. Create a new application

    - Go to your [Clerk dashboard](https://dashboard.clerk.com) and create a new application.

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

## Run the app locally

To run Evenia locally, follow these steps:

1. Clone this repository to your local machine

    ```bash
    git clone git@github.com:beder/events-app.git
    ```

2. Navigate to the project directory

    ```bash
    cd events-app
    ```

3. Copy the `.env.example` file in the root directory to create the `.env.local` file.

    ```bash
    cp .env.example .env.local
    ```

    Inside `.env.local`, replace the value of the `JWT_AUTHORIZER_ISSUER` variable with the `Issuer` from Clerk's JWT template.

4. Copy the `.env.example` file in the `packages/frontend` directory to create the `.env.local` file.

    ```bash
    cp packages/frontend/.env.example packages/frontend/.env.local
    ```

    Inside `packages/frontend/.env.local`, replace the values of the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` variables with Clerk's API keys.

5. Start the backend.

    ```bash
    npm run dev
    ```

6. Start the frontend.

    ```bash
    cd packages/frontend && npm run dev
    ```

    The app is now running at http://localhost:3000