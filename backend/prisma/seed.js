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

  await prisma.subscriptionPlan.deleteMany({
    where: {
      companyId: company.id,
      id: { in: ["demo-plan-support", "demo-plan-analytics", "demo-plan-premium"] }
    }
  });

  const subscriptionPlans = [
    { id: "plan_1", name: "24/7 Premium Support", cadence: "Monthly", price: 99, prorationRule: "Daily proration", cancellationRule: "Full refund within 30 days", active: true },
    { id: "plan_2", name: "Analytics & Reporting Add-on", cadence: "Yearly", price: 590, prorationRule: "Daily proration", cancellationRule: "Partial refund for unused months", active: true },
    { id: "plan_3", name: "Enterprise Security Bundle", cadence: "Quarterly", price: 250, prorationRule: "No proration", cancellationRule: "Non-refundable after 7 days", active: false }
  ];

  for (const plan of subscriptionPlans) {
    await prisma.subscriptionPlan.upsert({
      where: { id: plan.id },
      update: plan,
      create: { ...plan, companyId: company.id }
    });
  }

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

  const demoQuotation = await prisma.quotation.upsert({
    where: { id: "demo-quotation" },
    update: {},
    create: {
      id: "demo-quotation",
      companyId: company.id,
      customerId: customer.id,
      createdById: sales.id,
      status: "APPROVED",
      versionNumber: 1,
      notes: "Demo quotation for the customer portal",
      subtotal: 95000,
      discountTotal: 5000,
      taxTotal: 15120,
      total: 105120,
      rulePassed: true,
      ruleViolations: [],
      items: {
        create: [
          { productId: laptop.id, quantity: 1, unitPrice: 70000, discountPercent: 5, discountAmount: 3500, taxRate: 18, taxAmount: 11970, lineTotal: 78470 },
          { productId: installation.id, quantity: 5, unitPrice: 5000, discountPercent: 6, discountAmount: 1500, taxRate: 18, taxAmount: 3150, lineTotal: 19150 }
        ]
      },
      versions: {
        create: {
          versionNumber: 1,
          status: "APPROVED",
          subtotal: 95000,
          discountTotal: 5000,
          taxTotal: 15120,
          total: 105120,
          notes: "Initial approved quotation",
          snapshot: { source: "seed", items: ["demo-laptop", "demo-installation"] }
        }
      },
      approvals: { create: { status: "APPROVED", approverRole: "MANAGER", managerId: manager.id } }
    }
  });

  const existingHealth = await prisma.dealHealth.findFirst({ where: { quotationId: demoQuotation.id } });
  if (!existingHealth) {
    await prisma.dealHealth.create({
      data: {
        quotationId: demoQuotation.id,
        riskScore: 18,
        riskLevel: "LOW",
        reasons: ["Discounts are within configured customer and category limits"],
        recommendations: ["Proceed with customer confirmation"],
        rawResponse: { source: "seed" }
      }
    });
  }

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
