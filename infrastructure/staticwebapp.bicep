param sku string
param skuCode string
param repositoryUrl string
param branch string
param name string

@secure()
param repositoryToken string

param appLocation string
param apiLocation string
param appArtifactLocation string
param appSettings object

param location string

resource staticWebApp 'Microsoft.Web/staticSites@2021-02-01' = {
  name: name
  location: location
  properties: {
    provider: 'GitHub'
    repositoryUrl: repositoryUrl
    branch: branch
    repositoryToken: repositoryToken
    buildProperties: {
      appLocation: appLocation
      apiLocation: apiLocation
      appArtifactLocation: appArtifactLocation
    }
  }
  sku: {
    tier: sku
    name: skuCode
  }
}

resource staticWebAppSettings 'Microsoft.Web/staticSites/config@2021-02-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: appSettings
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: 'chiecoreappinsights'
  location: location
  kind: 'web'
}

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2021-06-01' = {
  name: 'chiecoreloganalytics'
  location: location
}
