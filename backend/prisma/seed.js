import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../src/config/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 12);

  // ==================== COMPANY ====================
  const company = await prisma.company.upsert({
    where: { id: "demo-company" },
    update: {},
    create: { id: "demo-company", name: "DealFlow360 Demo Company" }
  });

  // ==================== USERS ====================
  await prisma.user.upsert({
    where: { email: "admin@dealflow360.local" },
    update: {},
    create: {
      companyId: company.id,
      name: "Admin User",
      email: "admin@dealflow360.local",
      passwordHash,
      role: "ADMIN"
    }
  });

  const salesUser = await prisma.user.upsert({
    where: { email: "sales@dealflow360.local" },
    update: {},
    create: {
      companyId: company.id,
      name: "Sales User",
      email: "sales@dealflow360.local",
      passwordHash,
      role: "SALES"
    }
  });

  await prisma.user.upsert({
    where: { email: "manager@dealflow360.local" },
    update: {},
    create: {
      companyId: company.id,
      name: "Manager User",
      email: "manager@dealflow360.local",
      passwordHash,
      role: "MANAGER"
    }
  });

  await prisma.user.upsert({
    where: { email: "finance@dealflow360.local" },
    update: {},
    create: {
      companyId: company.id,
      name: "Finance User",
      email: "finance@dealflow360.local",
      passwordHash,
      role: "FINANCE_MANAGER"
    }
  });

  // ==================== CUSTOMERS ====================
  const customers = [
    { id: "cust-1", name: "Acme Corporation", email: "acme@acme.com", phone: "+1-555-0101", tier: "GOLD" },
    { id: "cust-2", name: "Beta Industries", email: "info@betaindustries.com", phone: "+1-555-0102", tier: "SILVER" },
    { id: "cust-3", name: "Northwind Traders", email: "hello@northwind.com", phone: "+1-555-0103", tier: "BRONZE" },
    { id: "cust-4", name: "Globex Enterprises", email: "procurement@globex.com", phone: "+1-555-0104", tier: "GOLD" },
    { id: "cust-5", name: "TechCorp Solutions", email: "sales@techcorp.com", phone: "+1-555-0105", tier: "SILVER" }
  ];

  for (const c of customers) {
    await prisma.customer.upsert({
      where: { id: c.id },
      update: {},
      create: { ...c, companyId: company.id, status: "ACTIVE" }
    });
  }

  // Link customer user
  await prisma.user.upsert({
    where: { email: "customer@abc.local" },
    update: { customerId: "cust-1" },
    create: {
      companyId: company.id,
      customerId: "cust-1",
      name: "Acme Customer",
      email: "customer@abc.local",
      passwordHash,
      role: "CUSTOMER"
    }
  });

  // ==================== PRODUCTS ====================
  const products = [
    { id: "prod-1", sku: "LAP-DELL-001", name: "Dell XPS 15 Laptop", category: "HARDWARE", type: "PRODUCT", basePrice: 1200, taxRate: 18 },
    { id: "prod-2", sku: "LAP-HP-001", name: "HP EliteBook 840", category: "HARDWARE", type: "PRODUCT", basePrice: 950, taxRate: 18 },
    { id: "prod-3", sku: "MON-DELL-001", name: "Dell 27-inch Monitor", category: "HARDWARE", type: "PRODUCT", basePrice: 450, taxRate: 18 },
    { id: "prod-4", sku: "DOCK-DELL-001", name: "Dell Docking Station", category: "HARDWARE", type: "PRODUCT", basePrice: 165, taxRate: 18 },
    { id: "prod-5", sku: "SVC-INSTALL-001", name: "Setup & Onboarding Service", category: "SERVICES", type: "SERVICE", basePrice: 450, taxRate: 18 },
    { id: "prod-6", sku: "SVC-WARRANTY-001", name: "Extended Warranty - 3 Year", category: "SERVICES", type: "SERVICE", basePrice: 240, taxRate: 18 },
    { id: "prod-7", sku: "SUB-SUPPORT-001", name: "24/7 Premium Support Plan", category: "SUBSCRIPTIONS", type: "SUBSCRIPTION", basePrice: 99, taxRate: 18 },
    { id: "prod-8", sku: "SUB-ANALYTICS-001", name: "Analytics & Reporting Add-on", category: "SUBSCRIPTIONS", type: "SUBSCRIPTION", basePrice: 590, taxRate: 18 },
    { id: "prod-9", sku: "SVC-SECURITY-001", name: "Enterprise Security Bundle", category: "SERVICES", type: "SERVICE", basePrice: 250, taxRate: 18 },
    { id: "prod-10", sku: "LAP-MAC-001", name: "MacBook Pro 14-inch", category: "HARDWARE", type: "PRODUCT", basePrice: 1999, taxRate: 18 }
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: { ...p, companyId: company.id, description: p.name }
    });
  }

  // ==================== DISCOUNT RULES ====================
  const discountRules = [
    { id: "rule-1", tier: "BRONZE", category: "HARDWARE", maxDiscount: 5 },
    { id: "rule-2", tier: "BRONZE", category: "SERVICES", maxDiscount: 5 },
    { id: "rule-3", tier: "BRONZE", category: "SUBSCRIPTIONS", maxDiscount: 5 },
    { id: "rule-4", tier: "SILVER", category: "HARDWARE", maxDiscount: 10 },
    { id: "rule-5", tier: "SILVER", category: "SERVICES", maxDiscount: 8 },
    { id: "rule-6", tier: "SILVER", category: "SUBSCRIPTIONS", maxDiscount: 10 },
    { id: "rule-7", tier: "GOLD", category: "HARDWARE", maxDiscount: 15 },
    { id: "rule-8", tier: "GOLD", category: "SERVICES", maxDiscount: 10 },
    { id: "rule-9", tier: "GOLD", category: "SUBSCRIPTIONS", maxDiscount: 12 }
  ];

  for (const rule of discountRules) {
    await prisma.discountRule.upsert({
      where: { id: rule.id },
      update: {},
      create: { ...rule, companyId: company.id }
    });
  }

  // ==================== WAREHOUSES ====================
  const warehouses = [
    { id: "wh-1", name: "Main Warehouse", city: "Ahmedabad" },
    { id: "wh-2", name: "East Depot", city: "Mumbai" },
    { id: "wh-3", name: "North Distribution Center", city: "Delhi" }
  ];

  for (const w of warehouses) {
    await prisma.warehouse.upsert({
      where: { id: w.id },
      update: {},
      create: { ...w, companyId: company.id }
    });
  }

  // ==================== INVENTORY ====================
  const inventoryData = [
    { warehouseId: "wh-1", productId: "prod-1", quantity: 12 },
    { warehouseId: "wh-1", productId: "prod-2", quantity: 8 },
    { warehouseId: "wh-2", productId: "prod-1", quantity: 5 },
    { warehouseId: "wh-2", productId: "prod-2", quantity: 3 },
    { warehouseId: "wh-3", productId: "prod-1", quantity: 2 },
    { warehouseId: "wh-3", productId: "prod-2", quantity: 4 },
    { warehouseId: "wh-1", productId: "prod-3", quantity: 15 },
    { warehouseId: "wh-1", productId: "prod-4", quantity: 20 },
    { warehouseId: "wh-2", productId: "prod-3", quantity: 7 },
    { warehouseId: "wh-2", productId: "prod-4", quantity: 3 },
    { warehouseId: "wh-3", productId: "prod-3", quantity: 10 },
    { warehouseId: "wh-3", productId: "prod-4", quantity: 5 },
    { warehouseId: "wh-1", productId: "prod-5", quantity: 999 },
    { warehouseId: "wh-1", productId: "prod-6", quantity: 999 },
    { warehouseId: "wh-1", productId: "prod-10", quantity: 3 },
    { warehouseId: "wh-2", productId: "prod-10", quantity: 2 }
  ];

  for (const inv of inventoryData) {
    await prisma.inventory.upsert({
      where: {
        warehouseId_productId: {
          warehouseId: inv.warehouseId,
          productId: inv.productId
        }
      },
      update: { quantity: inv.quantity },
      create: { ...inv, companyId: company.id }
    });
  }

  // ==================== SUBSCRIPTION PLANS ====================
  const plans = [
    { id: "plan-1", name: "24/7 Premium Support", cadence: "Monthly", price: 99, prorationRule: "Daily proration", cancellationRule: "Full refund within 30 days", status: "Active" },
    { id: "plan-2", name: "Analytics & Reporting Add-on", cadence: "Yearly", price: 590, prorationRule: "Daily proration", cancellationRule: "Partial refund for unused months", status: "Active" },
    { id: "plan-3", name: "Enterprise Security Bundle", cadence: "Quarterly", price: 250, prorationRule: "No proration", cancellationRule: "Non-refundable after 7 days", status: "Inactive" }
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { id: plan.id },
      update: {},
      create: { ...plan, products: { connect: [{ id: "prod-7" }, { id: "prod-8" }] } }
    });
  }

  // ==================== QUOTATIONS ====================
  const quotations = [
    { id: "quo-1", customerId: "cust-1", status: "DRAFT", versionNumber: 1, subtotal: 24800, discountTotal: 4120, taxTotal: 1840, total: 22520, rulePassed: false, ruleViolations: { violations: ["Service discount exceeds category ceiling"] }, notes: "Initial quote for Acme Corp" },
    { id: "quo-2", customerId: "cust-2", status: "PENDING_APPROVAL", versionNumber: 1, subtotal: 9600, discountTotal: 1200, taxTotal: 720, total: 9120, rulePassed: false, ruleViolations: { violations: ["Hardware discount exceeds tier limit"] }, notes: "Beta Industries bulk order" },
    { id: "quo-3", customerId: "cust-3", status: "NEGOTIATION", versionNumber: 2, subtotal: 15200, discountTotal: 2280, taxTotal: 1140, total: 14060, rulePassed: false, ruleViolations: { violations: ["Subscription discount exceeds category ceiling"] }, notes: "Northwind negotiation in progress" },
    { id: "quo-4", customerId: "cust-4", status: "CUSTOMER_ACCEPTED", versionNumber: 1, subtotal: 41500, discountTotal: 4150, taxTotal: 3112.5, total: 40462.5, rulePassed: true, ruleViolations: null, notes: "Globex confirmed order" },
    { id: "quo-5", customerId: "cust-5", status: "APPROVED", versionNumber: 1, subtotal: 18400, discountTotal: 2760, taxTotal: 1380, total: 17020, rulePassed: true, ruleViolations: null, notes: "TechCorp approved quote" },
    { id: "quo-6", customerId: "cust-1", status: "DRAFT", versionNumber: 1, subtotal: 8200, discountTotal: 820, taxTotal: 615, total: 7995, rulePassed: true, ruleViolations: null, notes: "Acme Corp new hardware request" }
  ];

  for (const q of quotations) {
    const existing = await prisma.quotation.findUnique({ where: { id: q.id } });
    if (!existing) {
      await prisma.quotation.create({
        data: {
          ...q,
          companyId: company.id,
          createdById: salesUser.id,
          customerId: q.customerId
        }
      });
    }
  }

  // ==================== QUOTATION ITEMS ====================
  const quotationItems = [
    { quotationId: "quo-1", productId: "prod-1", quantity: 10, unitPrice: 1200, discountPercent: 12, taxRate: 18 },
    { quotationId: "quo-1", productId: "prod-5", quantity: 5, unitPrice: 450, discountPercent: 18, taxRate: 18 },
    { quotationId: "quo-1", productId: "prod-7", quantity: 5, unitPrice: 99, discountPercent: 5, taxRate: 18 },
    { quotationId: "quo-2", productId: "prod-2", quantity: 8, unitPrice: 950, discountPercent: 15, taxRate: 18 },
    { quotationId: "quo-2", productId: "prod-5", quantity: 4, unitPrice: 450, discountPercent: 10, taxRate: 18 },
    { quotationId: "quo-3", productId: "prod-8", quantity: 3, unitPrice: 590, discountPercent: 20, taxRate: 18 },
    { quotationId: "quo-3", productId: "prod-7", quantity: 6, unitPrice: 99, discountPercent: 15, taxRate: 18 },
    { quotationId: "quo-4", productId: "prod-1", quantity: 15, unitPrice: 1200, discountPercent: 10, taxRate: 18 },
    { quotationId: "quo-4", productId: "prod-3", quantity: 10, unitPrice: 450, discountPercent: 8, taxRate: 18 },
    { quotationId: "quo-5", productId: "prod-10", quantity: 5, unitPrice: 1999, discountPercent: 15, taxRate: 18 },
    { quotationId: "quo-5", productId: "prod-6", quantity: 5, unitPrice: 240, discountPercent: 10, taxRate: 18 },
    { quotationId: "quo-6", productId: "prod-3", quantity: 8, unitPrice: 450, discountPercent: 10, taxRate: 18 },
    { quotationId: "quo-6", productId: "prod-4", quantity: 4, unitPrice: 165, discountPercent: 5, taxRate: 18 }
  ];

  for (const item of quotationItems) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (product) {
      const lineTotal = item.unitPrice * item.quantity * (1 - item.discountPercent / 100);
      const discountAmount = item.unitPrice * item.quantity * (item.discountPercent / 100);
      const taxAmount = lineTotal * (item.taxRate / 100);
      await prisma.quotationItem.upsert({
        where: { id: `qitem-${item.quotationId}-${item.productId}` },
        update: {},
        create: {
          id: `qitem-${item.quotationId}-${item.productId}`,
          quotationId: item.quotationId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discountPercent: item.discountPercent,
          discountAmount: discountAmount,
          taxRate: item.taxRate,
          taxAmount: taxAmount,
          lineTotal: lineTotal + taxAmount
        }
      });
    }
  }

  // ==================== DEAL HEALTH ====================
  const dealHealthData = [
    { quotationId: "quo-1", riskScore: 68, riskLevel: "HIGH", reasons: JSON.stringify(["Service discount exceeds category ceiling"]), recommendations: JSON.stringify(["Review with manager"]) },
    { quotationId: "quo-2", riskScore: 45, riskLevel: "MEDIUM", reasons: JSON.stringify(["Hardware discount exceeds tier limit"]), recommendations: JSON.stringify(["Verify customer tier"]) },
    { quotationId: "quo-3", riskScore: 52, riskLevel: "MEDIUM", reasons: JSON.stringify(["Subscription discount exceeds category ceiling"]), recommendations: JSON.stringify(["Monitor negotiation"]) },
    { quotationId: "quo-4", riskScore: 28, riskLevel: "LOW", reasons: JSON.stringify(["All discounts within limits"]), recommendations: JSON.stringify(["Proceed to fulfillment"]) },
    { quotationId: "quo-5", riskScore: 35, riskLevel: "MEDIUM", reasons: JSON.stringify(["Multiple moderate discounts"]), recommendations: JSON.stringify(["Review margin impact"]) }
  ];

  for (const dh of dealHealthData) {
    await prisma.dealHealth.upsert({
      where: { id: `dh-${dh.quotationId}` },
      update: {},
      create: {
        id: `dh-${dh.quotationId}`,
        quotationId: dh.quotationId,
        riskScore: dh.riskScore,
        riskLevel: dh.riskLevel,
        reasons: dh.reasons,
        recommendations: dh.recommendations
      }
    });
  }

  // ==================== APPROVALS ====================
  const managerUser = await prisma.user.findUnique({ where: { email: "manager@dealflow360.local" } });
  const approvals = [
    { id: "app-1", quotationId: "quo-2", managerId: managerUser.id, approverRole: "MANAGER", status: "PENDING" },
    { id: "app-2", quotationId: "quo-1", managerId: managerUser.id, approverRole: "MANAGER", status: "PENDING" },
    { id: "app-3", quotationId: "quo-3", managerId: managerUser.id, approverRole: "MANAGER", status: "PENDING" },
    { id: "app-4", quotationId: "quo-5", managerId: managerUser.id, approverRole: "MANAGER", status: "APPROVED" }
  ];

  for (const app of approvals) {
    await prisma.approval.upsert({
      where: { id: app.id },
      update: {},
      create: app
    });
  }

  // ==================== NEGOTIATIONS ====================
  const negotiations = [
    { id: "neg-1", quotationId: "quo-3", customerId: "cust-3", requestedDiscountPercent: 20, message: "Can you offer a better discount?", versionNumber: 2 }
  ];

  for (const neg of negotiations) {
    await prisma.negotiation.upsert({
      where: { id: neg.id },
      update: {},
      create: neg
    });
  }

  console.log("✅ Seed complete!");
  console.log("");
  console.log("📧 admin@dealflow360.local / Admin@123");
  console.log("📧 sales@dealflow360.local / Admin@123");
  console.log("📧 manager@dealflow360.local / Admin@123");
  console.log("📧 finance@dealflow360.local / Admin@123");
  console.log("📧 customer@abc.local / Admin@123");
  console.log("");
  console.log("📦 Products:", products.length);
  console.log("👤 Customers:", customers.length);
  console.log("📋 Discount Rules:", discountRules.length);
  console.log("🏭 Warehouses:", warehouses.length);
  console.log("📊 Inventory:", inventoryData.length);
  console.log("📋 Subscription Plans:", plans.length);
  console.log("📋 Quotations:", quotations.length);
  console.log("📦 Quotation Items:", quotationItems.length);
  console.log("❤️ Deal Health:", dealHealthData.length);
  console.log("✅ Approvals:", approvals.length);
  console.log("💬 Negotiations:", negotiations.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());