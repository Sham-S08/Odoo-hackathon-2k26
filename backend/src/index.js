import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './utils/prisma.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// TEST: Create a test user
app.post('/api/test/create-user', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        companyId: 'demo-company',  // Use existing company
        name: 'Test User',
        email: `test_${Date.now()}@example.com`,
        passwordHash: 'test123',
        role: 'SALES',
        active: true
      }
    });
    
    res.json({
      success: true,
      message: 'Test user created successfully!',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message
    });
  }
});

// TEST: Create a test customer
app.post('/api/test/create-customer', async (req, res) => {
  try {
    const customer = await prisma.customer.create({
      data: {
        companyId: 'demo-company',
        name: 'Test Customer',
        email: `customer_${Date.now()}@example.com`,
        tier: 'GOLD',
        status: 'ACTIVE'
      }
    });
    
    res.json({
      success: true,
      message: 'Test customer created successfully!',
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create customer',
      error: error.message
    });
  }
});

// TEST: Create a test product
app.post('/api/test/create-product', async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: {
        companyId: 'demo-company',
        sku: `TEST_${Date.now()}`,
        name: 'Test Product',
        description: 'This is a test product',
        category: 'HARDWARE',
        type: 'PRODUCT',
        basePrice: 999.99,
        taxRate: 18
      }
    });
    
    res.json({
      success: true,
      message: 'Test product created successfully!',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// TEST: Get all users
app.get('/api/test/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        createdAt: true
      }
    });
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
});

// TEST: Get all customers
app.get('/api/test/customers', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json({
      success: true,
      count: customers.length,
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
      error: error.message
    });
  }
});

// TEST: Get all products
app.get('/api/test/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// TEST: Get all warehouses
app.get('/api/test/warehouses', async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany();
    res.json({
      success: true,
      count: warehouses.length,
      data: warehouses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch warehouses',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
  console.log(`✅ Test endpoints:`);
  console.log(`   POST /api/test/create-user`);
  console.log(`   POST /api/test/create-customer`);
  console.log(`   POST /api/test/create-product`);
  console.log(`   GET  /api/test/users`);
  console.log(`   GET  /api/test/customers`);
  console.log(`   GET  /api/test/products`);
  console.log(`   GET  /api/test/warehouses`);
});