import express from 'express';
import userRoutes from './routes/userRoutes';
import addressRoutes from './routes/addressRoutes';
import paymentRoutes from './routes/paymentRoutes';
import preferenceRoutes from './routes/preferenceRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import orderRoutes from './routes/orderRoutes';
import companyRoutes from './routes/companyRoutes';
import pricingRoutes from './routes/pricingRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import bulkOrderRoutes from './routes/bulkOrderRoutes';
import purchaseOrderRoutes from './routes/purchaseOrderRoutes';
import returnRoutes from './routes/returnRoutes';
import rfqRoutes from './routes/rfqRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import discountRoutes from './routes/discountRoutes';
import customPricingRoutes from './routes/customPricingRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import paymentTermRoutes from './routes/paymentTermRoutes';
import backorderRoutes from './routes/backorderRoutes';
import reservedStockRoutes from './routes/reservedStockRoutes';
import warehouseRoutes from './routes/warehouseRoutes';
import shippingRoutes from './routes/shippingRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import notificationRoutes from './routes/notificationRoutes';
import securityRoutes from './models/securityRoutes';
import mongoose from 'mongoose';
import brandRoutes from './routes/brandRoutes';
import categoryRoutes from './routes/categoryRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', addressRoutes);
app.use('/api', paymentRoutes);
app.use('/api', preferenceRoutes);
app.use('/api', wishlistRoutes);
app.use('/api', orderRoutes);

app.use('/api/companies', companyRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use('/api/returns', returnRoutes);
app.use('/api/rfqs', rfqRoutes);
app.use('/api/bulk-orders', bulkOrderRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);

app.use('/api/payments', paymentRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/payment-terms', paymentTermRoutes);
app.use('/api/custom-pricing', customPricingRoutes);
app.use('/api/invoices', invoiceRoutes);

app.use('/api/shipping', shippingRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/reserved-stock', reservedStockRoutes);
app.use('/api/backorders', backorderRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use('/api/notifications', notificationRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/brands', brandRoutes); // Mount brand routes
app.use('/api/categories', categoryRoutes); // Mount category routes
app.use('/api/subcategories', subCategoryRoutes); // Mount subcategory routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

mongoose.connect(process.env.MONGODB_URI || 'https://sakura-petals-backend-server.mongo.cosmos.azure.com:443/ecommerce')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));