import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 12);

  const company = await prisma.company.upsert({
    where: { id: "demo-company" },
    update: {},
    create: { id: "demo-company", name: "DealFlow360 Demo Company" }
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@dealflow360.local" },
    update: {},
    create: {
      companyId: company.id,
      name: "Admin",
      email: "admin@dealflow360.local",
      passwordHash,
      role: "ADMIN"
    }
  });

  const manager = await prisma.user.upsert({
    where: { email: "manager@dealflow360.local" },
    update: {},
    create: {
      companyId: company.id,
      name: "Manager",
      email: "manager@dealflow360.local",
      passwordHash,
      role: "MANAGER"
    }
  });

  await prisma.user.upsert({
    where: { email: "finance.manager@dealflow360.local" },
    update: {},
    create: {
      companyId: company.id,
      name: "Finance Manager",
      email: "finance.manager@dealflow360.local",
      passwordHash,
      role: "FINANCE_MANAGER"
    }
  });

  const sales = await prisma.user.upsert({
    where: { email: "sales@dealflow360.local" },
    update: {},
    create: {
      companyId: company.id,
      name: "Salesperson",
      email: "sales@dealflow360.local",
      passwordHash,
      role: "SALES"
    }
  });

  const customer = await prisma.customer.upsert({
    where: { id: "demo-customer" },
    update: {},
    create: {
      id: "demo-customer",
      companyId: company.id,
      name: "ABC Technologies",
      email: "customer@abc.local",
      phone: "9999999999",
      tier: "GOLD"
    }
  });

  await prisma.user.upsert({
    where: { email: "customer@abc.local" },
    update: { customerId: customer.id },
    create: {
      companyId: company.id,
      customerId: customer.id,
      name: "ABC Customer",
      email: "customer@abc.local",
      passwordHash,
      role: "CUSTOMER"
    }
  });

  const laptop = await prisma.product.upsert({
    where: { id: "demo-laptop" },
    update: {},
    create: {
      id: "demo-laptop",
      companyId: company.id,
      sku: "LAPTOP-DELL-001",
      name: "Dell Laptop",
      description: "Business laptop",
      category: "HARDWARE",
      type: "PRODUCT",
      basePrice: 70000,
      taxRate: 18
    }
  });

  const installation = await prisma.product.upsert({
    where: { id: "demo-installation" },
    update: {},
    create: {
      id: "demo-installation",
      companyId: company.id,
      sku: "SERVICE-INSTALL-001",
      name: "Installation",
      description: "On-site installation",
      category: "SERVICES",
      type: "SERVICE",
      basePrice: 5000,
      taxRate: 18
    }
  });

  await prisma.discountRule.upsert({
    where: { id: "demo-gold-hardware-rule" },
    update: {},
    create: {
      id: "demo-gold-hardware-rule",
      companyId: company.id,
      customerTier: "GOLD",
      productCategory: "HARDWARE",
      maxDiscountPercent: 15
    }
  });

  await prisma.discountRule.upsert({
    where: { id: "demo-gold-service-rule" },
    update: {},
    create: {
      id: "demo-gold-service-rule",
      companyId: company.id,
      customerTier: "GOLD",
      productCategory: "SERVICES",
      maxDiscountPercent: 10
    }
  });

  const ahmedabad = await prisma.warehouse.upsert({
    where: { id: "warehouse-ahmedabad" },
    update: {},
    create: { id: "warehouse-ahmedabad", companyId: company.id, name: "Ahmedabad Warehouse", city: "Ahmedabad" }
  });

  const mumbai = await prisma.warehouse.upsert({
    where: { id: "warehouse-mumbai" },
    update: {},
    create: { id: "warehouse-mumbai", companyId: company.id, name: "Mumbai Warehouse", city: "Mumbai" }
  });

  await prisma.inventory.upsert({
    where: { warehouseId_productId: { warehouseId: ahmedabad.id, productId: laptop.id } },
    update: { quantity: 12 },
    create: { companyId: company.id, warehouseId: ahmedabad.id, productId: laptop.id, quantity: 12 }
  });

  await prisma.inventory.upsert({
    where: { warehouseId_productId: { warehouseId: mumbai.id, productId: laptop.id } },
    update: { quantity: 8 },
    create: { companyId: company.id, warehouseId: mumbai.id, productId: laptop.id, quantity: 8 }
  });

  await prisma.inventory.upsert({
    where: { warehouseId_productId: { warehouseId: ahmedabad.id, productId: installation.id } },
    update: { quantity: 100 },
    create: { companyId: company.id, warehouseId: ahmedabad.id, productId: installation.id, quantity: 100 }
  });

  console.log("Seed complete.");
  console.log("admin@dealflow360.local / Admin@123");
  console.log("manager@dealflow360.local / Admin@123");
  console.log("finance.manager@dealflow360.local / Admin@123");
  console.log("sales@dealflow360.local / Admin@123");
  console.log("customer@abc.local / Admin@123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
