# Practice katakana and hiragana with words from Wiktionary

https://kanapractice.arjunsatarkar.net/

## Copying

See `LICENSE.txt`.

## Building

Dev:
```
npm run dev
```

Production:
```
npm run build
```

Rebuilding the wordlist:
```
curl -o 'data/raw-wiktextract-data.jsonl.gz' 'https://kaikki.org/dictionary/raw-wiktextract-data.jsonl.gz'
./extract_kana_words.py # Generates data/kana_words.json
```
