#!/usr/bin/env python3
from pathlib import Path
import gzip
import html
import json
import sys


def char_ranges(*args: tuple[str, str]) -> set[str]:
    result = set()
    for first, last in args:
        result |= set(chr(c) for c in range(ord(first), ord(last) + 1))
    return result


KANA = char_ranges(
    ("\N{KATAKANA-HIRAGANA DOUBLE HYPHEN}", "\N{KATAKANA DIGRAPH KOTO}"),
    ("\N{HIRAGANA LETTER SMALL A}", "\N{HIRAGANA LETTER SMALL KE}"),
    ("\N{COMBINING KATAKANA-HIRAGANA VOICED SOUND MARK}", "\N{HIRAGANA DIGRAPH YORI}"),
)
OUT_PATH = Path("data/kana_words.json")
RAW_DATA_FILE_PATH = Path("data/raw-wiktextract-data.jsonl.gz")
UPDATE_STATUS_EVERY_WORDS = 10_000

with gzip.open(RAW_DATA_FILE_PATH, "r") as raw_data_file:
    word_definitions = {}
    lines_read_num = 0
    kana_words_added_num = 0

    for line in raw_data_file:
        lines_read_num += 1
        if lines_read_num % UPDATE_STATUS_EVERY_WORDS == 0:
            sys.stderr.write(
                f"Read {lines_read_num} lines; found {kana_words_added_num} kana words.\r"
            )

        word_data = json.loads(line)
        try:
            word = word_data["word"]
            lang_code = word_data["lang_code"]
        except KeyError:
            continue

        if not (lang_code == "ja" and all(c in KANA for c in word)):
            continue

        try:
            glosses = [sense["raw_glosses"][0] for sense in word_data["senses"]]
        except KeyError:
            continue

        definitions_html = "<ul>"
        for gloss in glosses:
            definitions_html += f"<li>{html.escape(gloss, quote=False)}</li>"
        definitions_html += "</ul>"

        if word not in word_definitions:
            word_definitions[word] = definitions_html
            kana_words_added_num += 1

with open(OUT_PATH, "w") as out_file:
    json.dump(word_definitions, out_file, ensure_ascii=False, indent=0, sort_keys=True)

# Prevent our progress message from being overwritten by the shell prompt
sys.stderr.write("\n")
