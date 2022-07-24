import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from 'prisma/client'
import { PrismaClient as PrismaClientTest } from 'prisma_test/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect()
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close()
		})
	}
}

@Injectable()
export class PrismaServiceTest extends PrismaClientTest implements OnModuleInit {
	async onModuleInit() {
		await this.$connect()
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close()
		})
	}
}
