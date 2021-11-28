@secure()
param repositoryToken string
param location string = resourceGroup().location
param webAppSku string
param webAppSkuCode string
param appLocation string
param apiLocation string
param repositoryUrl string
param branch string
param appArtifactLocation string
param appSettings object

module cognitiveServiceAccounts 'cognitiveservices.bicep' = {
  name: 'cognitiveServiceAccounts'
  scope: resourceGroup()
  params: {
    location: location
  }
}

module staticWebApp 'staticwebapp.bicep' = {
  name: 'staticWebApp'
  scope: resourceGroup()
  params: {
    sku: webAppSku
    skuCode: webAppSkuCode
    appLocation: appLocation
    apiLocation: apiLocation
    appArtifactLocation: appArtifactLocation
    repositoryUrl: repositoryUrl
    branch: branch
    appSettings: appSettings
    location: location
    repositoryToken: repositoryToken
  }
}
