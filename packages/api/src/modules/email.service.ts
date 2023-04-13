import { INestApplicationContext } from '@nestjs/common';
import { ENV_EMAIL_PASSWORD, ENV_ENV } from 'const/env';
import nodemailer from 'nodemailer';
import { PrismaService } from './prisma/prisma.service';

const NAME_EMAIL = 'Datinn';
const BASE_EMAIL = 'noreply@datinn.io';

export const EMAILS = {
	EMAIL_LOGIN: {
		body: (code: number) => `login code ${code}`,
		subject: () => 'LOGIN CODE',
	},
};

const transporter = nodemailer.createTransport({
	host: 'smtp.seznam.cz',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: BASE_EMAIL, // generated ethereal user
		pass: ENV_EMAIL_PASSWORD, // generated ethereal password
	},
});

export class EmailService {
	static async send(
		email: string,
		subject: string,
		html: string,
		attachments?: {
			filename: string;
			contentType: 'application/pdf';
			path: string;
		}[],
	): Promise<void> {
		let s = subject;

		if (ENV_ENV !== 'PROD') {
			s = `${ENV_ENV}: ${s}`;
		}

		await transporter.sendMail({
			from: `"${NAME_EMAIL}" <${BASE_EMAIL}>`,
			to: email,
			subject: s,
			html,
			attachments,
		});
	}
}
