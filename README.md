# Practice katakana and hiragana with words from Wiktionary

## Deployment

```
curl -o 'data/raw-wiktextract-data.jsonl.gz' 'https://kaikki.org/dictionary/raw-wiktextract-data.jsonl.gz'

./extract_kana_words.py # Creates data/kana_words.json
# You can delete data/raw-wiktextract-data.jsonl.gz now if you want

npm install
# TODO: run the webserver
```
