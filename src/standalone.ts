import klalot from './klalot.json';

const klalotList = klalot.words;

/**
 * Used to determine if given word is profane or not.
 *
 * @param word - 1 word string for profanity determination
 * @returns `true` if the word is profane or `false` if it't not
 */
export const isWordProfane = (word: string): boolean => {
  return klalotList.some((profaneWord) => {
    if (word.search(profaneWord) !== -1) {
      return true;
    }

    return false;
  });
};

/**
 * censores the given text and returns it
 *
 * @param text - text to censor
 * @returns the censored text
 */
export const censor = (text: string, replacementSymbol = '*'): string => {
  return text
    .split(/\s+/g)
    .map((word) => {
      return isWordProfane(word) ? Array(word.length + 1).join(replacementSymbol) : word;
    })
    .join(' ');
};
