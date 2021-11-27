param name string
param location string = resourceGroup().location
param sku string
param skucode string
param repositoryUrl string
param branch string

@secure()
param repositoryToken string
param appLocation string
param apiLocation string
param appArtifactLocation string
param appSettings object

resource staticSite 'Microsoft.Web/staticSites@2021-02-01' = {
  name: name
  location: location
  properties: {
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
    name: skucode
  }
}

resource staticSiteSettings 'Microsoft.Web/staticSites/config@2021-02-01' = {
  parent: staticSite
  name: 'appsettings'
  properties: appSettings
}
