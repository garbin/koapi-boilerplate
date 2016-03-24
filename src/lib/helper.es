import path from 'path';

export function storage(relative) {
  return path.resolve('./storage' + relative);
};
