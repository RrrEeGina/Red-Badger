const { spawnSync } = require('child_process');
const path = require('path');

describe('Robots CLI', () => {
  const scriptPath = path.resolve(__dirname, 'redbadger.js');

  function runScript(input) {
    const result = spawnSync('node', [scriptPath], {
      input: input.join('\n') + '\n\n', // extra newline
      encoding: 'utf-8'
    });
    return result.stdout.trim().split('\n');
  }

  test('Example input produces correct output', () => {
    const input = [
      '5 3',
      '1 1 E',
      'RFRFRFRF',
      '3 2 N',
      'FRRFLLFFRRFLL',
      '0 3 W',
      'LLFFFLFLFL'
    ];

    const expected = [
      '1 1 E',
      '3 3 N LOST',
      '2 3 S'
    ];

    const output = runScript(input);
    expect(output).toEqual(expected);
  });
});
