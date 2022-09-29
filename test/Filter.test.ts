import { faker } from '@faker-js/faker';
import { Filter } from '../src/Filter';
import klalot from '../src/klalot.json';

describe('Hebrew Filter', () => {
  describe('Getters & Setters', () => {
    it('Should get the currnet replacement symbol', () => {
      const customReplacementSymbol = '&';
      const hebrewFilter = new Filter({ replacementSymbol: customReplacementSymbol });

      const filterReplacementSymbol = hebrewFilter.replacementSymbol;

      expect(filterReplacementSymbol).toBe(customReplacementSymbol);
    });

    it('Should set replacement symbol correctly', () => {
      const newReplacementSymbol = '%';
      const hebrewFilter = new Filter({ replacementSymbol: '*' });

      hebrewFilter.replacementSymbol = newReplacementSymbol;
      const currentReplacementSymbol = hebrewFilter.replacementSymbol;

      expect(currentReplacementSymbol).toBe(newReplacementSymbol);
    });

    it('Should return the profane wordlist', () => {
      const hebrewFilter = new Filter();

      const filterWordlist = hebrewFilter.wordsList;

      expect(filterWordlist).toBe(klalot.words);
    });
  });

  describe('Config', () => {
    describe('Defaults', () => {
      it('Should set by default the replacement symbol to: *', () => {
        const hebrewFilter = new Filter();

        const replacementSymbol = hebrewFilter.replacementSymbol;

        expect(replacementSymbol).toBe('*');
      });

      it("Should have default klalot if didn't ask for fresh start or added white list", () => {
        const hebrewFilter = new Filter();

        const filterKlalot = hebrewFilter.wordsList;

        expect(filterKlalot).toBe(klalot.words);
      });
    });

    describe('Implementation', () => {
      it('Should use given replacement symbol instead of default one', () => {
        const customSymbol = '%';
        const hebrewFilter = new Filter({ replacementSymbol: customSymbol });

        const replacementSymbol = hebrewFilter.replacementSymbol;

        expect(replacementSymbol).toBe(customSymbol);
      });

      it('Should init empty profane words list if freshStart was given', () => {
        const hebrewFilter = new Filter({ freshStart: true });

        const filterKlalot = hebrewFilter.wordsList;

        expect(filterKlalot).toHaveLength(0);
      });

      it('Should add extra words to the profane wordlist', () => {
        const randomAdjective = faker.word.adjective();
        const hebrewFilter = new Filter({ extraWords: [randomAdjective] });

        const filterKlalot = hebrewFilter.wordsList;

        expect(filterKlalot).toContain(randomAdjective);
      });

      it('Should not contain word that was given to white list', () => {
        const randomWhiteListWord = klalot.words[0];
        const hebrewFilter = new Filter({ whiteList: [randomWhiteListWord] });

        const filterKlalot = hebrewFilter.wordsList;

        expect(filterKlalot).not.toContain(randomWhiteListWord);
      });
    });
  });

  describe('Filter Methods', () => {
    describe('isProfane', () => {
      it('Should return false if the word is not profane', () => {
        const mockWord = 'למה';
        const hebrewFilter = new Filter();

        const isProfane = hebrewFilter.isProfane(mockWord);

        expect(isProfane).not.toBeTruthy();
      });

      it('Should return true if the word is profane', () => {
        const profaneWord = klalot.words[2];
        const hebrewFilter = new Filter();

        const isProfane = hebrewFilter.isProfane(profaneWord);

        expect(isProfane).toBeTruthy();
      });
    });

    describe('censor', () => {
      it('Should return the original sentence if not profane words found', () => {
        const mockSentence = 'מה נשמע חבר?';
        const hebrewFilter = new Filter();

        const censoredSentence = hebrewFilter.censor(mockSentence);

        expect(censoredSentence).toBe(mockSentence);
      });

      it('Should return censored word with amout of replacement symbol same as word length', () => {
        const profaneWord = klalot.words[0];
        const hebrewFilter = new Filter({ replacementSymbol: '*' });

        const censoredWord = hebrewFilter.censor(profaneWord);
        const expectedCensored = Array(profaneWord.length + 1).join(hebrewFilter.replacementSymbol);

        expect(expectedCensored).toBe(censoredWord);
      });

      it('Should return censored sentence', () => {
        const profaneWord = klalot.words[0];
        const mockSentence = 'מה קורה';
        const profaneSentence = mockSentence + ' ' + profaneWord;
        const hebrewFilter = new Filter({ replacementSymbol: '*' });

        const censoredSentence = hebrewFilter.censor(profaneSentence);
        const expectedCensored =
          mockSentence + ' ' + Array(profaneWord.length + 1).join(hebrewFilter.replacementSymbol);

        expect(censoredSentence).toBe(expectedCensored);
      });
    });

    describe('addBadWords', () => {
      it('Should add given single word to profane wordlist', () => {
        const newWord = faker.word.adjective();
        const hebrewFilter = new Filter();

        hebrewFilter.addBadWords(newWord);
        const filterKlalot = hebrewFilter.wordsList;

        expect(filterKlalot).toContain(newWord);
      });

      it('Should add given words to profane wordlist', () => {
        const newWords = Array.from({ length: 3 }, faker.word.adjective);
        const hebrewFilter = new Filter();

        hebrewFilter.addBadWords(newWords);
        const filterKlalot = hebrewFilter.wordsList;

        for (const badWord of newWords) {
          expect(filterKlalot).toContain(badWord);
        }
      });
    });

    describe('addToWhiteList', () => {
      it('Should not change filter word list if given word is not in profane wordlist', () => {
        const notInProfaneWords = 'kjnfkgjsngkjsfnkgdsf';
        const hebrewFilter = new Filter();

        const wordsBeforeAdd = hebrewFilter.wordsList;
        hebrewFilter.addToWhiteList(notInProfaneWords);
        const wordsAfterAdd = hebrewFilter.wordsList;

        expect(wordsBeforeAdd).toBe(wordsAfterAdd);
      });

      it('Should add a single word to white list', () => {
        const profaneWord = klalot.words[0];
        const sentence = 'מה קורה';
        const fullSentenceToCensor = sentence + ' ' + profaneWord;
        const hebrewFilter = new Filter();

        // checking that its not censoring after adding to whitelist
        hebrewFilter.addToWhiteList(profaneWord);
        const newFilterKlalot = hebrewFilter.wordsList;
        const newCensoredSentence = hebrewFilter.censor(fullSentenceToCensor);
        expect(newFilterKlalot).not.toContain(profaneWord);
        expect(newCensoredSentence).toBe(fullSentenceToCensor);
      });

      it('Should add given words to whitelist', () => {
        const wordsToWhitelist = [klalot.words[0], klalot.words[1], klalot.words[2]];
        const hebrewFilter = new Filter();

        // check that its not censoring after adding to white list
        hebrewFilter.addToWhiteList(wordsToWhitelist);
        for (const whitelistedWord of wordsToWhitelist) {
          const expectedNotCensored = 'מה קורה' + ' ' + whitelistedWord;
          const censoredSentence = hebrewFilter.censor(expectedNotCensored);

          expect(censoredSentence).toBe(expectedNotCensored);
        }
      });
    });
  });
});
