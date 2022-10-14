import { isSingleWord } from './types';
import klalot from './klalot.json';

interface FilterConfig {
  replacementSymbol: string;
  freshStart: boolean;
  extraWords: string[];
  whiteList: string[];
}

export class Filter {
  private _replacementSymbol: string;
  private _wordsList: string[] = klalot.words;

  constructor(config: Partial<FilterConfig> = {}) {
    const { replacementSymbol = '*', freshStart = false, extraWords = [], whiteList = [] } = config;

    this._replacementSymbol = replacementSymbol;

    if (freshStart) {
      this._wordsList = [];
    } else if (extraWords.length > 0) {
      const updatedWordList = [...new Set([...this._wordsList, ...extraWords])];

      this._wordsList = updatedWordList;
    }
    if (whiteList.length > 0) {
      const filteredList = this._wordsList.filter((badWord) => {
        return !whiteList.includes(badWord);
      });

      this._wordsList = filteredList;
    }
  }

  public get replacementSymbol(): string {
    return this._replacementSymbol;
  }

  public set replacementSymbol(newReplacementSymbol) {
    this._replacementSymbol = newReplacementSymbol;
  }

  public get wordsList(): string[] {
    return this._wordsList;
  }

  /**
   * Returns if a a given word is profane or not
   *
   * @param word - the word to check
   * @returns true if the given word is profane, false if its not
   */
  public isWordProfane(word: string): boolean {
    return this._wordsList.some((badWord) => {
      if (word.search(badWord) !== -1) {
        return true;
      }

      return false;
    });
  }

  /**
   * Censoring given text and returning it.
   *
   * @param text - the text you want to censor
   * @returns censored version of entered text
   */
  public censor(text: string): string {
    return text
      .split(/\s+/g)
      .map((word) => {
        return this.isWordProfane(word)
          ? Array(word.length + 1).join(this._replacementSymbol)
          : word;
      })
      .join(' ');
  }

  /**
   * Adds new profane word/s to the profane words list.
   *
   * @param arg - single word or an array of words that will be considered profane
   */
  public addBadWords(arg: string | string[]): void {
    let updatedWordList: string[];

    if (isSingleWord(arg)) {
      updatedWordList = [...new Set([...this._wordsList, arg])];
    } else {
      updatedWordList = [...new Set([...this._wordsList, ...arg])];
    }

    this._wordsList = updatedWordList;
  }

  /**
   * Adds word/s to "White List/ Allowed Words" for the filter mechanism.
   *
   * @param arg - a word or array of words that will be removed(if they exist) from the profane words list
   */
  public addToWhiteList(arg: string | string[]): void {
    if (isSingleWord(arg)) {
      const indexOfWord = this._wordsList.indexOf(arg);
      if (indexOfWord === -1) {
        return;
      }

      this._wordsList.splice(indexOfWord, 1);
    } else {
      const filterdList = this._wordsList.filter((badWord) => {
        return !arg.includes(badWord);
      });

      this._wordsList = filterdList;
    }
  }
}
