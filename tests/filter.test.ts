import { NepaliProfanityFilter } from '../src/filter';



describe('NepaliFrofanityFilter', () => {
  let filter: NepaliProfanityFilter;

  beforeEach(() => {
    filter = new NepaliProfanityFilter();
  });

  describe('isProfane', () => {
    test('detects romanized Nepali profanity', () => {
      expect(filter.isProfane('muji')).toBe(true);
      expect(filter.isProfane('randi')).toBe(true);
      expect(filter.isProfane('hello world')).toBe(false);
    });

    test('detects Devanagari profanity', () => {
      expect(filter.isProfane('मुजी')).toBe(true);
      expect(filter.isProfane('रन्डी')).toBe(true);
      expect(filter.isProfane('नमस्ते')).toBe(false);
    });

    test('detects variations profanity ', () => {
      expect(filter.isProfane('l@d0')).toBe(true);
      expect(filter.isProfane('Mvji')).toBe(true);
    });

    test('case insensitive by default', () => {
      expect(filter.isProfane('MUJI')).toBe(true);
      expect(filter.isProfane('Muji')).toBe(true);
      expect(filter.isProfane('MuJi')).toBe(true);
    });

//     test('debug - check words in filter', () => {
//   const words = filter.getWords();
//   console.log('Words in filter:', words);
//   console.log('Contains muji?', words.includes('muji'));
//   console.log('Test isProfane:', filter.isProfane('muji'));
//   console.log('Test isProfane:', filter.isProfane('रन्डी'));
  
//   // Manual test
//   const text = 'muji';
//   const result = filter.filter(text);
//   console.log('Filter result:', result);
// });
  });

  describe('clean', () => {
    test('replaces profanity with default asterisks', () => {
      expect(filter.clean('you are muji')).toBe('you are ***');
      expect(filter.clean('hello muji world')).toBe('hello *** world');
    });

    test('replaces with custom string', () => {
      const customFilter = new NepaliProfanityFilter({ replaceWith: '[censored]' });
      expect(customFilter.clean('muji')).toBe('[censored]');
    });

    test('handles multiple profanities', () => {
      expect(filter.clean('muji randi')).toBe('*** ***');
    });
  });

  describe('filter', () => {
    test('returns complete filter result', () => {
      const result = filter.filter('hello muji world');
      expect(result.isProfane).toBe(true);
      expect(result.matches).toContain('muji');
      expect(result.clean).toBe('hello *** world');
      expect(result.originalText).toBe('hello muji world');
    });

    test('returns no matches for clean text', () => {
      const result = filter.filter('hello world');
      expect(result.isProfane).toBe(false);
      expect(result.matches).toHaveLength(0);
      expect(result.clean).toBe('hello world');
    });
  });

  describe('custom words', () => {
    test('adds custom words', () => {
      filter.addWords(['badword']);
      expect(filter.isProfane('badword')).toBe(true);  
    });
    
    test('detects profanity on added custom words', () => {
      filter.addWords(['ass','fuck']); 
      expect(filter.isProfane('fvck')).toBe(true); 
      expect(filter.isProfane('a$$')).toBe(true); 
      
    });

    test('detects profanity on added custom words with matchWholeWord false', () => {
     const customFilter = new NepaliProfanityFilter({ matchWholeWord: false });
     customFilter.addWords(['ass']); 
     expect(customFilter.isProfane('a$$h0le')).toBe(true);   
    });

    test('removes words', () => {
      filter.removeWords(['muji']);
      expect(filter.isProfane('muji')).toBe(false);
    });
  });
});