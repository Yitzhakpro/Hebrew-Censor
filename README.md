<div align="center">

# Hebrew Censor

</div>

Hebrew censor is a library for censoring profane hebrew words.

[![NPM](https://img.shields.io/npm/v/hebrew-censor.svg)](https://www.npmjs.com/package/hebrew-censor)

## Install

**npm:**

```bash
npm i hebrew-censor
```

**yarn:**

```bash
yarn add hebrew-censor
```

## Usage

### **Filter Class / Standalone functions**

```typescript
import { Filter, censor, isWordProfane } from 'hebrew-censor';

const heFilter = new Filter();
const result = heFilter.censor('מה קורה ימניאק');
console.log(result); // מה קורה ******
const isProfane = heFilter.censor('מניאק');
console.log(isProfane); // true

const standaloneResult = censor('מה קורה ימניאק');
console.log(standaloneResult); // מה קורה ******
const standaloneIsProfane = heFilter.censor('מניאק');
console.log(standaloneIsProfane); // true
```

### **Using the `Filter Class` gives you the advantage of customizing the filter**<br/>
**Click [here](#filter-class-init-options) for full filter init options**
```typescript
import { Filter } from 'hebrew-censor';

const heFilter = new Filter({ replacementSymbol: '!' });
const result = heFilter.censor('מה קורה ימניאק');
console.log(result); // מה קורה !!!!!!

heFilter.addBadWords('בלהבלה');
const secondResult = heFilter.censor('מה קורה בלהבלה');
console.log(secondResult); // מה קורה !!!!!!

heFilter.addToWhiteList('מניאק');
const thirdResult = heFilter.censor('מה קורה ימניאק');
console.log(thirdResult); // מה קורה ימניאק
```

## Filter Class Init Options

## License

MIT © [Yitzhakpro](https://github.com/Yitzhakpro)
