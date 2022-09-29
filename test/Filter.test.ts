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
  });
});
