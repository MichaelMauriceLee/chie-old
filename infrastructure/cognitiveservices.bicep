param location string
param computerVisionAccountName string
param speechServiceAccountName string
param translatorAccountName string

resource computerVisionAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: computerVisionAccountName
  location: location
  kind: 'ComputerVision'
}

resource speechServiceAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: speechServiceAccountName
  location: location
  kind: 'SpeechService'
}

resource translatorAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: translatorAccountName
  location: location
  kind: 'Translator'
}
