import { config } from 'dotenv';

config();

(async () => {
	const { bootstrap } = await import('./boot');

	await bootstrap();
	// eslint-disable-next-line no-console
})().catch(e => console.error('Application failed to bootstrap...', e));
