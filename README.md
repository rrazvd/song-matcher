# Song Matcher
A song recognizer application based on lyrics transcription to identify in real time songs on HLS and RTMP video streaming.

**Enviroment variables**

ENV VAR   | ABOUT | DEFAULT VALUE
--------- | ------ | ------------
SERVER_PORT | Server port | 3000
STREAMING_URL | Source streaming | ''
LANGUAGE_CODE | Transcription languange | pt-BR
SONG_MATCHER_WINDOW_SIZE | Number of words to be considered by the algorithm | 30
STREAM_SAMPLE_RATE_HERTZ | Source audio sampling rate | 48000
AUDIO_TRANSCRIPT_RESTART_INTERVAL | Transcription API restart time | 300000
