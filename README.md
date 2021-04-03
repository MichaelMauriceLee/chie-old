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
        "https://brave-grass-06ab5cd1e.azurestaticapps.net"
    ]
}
```

You can now use https://brave-grass-06ab5cd1e.azurestaticapps.net/ or run the next.js app locally.

Make sure to keep Anki running in the background as you use the site.

## How to run this repo locally

This repo contains two components, both need to be running at the same time to use locally.

```bash
/api - Azure Functions project, runs on localhost:7071

/client-api - Next js project, runs on localhost:3000
```

First, cd into /client-api and run the following commands to run the next.js project:

```bash
npm install
npm run dev
```

Next, cd into /api and create a file called 'local.settings.json' and copy the following contents into that file and save (make sure to replace the values in {} with their actual value):

```bash
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "JISHO_BASE_URL": {jisho_base_url},
    "CV_BASE_URL": {cv_base_url},
    "CV_KEY": {cv_key}}
  }
}
```

Make sure to download, install and run Azure Storage Emulator.  Then run the following commands in the Azure Functions project root folder:

```bash
npm install
npm start
```

Now navigate to localhost:3000 in your browser to use the site locally.
