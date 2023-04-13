import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
	constructor(private readonly prismaService: PrismaService) {}

	async getBalance(accountId: string): Promise<number> {
		const r = await this.prismaService.transaction.aggregate({
			_sum: {
				amount: true,
			},
			where: { toAccountId: accountId },
		});

		return r._sum.amount ?? 0;
	}

	createTransaction(
		userId: string,
		amount: number,
		type: TransactionType,
		fromAccountNumber?: string,
		toAccountNumber?: string,
	): Promise<boolean> {
		console.log({
			userId,
			amount,
			type,
			fromAccountNumber,
			toAccountNumber,
		});;
		return Promise.resolve(true);
	}
}
