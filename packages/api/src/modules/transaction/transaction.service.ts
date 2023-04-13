import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
	constructor(private readonly prismaService: PrismaService) {}

	async getBalance(accountId: string): Promise<number> {
		const r = await this.prismaService.transaction.aggregate({
			_sum: {
				amount: true,
			},
			where: { accountId },
		});

		return r._sum.amount ?? 0;
	}
}
