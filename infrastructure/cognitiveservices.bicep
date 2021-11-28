param location string
param computerVisionAccountName string
param speechServiceAccountName string
param translatorAccountName string

resource computerVisionAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: computerVisionAccountName
  location: location
  kind: 'ComputerVision'
  sku: {
    name: 'S1'
  }
}

resource speechServiceAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: speechServiceAccountName
  location: location
  kind: 'SpeechServices'
  sku: {
    name: 'F0'
  }
}

resource translatorAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: translatorAccountName
  location: location
  kind: 'Translator'
  sku: {
    name: 'F0'
  }
}

output computerVisionAcountKey object = listKeys(computerVisionAccountName, '2021-04-30')
output speechServiceAccountKey object = listKeys(speechServiceAccountName, '2021-04-30')
output translatorAccountKey object = listKeys(translatorAccountName, '2021-04-30')
