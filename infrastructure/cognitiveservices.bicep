param location string

resource computerVisionAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: 'chiecorecv'
  location: location
  kind: 'ComputerVision'
}

resource speechServiceAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: 'chiecorespeech'
  location: location
  kind: 'Speech Service'
}

resource translatorAccount 'Microsoft.CognitiveServices/accounts@2021-04-30' = {
  name: 'chiecoretranslator'
  location: location
  kind: 'Translator'
}
