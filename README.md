# Practice katakana and hiragana with words from Wiktionary

## Deployment

```
curl -o 'data/raw-wiktextract-data.jsonl.gz' 'https://kaikki.org/dictionary/raw-wiktextract-data.jsonl.gz'

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

./extract_kana_words.py # Creates data/kana_words.json
# You can delete data/raw-wiktextract-data.jsonl.gz now if you want

# TODO: run the webserver
```
