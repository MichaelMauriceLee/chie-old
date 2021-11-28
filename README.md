## Setup

Follow the instructions to install AnkiConnect here:
https://foosoft.net/projects/anki-connect/

After installing, replace the AnkiConnect config with the following:
```bash
{
    "apiKey": null,
    "apiLogPath": null,
    "webBindAddress": "127.0.0.1",
    "webBindPort": 8765,
    "webCorsOrigin": "http://localhost",
    "webCorsOriginList": [
        "http://localhost",
        "http://localhost:3000",
        "https://www.chie.app"
    ]
}
```

You can now use https://www.chie.app/ or run the next.js app locally.

Make sure to keep Anki running in the background as you use the site.

## How to run this repo locally

This repo contains two components, both need to be running at the same time to use locally.

```bash
/api - Azure Functions project, runs on localhost:7071

/client-app - Next js project, runs on localhost:3000
```

First, cd into /client-app and run the following commands to run the next.js project:

```bash
yarn install
yarn dev
```

Next, cd into /api and create a file called 'local.settings.json' and copy the following contents into that file and save (make sure to replace the values in {} with their actual value):

```bash
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "CV_NAME": {cv_name},
    "CV_KEY": {cv_key},
    "SPEECH_REGION": {speech_region},
    "SPEECH_KEY": {speech_key},
    "TRANSLATION_REGION": {translation_region},
    "TRANSLATION_KEY": {translation_key}
  }
}
```

Make sure to download, install and run Azurite (you need it to emulate storage needed to store the compiled functions).  Then run the following commands in the Azure Functions project root folder:

```bash
yarn install
yarn start
```

Now navigate to localhost:3000 in your browser to use the site locally.

## Storybook

Storybook is an open source tool that allows for building UI components and pages in isolation, as well as acting as an interactive UI style guide.

Navigate to client-app and run the following command:

```bash
yarn storybook
```
