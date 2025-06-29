# Practice katakana and hiragana with words from Wiktionary

https://practicekana.arjunsatarkar.net/

## Copying

Copyright &copy; 2025-present Arjun Satarkar. MIT License; see `LICENSE.txt`.

`data/kana_words.json` is a sorted list of words based on the [English Wiktionary](https://en.wiktionary.org/wiki/Wiktionary:Main_Page). In some jurisdictions, such a dataset may qualify as intellectual property; if it does, that file is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode.txt) and is &copy; the Wiktionary contributors who created the entries for each of the words included. This project is designed to work with any list of words and is not coupled to or built on the particular wordlist, which is included only as a sample or option; therefore, the share-alike provision does not apply to the project's source code or other files, but may or may not apply to the deployed site if built with this wordlist.

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
