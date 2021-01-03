# LanguageGarbler

Static website that can translate text through multiple languages at a time.

## Usage

* Run `npm run build` to build the website (files are placed in `_site/`)
* Run `npm run build:prod` to create a production build of the website (files are placed in `_site/`)
* Run `npm run serve` to host the `_site/` folder locally
* Run `npm run start` from `functions/` to run the backend locally

## Environmental Variables

The following environmental variables are used:

* `API_BASE_PATH` - Used when building the website. Specifies the base path for all API requests.
* `AZURE_SECRET_KEY` - Used when running the functions. Specifies the API key for Azure Translation.
* `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` - Used when deploying the functions. Provided by Azure to deploy the functions to an existing functions app.
