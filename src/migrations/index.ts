import * as migration_20250406_064944 from './20250406_064944';
import * as migration_20250406_070231 from './20250406_070231';
import * as migration_20250406_071025 from './20250406_071025';

export const migrations = [
  {
    up: migration_20250406_064944.up,
    down: migration_20250406_064944.down,
    name: '20250406_064944',
  },
  {
    up: migration_20250406_070231.up,
    down: migration_20250406_070231.down,
    name: '20250406_070231',
  },
  {
    up: migration_20250406_071025.up,
    down: migration_20250406_071025.down,
    name: '20250406_071025'
  },
];
