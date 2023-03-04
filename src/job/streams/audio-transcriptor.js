import { v1p1beta1 as speech } from '@google-cloud/speech'
import { STREAMING_RECOGNIZE_CONFIG } from '../../settings'

export const audioTranscriptor = new speech.SpeechClient()
  .streamingRecognize(STREAMING_RECOGNIZE_CONFIG)
  .on('error', (error) => { console.log(`SPEECH CLIENT ERROR: ${error.message}`) })
