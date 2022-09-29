import { faker } from '@faker-js/faker';
import { Filter } from '../src/Filter';
import klalot from '../src/klalot.json';

describe('Hebrew Filter', () => {
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
});
