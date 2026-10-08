import { join } from 'node:path';
import { findWorkspaceRoot, readEnvFile } from '@repo/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './migrations',
  dbCredentials: {
    url: databaseUrl(),
  },
});

function databaseUrl(): string {
  // `migrate:test` points here at test.env: Nx already loaded the root .env (dev database) into
  // process.env, so the explicit file has to take precedence over it.
  const envFile = process.env.MIGRATE_ENV_FILE;
  if (envFile) {
    const url = readEnvFile(join(findWorkspaceRoot(), envFile)).DATABASE_URL;
    if (!url) {
      throw new Error(`MIGRATE_ENV_FILE points to ${envFile}, which carries no DATABASE_URL`);
    }
    return url;
  }

  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const fallback = readEnvFile(join(findWorkspaceRoot(), 'test.env')).DATABASE_URL;

  if (!fallback) {
    throw new Error('DATABASE_URL is not set, and the root test.env carries no fallback');
  }

  return fallback;
}
