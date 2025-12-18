# Onboarding API Flow Documentation

This document maps the API calls initiating from the Frontend (`moz-client`) during the Onboarding flow to their corresponding Backend (`MozFlow-hub`) Controllers and Services.

## API Mapping Table

| FE Endpoint | BE Controller | BE Service Method |
| :--- | :--- | :--- |
| **`POST /auth/signup`** | `AuthController.signup`<br>(`auth/src/auth/auth.controller.ts`) | `AuthService.signup`<br>(`auth/src/auth/auth.service.ts`) |
| **`PATCH /users/survey01`** | `ClientsController.survey01`<br>(`users/src/clients/clients.controller.ts`) | `ClientsService.survey01`<br>(`users/src/clients/clients.service.ts`) |
| **`PATCH /users/survey02`** | `ClientsController.survey02`<br>(`users/src/clients/clients.controller.ts`) | `ClientsService.survey02`<br>(`users/src/clients/clients.service.ts`) |
| **`PATCH /users/survey03`** | `ClientsController.survey03`<br>(`users/src/clients/clients.controller.ts`) | `ClientsService.survey03`<br>(`users/src/clients/clients.service.ts`) |
| **`GET /auth/managed-social/getVerifySocialConnected`** | `ManagedPagesController.getVerifyConnected`<br>(`auth/src/social/managed-pages/managed-pages.controller.ts`) | `ManagedPagesService.verifySocialConnected`<br>(`auth/src/social/managed-pages/managed-pages.service.ts`) |
| **`GET /auth/line-oa/oauths`** | `AuthController.getOauths`<br>(`auth/src/auth/auth.controller.ts`) | `AuthService.getOAuthsTransform`<br>(`auth/src/auth/auth.service.ts`) |

## Component Context

*   **`SignUpViaEmail`**: Initiates `POST /auth/signup`.
*   **`SurveyStep01`**: Initiates `PATCH /users/survey01`.
*   **`SurveyStep02`**: Initiates `PATCH /users/survey02`.
*   **`SurveyStep03`**: Initiates `PATCH /users/survey03`.
*   **`SurveyStep04`**: Checks social connections via `getVerifySocialConnected` and `getOauths`.


node MozFlow-hub/auth/scripts/delete_test_user.js