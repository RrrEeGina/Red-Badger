const fs = require('fs');

const heading = ['N', 'E', 'S', 'W'];
const steps = { N: [0, 1], E: [1, 0], S: [0, -1], W: [-1, 0] };
const dangerZones = new Set();

function turnLeft(dir) {
  return heading[(heading.indexOf(dir) + 3) % 4];
}

function turnRight(dir) {
  return heading[(heading.indexOf(dir) + 1) % 4];
}

function runRobots(inputLines) {
  const [maxX, maxY] = inputLines[0].split(' ').map(Number);
  const robots = inputLines.slice(1);

  for (let i = 0; i < robots.length; i += 2) {
    let [x, y, dir] = robots[i].split(' ');
    x = parseInt(x);
    y = parseInt(y);
    const commands = robots[i + 1];

    let lost = false;

    for (let j = 0; j < commands.length; j++) {
      const cmd = commands[j];

      if (cmd === 'L') dir = turnLeft(dir);
      else if (cmd === 'R') dir = turnRight(dir);
      else if (cmd === 'F') {
        const [dx, dy] = steps[dir];
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || nx > maxX || ny < 0 || ny > maxY) {
          const key = `${x},${y},${dir}`;
          if (!dangerZones.has(key)) {
            dangerZones.add(key);
            lost = true;
            break;
          }
        } else {
          x = nx;
          y = ny;
        }
      }
    }

    console.log(`${x} ${y} ${dir}${lost ? ' LOST' : ''}`);
  }
}

// Read input
const inputLines = fs.existsSync('input.txt')
  ? fs.readFileSync('input.txt', 'utf8').trim().split('\n')
  : ['5 3', '1 1 E', 'RFRFRFRF', '3 2 N', 'FRRFLLFFRRFLL', '0 3 W', 'LLFFFLFLFL'];

runRobots(inputLines);
