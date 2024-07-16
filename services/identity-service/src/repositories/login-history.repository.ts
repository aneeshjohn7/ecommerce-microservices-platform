//  import { PrismaClient, Prisma, LoginHistory } from '@prisma/client';

// export class LoginHistoryRepository {
//   constructor(private prisma: PrismaClient) {}

//   /**
//    * Creates a new login history record.
//    * @param data - The login history data to create.
//    * @returns The created LoginHistory record.
//    */
//   async create(data: Prisma.LoginHistoryCreateInput): Promise<LoginHistory> {
//     return this.prisma.loginHistory.create({ data });
//   }

//   /**
//    * Finds a login history record by its ID.
//    * @param id - The login history ID.
//    * @returns The LoginHistory record or null if not found.
//    */
//   async findById(id: string): Promise<LoginHistory | null> {
//     return this.prisma.loginHistory.findUnique({ where: { id } });
//   }

//   /**
//    * Finds login history records for a specific user with pagination support.
//    * @param userId - The user ID.
//    * @param page - The page number (starts at 1).
//    * @param limit - The number of records per page.
//    * @returns An array of LoginHistory records ordered by loginAt descending.
//    */
//   async findByUserId(
//     userId: string,
//     page?: number,
//     limit?: number
//   ): Promise<LoginHistory[]> {
//     const skip = page && limit ? (page - 1) * limit : undefined;
//     const take = limit;

//     return this.prisma.loginHistory.findMany({
//       where: { userId },
//       orderBy: { loginAt: 'desc' },
//       skip,
//       take,
//     });
//   }

//   /**
//    * Gets the latest login history record for a user.
//    * @param userId - The user ID.
//    * @returns The latest LoginHistory record or null if not found.
//    */
//   async getLatestByUserId(userId: string): Promise<LoginHistory | null> {
//     return this.prisma.loginHistory.findFirst({
//       where: { userId },
//       orderBy: { loginAt: 'desc' },
//     });
//   }

//   /**
//    * Gets the latest successful login record for a user.
//    * @param userId - The user ID.
//    * @returns The latest successful LoginHistory record or null if not found.
//    */
//   async getLatestSuccessfulLogin(userId: string): Promise<LoginHistory | null> {
//     return this.prisma.loginHistory.findFirst({
//       where: { userId, success: true },
//       orderBy: { loginAt: 'desc' },
//     });
//   }

//   /**
//    * Gets the latest failed login record for a user.
//    * @param userId - The user ID.
//    * @returns The latest failed LoginHistory record or null if not found.
//    */
//   async getLatestFailedLogin(userId: string): Promise<LoginHistory | null> {
//     return this.prisma.loginHistory.findFirst({
//       where: { userId, success: false },
//       orderBy: { loginAt: 'desc' },
//     });
//   }

//   /**
//    * Finds login history records by session ID.
//    * @param sessionId - The session ID.
//    * @returns An array of LoginHistory records.
//    */
//   async findBySessionId(sessionId: string): Promise<LoginHistory[]> {
//     return this.prisma.loginHistory.findMany({ where: { sessionId } });
//   }

//   /**
//    * Counts the total number of login history records for a user.
//    * @param userId - The user ID.
//    * @returns The count of LoginHistory records.
//    */
//   async countByUserId(userId: string): Promise<number> {
//     return this.prisma.loginHistory.count({ where: { userId } });
//   }

//   /**
//    * Counts failed login attempts after a given date.
//    * @param userId - The user ID.
//    * @param from - The start date.
//    * @returns The count of failed LoginHistory records.
//    */
//   async countFailedAttempts(userId: string, from: Date): Promise<number> {
//     return this.prisma.loginHistory.count({
//       where: { userId, success: false, loginAt: { gte: from } },
//     });
//   }

//   /**
//    * Deletes a login history record by ID.
//    * @param id - The login history ID.
//    * @returns The deleted LoginHistory record.
//    */
//   async delete(id: string): Promise<LoginHistory> {
//     return this.prisma.loginHistory.delete({ where: { id } });
//   }

//   /**
//    * Deletes login history records older than a given date.
//    * @param date - The cutoff date.
//    * @returns The batch payload with the count of deleted records.
//    */
//   async deleteOlderThan(date: Date): Promise<Prisma.BatchPayload> {
//     return this.prisma.loginHistory.deleteMany({
//       where: { loginAt: { lt: date } },
//     });
//   }

//   /**
//    * Deletes all login history records for a specific user.
//    * @param userId - The user ID.
//    * @returns The batch payload with the count of deleted records.
//    */
//   async deleteByUserId(userId: string): Promise<Prisma.BatchPayload> {
//     return this.prisma.loginHistory.deleteMany({ where: { userId } });
//   }
// }
