import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'modules/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { JWTUser } from 'modules/auth/jwt.types';
import { PrismaService } from 'modules/prisma/prisma.service';
import { TransactionDto } from './transaction.dto';

@UseGuards(JwtAuthGuard)
@Resolver(() => TransactionDto)
export class TransactionResolver {
	constructor(private readonly prismaService: PrismaService) {}

	@Query(() => [TransactionDto])
	myTransactions(@CurrentUser() user: JWTUser): Promise<TransactionDto[]> {
		return this.prismaService.transaction.findMany({ where: { userId: user.id } });
	}
}
