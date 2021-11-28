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
param computerVisionAccountName string
param speechServiceAccountName string
param translatorAccountName string
param webAppName string

module cognitiveServiceAccounts 'cognitiveservices.bicep' = {
  name: 'cognitiveServiceAccounts'
  scope: resourceGroup()
  params: {
    location: location
    computerVisionAccountName: computerVisionAccountName
    speechServiceAccountName: speechServiceAccountName
    translatorAccountName: translatorAccountName
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
    name: webAppName
  }
}
