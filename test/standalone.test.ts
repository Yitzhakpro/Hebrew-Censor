import { censor, isWordProfane, Filter } from '../src';
import klalot from '../src/klalot.json';

describe('Standalone Functions', () => {
  describe('Filter class similarity', () => {
    describe('isWordProfane', () => {
      it('Should return false if the word is not profane', () => {
        const mockWord = 'למה';
        const hebrewFilter = new Filter();

        const isProfane = isWordProfane(mockWord);
        const classIsProfane = hebrewFilter.isWordProfane(mockWord);

        expect(isProfane).toBe(classIsProfane);
      });

      it('Should return true if the word is profane', () => {
        const profaneWord = klalot.words[2];
        const hebrewFilter = new Filter();

        const isProfane = isWordProfane(profaneWord);
        const classIsProfane = hebrewFilter.isWordProfane(profaneWord);

        expect(isProfane).toBe(classIsProfane);
      });
    });

    describe('censor', () => {
      it('Should return the original sentence if not profane words found', () => {
        const mockSentence = 'מה נשמע חבר?';
        const hebrewFilter = new Filter();

        const censoredSentence = censor(mockSentence);
        const classCensoredSentence = hebrewFilter.censor(mockSentence);

        expect(censoredSentence).toBe(mockSentence);
        expect(classCensoredSentence).toBe(mockSentence);
      });

      it('Should return censored word with amout of replacement symbol same as word length', () => {
        const profaneWord = klalot.words[0];
        const replacementSymbol = '*';
        const hebrewFilter = new Filter({ replacementSymbol });

        const censoredWord = censor(profaneWord, replacementSymbol);
        const classCensoredWord = hebrewFilter.censor(profaneWord);
        const expectedCensored = Array(profaneWord.length + 1).join(replacementSymbol);

        expect(expectedCensored).toBe(censoredWord);
        expect(classCensoredWord).toBe(censoredWord);
      });

      it('Should return censored sentence', () => {
        const profaneWord = klalot.words[0];
        const replacementSymbol = '*';
        const mockSentence = 'מה קורה';
        const profaneSentence = mockSentence + ' ' + profaneWord;
        const hebrewFilter = new Filter({ replacementSymbol });

        const censoredSentence = censor(profaneSentence, replacementSymbol);
        const classCensoredSentence = hebrewFilter.censor(profaneSentence);
        const expectedCensored =
          mockSentence + ' ' + Array(profaneWord.length + 1).join(replacementSymbol);

        expect(censoredSentence).toBe(expectedCensored);
        expect(classCensoredSentence).toBe(expectedCensored);
      });
    });
  });
});
