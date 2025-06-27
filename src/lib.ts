export type KanaObj = { katakana: string, hiragana: string };

const kanaObj = (katakana: string, hiragana: string): KanaObj => Object.freeze({ katakana: katakana, hiragana: hiragana });

export const KANA_ROWS = Object.freeze({
    "a": kanaObj("ア", "あ"),
    "ka": kanaObj("カ", "か"),
    "sa": kanaObj("サ", "さ"),
    "ta": kanaObj("タ", "た"),
    "na": kanaObj("ナ", "な"),
    "ha": kanaObj("ハ", "は"),
    "ma": kanaObj("マ", "ま"),
    "ya": kanaObj("ヤ", "や"),
    "ra": kanaObj("ラ", "ら"),
    "wa": kanaObj("ワ", "ヲ"),
    "n": kanaObj("ン", "ん"),
});
