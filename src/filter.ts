import { NEPALI_PROFANITY, VARIATIONS } from './words';
import { FilterOptions, FilterResult } from './types';

export class NepaliProfanityFilter {
  private words: Set<string>;
  private options: Required<FilterOptions>;

  constructor(options: FilterOptions = {}) {
    this.options = {
      replaceWith: '***',
      customWords: [],
      caseSensitive: false,
      matchWholeWord: true,
      ...options,
    };

    // Normalize all profanity words on load
    const normalizeWord = (w: string) =>
      this.normalizeToken(w);

    const allWords = [...NEPALI_PROFANITY, ...this.options.customWords];

    this.words = new Set(
      allWords.map((w) => normalizeWord(w))
    );
  }

  /**
   * Check if the text contains profanity
   */
  isProfane(text: string): boolean {
    return this.findMatches(text).length > 0;
  }

  /**
   * Clean text
   */
  clean(text: string): string {
    const matches = this.findMatches(text);

    let cleaned = text;
    for (const match of matches) {
      const safe = this.escapeRegex(match);
      cleaned = cleaned.replace(new RegExp(safe, 'gi'), this.options.replaceWith);
    }

    return cleaned;
  }

  /**
   * Get detailed filter output
   */
  filter(text: string): FilterResult {
    const matches = this.findMatches(text);

    return {
      clean: this.clean(text),
      isProfane: matches.length > 0,
      matches: [...new Set(matches)],
      originalText: text,
    };
  }

  /**
   * Add more words dynamically
   */
  addWords(words: string[]): void {
    words.forEach((w) => this.words.add(this.normalizeToken(w)));
  }

  /**
   * Remove words dynamically
   */
  removeWords(words: string[]): void {
    words.forEach((w) => this.words.delete(this.normalizeToken(w)));
  }

  getWords(): string[] {
    return Array.from(this.words);
  }

  /**
   * Find profanity matches
   */
  private findMatches(text: string): string[] {
    const normalizedText = this.normalizeText(text);
    const matches: string[] = [];

    for (const word of this.words) {
      const regex = this.createRegex(word);

      const parts = normalizedText.match(regex);
      if (!parts) continue;

      // Extract original text substring equivalent
      parts.forEach((p) => matches.push(p));
    }

    return matches;
  }

  /**
   * Create regex for detecting profanity in normalized text
   */
private createRegex(word: string): RegExp {
  const safe = this.escapeRegex(word);

  if (this.options.matchWholeWord) {
    // Don't consume the leading space; use lookbehind instead
    return new RegExp(`(?<=^|\\s)${safe}(?=\\s|$)`, 'gi');
  }

  return new RegExp(safe, 'gi');
}


  /**
   * Normalizes text fully (characters + obfuscation)
   */
  private normalizeText(text: string): string {
    if (!text) return '';

    // Unicode normalize
    let normalized = text.normalize('NFC');

    // Apply variations
    for (const [char, variants] of Object.entries(VARIATIONS)) {
      for (const variant of variants) {
        const safe = this.escapeRegex(variant);
        normalized = normalized.replace(new RegExp(safe, 'gi'), char);
      }
    }

    // Remove dots, hyphens, underscores used for hiding words
    normalized = normalized.replace(/[._-]/g, '');

    return this.options.caseSensitive ? normalized : normalized.toLowerCase();
  }

  /**
   * Normalize individual word/token
   */
  private normalizeToken(word: string): string {
    return this.normalizeText(word.trim());
  }

  /**
   * Safe regex escaping
   */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
