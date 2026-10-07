import { cors } from '@elysiajs/cors';
import type { AnyElysia } from 'elysia';
import { helmet } from 'elysia-helmet';
import { Env } from '#env/index.js';

export function configureCors(app: AnyElysia) {
  app.use(cors({ origin: Env.CORS_ORIGINS }));
  app.use(helmet());
}
