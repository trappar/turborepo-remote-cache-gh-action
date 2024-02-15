export function indentMultiline(message, spaces = 2) {
  const output = [];
  message.split('\n').forEach((line) => {
    output.push(' '.repeat(spaces) + line);
  });
  return output.join('\n');
}