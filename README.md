# Song Matcher
A song recognizer application based on lyrics transcription to identify in real time songs on HLS and RTMP video streaming.

## Instalation

1. Download and install [ffmepg software ](https://ffmpeg.org/).
2. Check node version
   
  ```shell
  nvm use
  nvm install
  ```

3. Install project dependencies
  
  ```shell
  npm install
  ```

3. Download [musiXmatch Dataset](http://millionsongdataset.com/sites/default/files/AdditionalFiles/mxm_dataset.db) and set path on `MXM_DATASET_PATH` in `settings.js`.

## Usage

This project uses the [Google Speech To Text API](https://cloud.google.com/speech-to-text), so you need to setup a [service account](https://cloud.google.com/iam/docs/service-account-overview) and get your [`GOOGLE_APPLICATION_CREDENTIALS`](https://cloud.google.com/docs/authentication/application-default-credentials).

Once the API has been set up you can run the project by providing the URL of the source stream you want.

Examples: 

RTMP: `STREAMING_URL=rtmp://localhost/live/festival`

HLS: `STREAMING_URL=http://localhost/hls/festival.m3u8`

1. Run project

```shell
STREAMING_URL={VALUE} GOOGLE_APPLICATION_CREDENTIALS={VALUE} npm start
```

2. Access `http://localhost:3000/` and check if the project is working as expected sending the following JSON data as SSE.

```json
{
   "timestamp":1684450212492,
   "ranking":[
      {
         "songId":"1590998",
         "score":76
      },
      {
         "songId":"2189093",
         "score":72
      },
      {
         "songId":"1974667",
         "score":62
      },
      {
         "songId":"2415317",
         "score":62
      },
      {
         "songId":"4965670",
         "score":62
      }
   ]
}
```


**Enviroment variables**

ENV VAR   | ABOUT | DEFAULT VALUE
--------- | ------ | ------------
SERVER_PORT | Server port | 3000
STREAMING_URL | Source streaming | ''
LANGUAGE_CODE | Transcription languange | pt-BR
SONG_MATCHER_WINDOW_SIZE | Number of words to be considered by the algorithm | 30
STREAM_SAMPLE_RATE_HERTZ | Source audio sampling rate | 48000
AUDIO_TRANSCRIPT_RESTART_INTERVAL | Transcription API restart time | 300000
