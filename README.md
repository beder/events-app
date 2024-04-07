# Evenia

This project implements an Events Management Service where anyone can list and search events. Users have the option to create accounts to manage their own events.

It comprises a Next.js frontend and an AWS Lambda RESTful API backend, leveraging SST for infrastructure management.

## Setting up SST prerequisites

Ensure you have at least [Node.js 18](https://nodejs.org/) and[ npm 7](https://www.npmjs.com/)installed. Additionally, you must have an AWS account and locally configured [AWS credentials](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file).

## Setting up Clerk

Evenia employs Clerk for user management, allowing users to sign up using either their email or MetaMask account.

1. Create a new application:

    - Visit your [Clerk dashboard](https://dashboard.clerk.com) and create a new application.

    - Enable the `Email` and `MetaMask` sign-in options for the new application.

    - Disable all other options.

2. Configure email address attribute:

    - Navigate Clerk's menu: **Configure** » **User & Authentication** » **Email, Phone, Username**.

    - Under the **Contact Information** card, enable `Require`, `Sign-in` and `Verify at sign-up` for the **Email address**.

    - Within **Verification methods**, disable `Email verification link` and enable `Email verification code`.

    - On the **Authentication strategies** card enable `Email verification code` and disable all other options.

3. Generate a JWT template:

    - In Clerk's menu, navigate to **Configure** » **JWT Templates**.

    - Create a new `Blank` template.

    - Configure `Claims` as follows

      ```json
      {
        "aud": "evenia.com"
      }
      ```

    - Note the `Issuer` attribute value, which will be required later for stack setup.

4. Obtain your API keys:

    - Under Clerk's menu, navigate to **Configure** » **Developers** » **API Keys**.

    - In the **Quick Copy** card, select `Next.js`.

    - Copy the values of `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`, which will be necessary for setting up your secrets.

## Running the app locally

To run Evenia locally, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone git@github.com:beder/events-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd events-app
    ```

3. Duplicate the `.env.example` file in the root directory to create `.env.local`:

    ```bash
    cp .env.example .env.local
    ```

    Inside `.env.local`, replace the value of `JWT_AUTHORIZER_ISSUER` with the `Issuer` from Clerk's JWT template.

4. Duplicate the `.env.example` file in the `packages/frontend` directory to create `.env.local`:

    ```bash
    cp packages/frontend/.env.example packages/frontend/.env.local
    ```

    Inside `packages/frontend/.env.local`, replace the values of `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` with Clerk's API keys.

5. Start the backend:

    ```bash
    npm run dev
    ```

6. Start the frontend:

    ```bash
    cd packages/frontend && npm run dev
    ```

    The app will be accessible at http://localhost:3000