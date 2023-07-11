import { v1p1beta1 as speech } from '@google-cloud/speech'

export const audioTranscriptor = ({ config }) => new speech.SpeechClient()
  .streamingRecognize(config)
  .on('error', (error) => { console.log(`SPEECH CLIENT ERROR: ${error.message}`) })
