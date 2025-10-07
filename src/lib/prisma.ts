import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaLibSQL(libsql as any);

export const prisma = new PrismaClient({ adapter });
export default prisma;
