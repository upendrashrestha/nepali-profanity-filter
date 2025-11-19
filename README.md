# Nepali Profanity Filter

A comprehensive profanity filter for Nepali language supporting both Romanized Nepali and Devanagari script.

## Installation

\`\`\`bash
npm install nepali-profanity-filter
\`\`\`

or

\`\`\`bash
yarn add nepali-profanity-filter
\`\`\`

## Features

- ✅ Supports Romanized Nepali (e.g., "khate", "kukur")
- ✅ Supports Devanagari script (e.g., "खाटे", "कुकुर")
- ✅ Case-insensitive filtering
- ✅ Leetspeak detection (e.g., "khate", "r@ndi")
- ✅ Custom word lists
- ✅ TypeScript support
- ✅ Works in Node.js and browsers
- ✅ Zero dependencies

## Usage

### Basic Usage

\`\`\`javascript
import NepaliProfanityFilter from 'nepali-profanity-filter';

const filter = new NepaliProfanityFilter();

// Check if text contains profanity
filter.isProfane('hello muji'); // true
filter.isProfane('hello world'); // false

// Clean text
filter.clean('hello muji world'); // "hello \*\*\* world"

// Get detailed results
const result = filter.filter('hello muji world');
console.log(result);
// {
// clean: "hello \*\*\* world",
// isProfane: true,
// matches: ["muji"],
// originalText: "hello muji world"
// }
\`\`\`

### TypeScript

\`\`\`typescript
import NepaliProfanityFilter, { FilterOptions, FilterResult } from 'nepali-profanity-filter';

const options: FilterOptions = {
replaceWith: '[censored]',
customWords: ['badword'],
caseSensitive: false,
matchWholeWord: true,
};

const filter = new NepaliProfanityFilter(options);

const result: FilterResult = filter.filter('some text');
\`\`\`

### Custom Replacement

\`\`\`javascript
const filter = new NepaliProfanityFilter({
replaceWith: '[censored]'
});

filter.clean('hello muji'); // "hello [censored]"
\`\`\`

### Custom Words

\`\`\`javascript
const filter = new NepaliProfanityFilter({
customWords: ['custom1', 'custom2']
});

// Add more words dynamically
filter.addWords(['newbadword']);

// Remove words
filter.removeWords(['muji']);
\`\`\`

### Case Sensitive

\`\`\`javascript
const filter = new NepaliProfanityFilter({
caseSensitive: true
});

filter.isProfane('muji'); // true
filter.isProfane('MUJI'); // false
\`\`\`

### Partial Matching

\`\`\`javascript
const filter = new NepaliProfanityFilter({
matchWholeWord: false
});

filter.isProfane('mujification'); // true
\`\`\`

## API

### Constructor

\`\`\`typescript
new NepaliProfanityFilter(options?: FilterOptions)
\`\`\`

### Options

| Option             | Type     | Default      | Description                      |
| ------------------ | -------- | ------------ | -------------------------------- |
| \`replaceWith\`    | string   | \`"\*\*\*"\` | Replacement string for profanity |
| \`customWords\`    | string[] | \`[]\`       | Additional words to filter       |
| \`caseSensitive\`  | boolean  | \`false\`    | Enable case-sensitive matching   |
| \`matchWholeWord\` | boolean  | \`true\`     | Only match whole words           |

### Methods

#### \`isProfane(text: string): boolean\`

Check if text contains profanity.

#### \`clean(text: string): string\`

Remove profanity from text.

#### \`filter(text: string): FilterResult\`

Get detailed filter results including matches.

#### \`addWords(words: string[]): void\`

Add custom words to filter list.

#### \`removeWords(words: string[]): void\`

Remove words from filter list.

#### \`getWords(): string[]\`

Get all words in filter list.

## Use Cases

### Content Moderation

\`\`\`javascript
app.post('/comment', (req, res) => {
const { text } = req.body;

if (filter.isProfane(text)) {
return res.status(400).json({
error: 'Comment contains inappropriate language'
});
}

// Save comment...
});
\`\`\`

### Auto-cleaning

\`\`\`javascript
app.post('/post', (req, res) => {
const { text } = req.body;
const cleanText = filter.clean(text);

// Save cleanText...
});
\`\`\`

### React Hook

\`\`\`javascript
import { useState } from 'react';
import NepaliProfanityFilter from 'nepali-profanity-filter';

const filter = new NepaliProfanityFilter();

function CommentForm() {
const [text, setText] = useState('');
const [error, setError] = useState('');

const handleSubmit = () => {
if (filter.isProfane(text)) {
setError('Please remove inappropriate language');
return;
}
// Submit...
};

return (

<form onSubmit={handleSubmit}>
<textarea value={text} onChange={(e) => setText(e.target.value)} />
{error && <p>{error}</p>}
<button type="submit">Submit</button>
</form>
);
}
\`\`\`

## Contributing

We welcome contributions! To add more Nepali profanity words:

1. Fork the repository
2. Edit \`src/words.ts\`
3. Add tests in \`tests/filter.test.ts\`
4. Submit a pull request

## Privacy & Ethics

This package is designed to help maintain respectful online communities. The word list is curated to filter common Nepali profanity while minimizing false positives.

## License

MIT

## Support

- 🐛 [Report bugs](https://github.com/upendrashrestha/nepali-profanity-filter/issues)
- 💬 [Discussions](https://github.com/upendrashrestha/nepali-profanity-filter/discussions)
- ⭐ [Star on GitHub](https://github.com/upendrashrestha/nepali-profanity-filter)
