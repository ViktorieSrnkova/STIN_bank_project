import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app/app.module';
import { PrismaService } from 'app/prisma/prisma.service';
import { enableExitSignalsHandling, registerShutdownCallback } from 'utils/process';

const ENV_PORT = process.env.PORT || 3000;

export const bootstrap = async (): Promise<void> => {
	enableExitSignalsHandling();
	const app = await NestFactory.create(AppModule);
	const prismaService = app.get(PrismaService);

	registerShutdownCallback(() => {
		app.close();
	});

	prismaService.enableShutdownHooks(app);
	app.enableCors({
		origin: '*',
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(ENV_PORT, '0.0.0.0');
	// eslint-disable-next-line no-console
	console.log(`http://localhost:${ENV_PORT}`);
};
