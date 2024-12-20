export const formatText = (text: string, type: string): string => {
  switch (type) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    case 'removeSpaces':
      return text
        .replace(/\s+/g, ' ')
        .trim();
    case 'alignLeft':
      return text
        .split('\n')
        .map(line => line.trim())
        .join('\n');
    case 'alignCenter':
      const maxLength = Math.max(...text.split('\n').map(line => line.trim().length));
      return text
        .split('\n')
        .map(line => {
          const trimmedLine = line.trim();
          const padding = Math.max(0, Math.floor((maxLength - trimmedLine.length) / 2));
          return ' '.repeat(padding) + trimmedLine;
        })
        .join('\n');
    case 'alignRight':
      const maxLen = Math.max(...text.split('\n').map(line => line.trim().length));
      return text
        .split('\n')
        .map(line => {
          const trimmedLine = line.trim();
          const padding = Math.max(0, maxLen - trimmedLine.length);
          return ' '.repeat(padding) + trimmedLine;
        })
        .join('\n');
    default:
      return text;
  }
};