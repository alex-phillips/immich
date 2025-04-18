export * from './album.repository.mock';
export * from './api-key.repository.mock';
export * from './asset.repository.mock';
export * from './communication.repository.mock';
export * from './crypto.repository.mock';
export * from './fixtures';
export * from './job.repository.mock';
export * from './machine-learning.repository.mock';
export * from './media.repository.mock';
export * from './partner.repository.mock';
export * from './search.repository.mock';
export * from './shared-link.repository.mock';
export * from './smart-info.repository.mock';
export * from './storage.repository.mock';
export * from './system-config.repository.mock';
export * from './user-token.repository.mock';
export * from './user.repository.mock';

export async function asyncTick(steps: number) {
  for (let i = 0; i < steps; i++) {
    await Promise.resolve();
  }
}
