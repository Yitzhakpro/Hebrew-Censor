import { censor, isWordProfane } from '../src';
import klalot from '../src/klalot.json';

describe('Standalone Functions', () => {
  describe('isWordProfane', () => {
    it('Should return false if the word is not profane', () => {
      const mockWord = 'למה';

      const isProfane = isWordProfane(mockWord);

      expect(isProfane).not.toBeTruthy();
    });

    it('Should return true if the word is profane', () => {
      const profaneWord = klalot.words[2];

      const isProfane = isWordProfane(profaneWord);

      expect(isProfane).toBeTruthy();
    });
  });

  describe('censor', () => {
    it('Should return the original sentence if not profane words found', () => {
      const mockSentence = 'מה נשמע חבר?';

      const censoredSentence = censor(mockSentence);

      expect(censoredSentence).toBe(mockSentence);
    });

    it('Should return censored word with amout of replacement symbol same as word length', () => {
      const profaneWord = klalot.words[0];
      const replacementSymbol = '*';

      const censoredWord = censor(profaneWord, replacementSymbol);
      const expectedCensored = Array(profaneWord.length + 1).join(replacementSymbol);

      expect(expectedCensored).toBe(censoredWord);
    });

    it('Should return censored sentence', () => {
      const profaneWord = klalot.words[0];
      const replacementSymbol = '*';
      const mockSentence = 'מה קורה';
      const profaneSentence = mockSentence + ' ' + profaneWord;

      const censoredSentence = censor(profaneSentence, replacementSymbol);
      const expectedCensored =
        mockSentence + ' ' + Array(profaneWord.length + 1).join(replacementSymbol);

      expect(censoredSentence).toBe(expectedCensored);
    });
  });
});
