import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSPrisma from '@adminjs/prisma';
import AdminJS, { ResourceWithOptions } from 'adminjs';
import { DMMFClass } from '@prisma/client/runtime';
import { SystemController } from './system.controller';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

const DEFAULT_ADMIN = {
	email: 'admin@admin.com',
	password: 'admin',
};

AdminJS.registerAdapter({
	Resource: AdminJSPrisma.Resource,
	Database: AdminJSPrisma.Database,
});

const authenticate = (email: string, password: string): Promise<any> => {
	if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
		return Promise.resolve(DEFAULT_ADMIN);
	}
	return Promise.resolve(null);
};

const ENTITIES = ['User', 'UserAuthCode', 'Account', 'Transaction'];

@Module({
	imports: [
		PrismaModule,
		AdminModule.createAdminAsync({
			useFactory: () => {
				// Note: Feel free to contribute to this documentation if you find a Nest-way of
				// injecting PrismaService into AdminJS module
				const prisma = new PrismaService();
				// `_baseDmmf` contains necessary Model metadata but it is a private method
				// so it isn't included in PrismaClient type
				const dmmf = (prisma as any)._baseDmmf as DMMFClass;

				const RESOURCES: Array<ResourceWithOptions | any> = ENTITIES.map(e => ({
					model: dmmf.modelMap[e],
					client: prisma,
					options: {
						parent: {},
					},
				}));

				return {
					adminJsOptions: {
						rootPath: '/',
						resources: RESOURCES,
						branding: {
							withMadeWithLove: false,
							companyName: 'Bank Admin',
						},
					},
					auth: {
						authenticate,
						cookieName: 'adminjs',
						cookiePassword: 'secret',
					},
					sessionOptions: {
						resave: true,
						saveUninitialized: true,
						secret: 'secret',
					},
					resources: RESOURCES.map(r => ({
						resource: r,
					})),
				};
			},
		}),
	],
	controllers: [SystemController],
})
export class AppModule {}
