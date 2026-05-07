import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  // Create superadmin
  const superadminPhone = '+998901234567';
  const existing = await prisma.user.findUnique({ where: { phone: superadminPhone } });

  if (!existing) {
    const hashed = await bcrypt.hash('admin123', 12);
    await prisma.user.create({
      data: {
        phone: superadminPhone,
        password: hashed,
        name: 'Super Admin',
        role: 'SUPERADMIN',
      },
    });
    console.log('✓ Superadmin yaratildi:', superadminPhone, '/ admin123');
  } else {
    console.log('✓ Superadmin allaqachon mavjud');
  }

  // Create plans
  const planExists = await prisma.plan.findFirst();
  if (!planExists) {
    await prisma.plan.createMany({
      data: [
        { name: "Boshlang'ich", price: 299000, operatorLimit: 3, durationDays: 30 },
        { name: 'Standart', price: 599000, operatorLimit: 10, durationDays: 30 },
        { name: 'Professional', price: 999000, operatorLimit: 30, durationDays: 30 },
        { name: 'Yillik Standart', price: 5990000, operatorLimit: 10, durationDays: 365 },
      ],
    });
    console.log('✓ Tarif paketlari yaratildi');
  } else {
    console.log('✓ Tariflar allaqachon mavjud');
  }

  console.log('\n✅ Seed muvaffaqiyatli yakunlandi!');
  console.log('\n📝 Login ma\'lumotlari:');
  console.log('Superadmin: +998901234567 / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
