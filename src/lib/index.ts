export type KanaKind = "katakana" | "hiragana";
export type KanaRowName = "a" | "ka" | "sa" | "ta" | "na" | "ha" | "ma" | "ya" | "ra" | "wa" | "n";

function charRange(start: string, end: string) {
    if (!([...start].length === 1 && [...end].length === 1)) {
        throw new Error("charRange args must be strings with one code point")
    }

    let result: string[] = [];
    for (let i = start.codePointAt(0)!; i <= end.codePointAt(0)!; ++i) {
        result.push(String.fromCodePoint(i));
    }
    return Object.freeze(result);
}

export const KANA_ROWS: Readonly<Record<KanaKind, Readonly<Record<KanaRowName, readonly string[]>>>> = Object.freeze({
    katakana: Object.freeze({
        a: charRange("ァ", "オ"),
        ka: charRange("カ", "ゴ"),
        sa: charRange("サ", "ゾ"),
        ta: charRange("タ", "ド"),
        na: charRange("ナ", "ノ"),
        ha: charRange("ハ", "ポ"),
        ma: charRange("マ", "モ"),
        ya: charRange("ャ", "ヨ"),
        ra: charRange("ラ", "ロ"),
        wa: Object.freeze(["ワ", "ヲ", "ヴ"]),
        n: Object.freeze(["ン"])
    }),
    hiragana: Object.freeze({
        a: charRange("ぁ", "お"),
        ka: charRange("か", "ご"),
        sa: charRange("さ", "ぞ"),
        ta: charRange("た", "ど"),
        na: charRange("な", "の"),
        ha: charRange("は", "ぽ"),
        ma: charRange("ま", "も"),
        ya: charRange("ゃ", "よ"),
        ra: charRange("ら", "ろ"),
        wa: Object.freeze(["わ", "を", "ゔ"]),
        n: Object.freeze(["ん"])
    })
});

  export type CompletedWordInfo = {
    word: string,
    computedAnswer: string,
    markedCorrect: boolean
  };
  