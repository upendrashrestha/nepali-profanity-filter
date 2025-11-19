export interface FilterOptions {
  replaceWith?: string;
  customWords?: string[];
  caseSensitive?: boolean;
  matchWholeWord?: boolean;
}

export interface FilterResult {
  clean: string;
  isProfane: boolean;
  matches: string[];
  originalText: string;
}