#!/usr/bin/env python3
from pathlib import Path
import gzip
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
EXCLUDED_CATEGORIES = {
    "Japanese derogatory terms",
    "Japanese ethnic slurs",
    "Japanese misspellings",
    "Japanese offensive terms",
    "Japanese swear words",
    "Japanese vulgarities",
}


def log_status(lines_read_num: int, kana_words_added_num: int):
    sys.stderr.write(
        f"Read {lines_read_num} lines; found {kana_words_added_num} kana words.\r"
    )


with gzip.open(RAW_DATA_FILE_PATH, "r") as raw_data_file:
    words = set()

    i = 0
    for i, line in enumerate(raw_data_file):
        if i % UPDATE_STATUS_EVERY_WORDS == 0:
            log_status(i, len(words))

        word_data = json.loads(line)
        try:
            word = word_data["word"]
            lang_code = word_data["lang_code"]
            has_romanization = bool(
                next(
                    (
                        form["form"]
                        for form in word_data["forms"]
                        if "romanization" in form["tags"]
                    ),
                    None,
                )
            )
            has_gloss = bool(word_data["senses"][0]["glosses"])
            categories = word_data["categories"]
        except KeyError:
            continue

        if not (
            lang_code == "ja"
            and has_gloss
            and has_romanization
            and all(c in KANA for c in word)
            and all(category not in EXCLUDED_CATEGORIES for category in categories)
        ):
            continue

        words.add(word)
    log_status(i, len(words))

with open(OUT_PATH, "w") as out_file:
    json.dump(
        sorted(words),
        out_file,
        ensure_ascii=False,
        separators=(",", ":"),
    )

# Prevent our progress message from being overwritten by the shell prompt
sys.stderr.write("\n")
