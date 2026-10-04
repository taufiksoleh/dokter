import * as migration_20261004_141015_initial from './20261004_141015_initial';

export const migrations = [
  {
    up: migration_20261004_141015_initial.up,
    down: migration_20261004_141015_initial.down,
    name: '20261004_141015_initial'
  },
];
