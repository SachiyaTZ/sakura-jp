"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const preferenceRoutes_1 = __importDefault(require("./routes/preferenceRoutes"));
const wishlistRoutes_1 = __importDefault(require("./routes/wishlistRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const pricingRoutes_1 = __importDefault(require("./routes/pricingRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const bulkOrderRoutes_1 = __importDefault(require("./routes/bulkOrderRoutes"));
const purchaseOrderRoutes_1 = __importDefault(require("./routes/purchaseOrderRoutes"));
const returnRoutes_1 = __importDefault(require("./routes/returnRoutes"));
const rfqRoutes_1 = __importDefault(require("./routes/rfqRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./routes/subscriptionRoutes"));
const discountRoutes_1 = __importDefault(require("./routes/discountRoutes"));
const customPricingRoutes_1 = __importDefault(require("./routes/customPricingRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const paymentTermRoutes_1 = __importDefault(require("./routes/paymentTermRoutes"));
const backorderRoutes_1 = __importDefault(require("./routes/backorderRoutes"));
const reservedStockRoutes_1 = __importDefault(require("./routes/reservedStockRoutes"));
const warehouseRoutes_1 = __importDefault(require("./routes/warehouseRoutes"));
const shippingRoutes_1 = __importDefault(require("./routes/shippingRoutes"));
const analyticsRoutes_1 = __importDefault(require("./routes/analyticsRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const securityRoutes_1 = __importDefault(require("./models/securityRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const subCategoryRoutes_1 = __importDefault(require("./routes/subCategoryRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api', addressRoutes_1.default);
app.use('/api', paymentRoutes_1.default);
app.use('/api', preferenceRoutes_1.default);
app.use('/api', wishlistRoutes_1.default);
app.use('/api', orderRoutes_1.default);
app.use('/api/companies', companyRoutes_1.default);
app.use('/api/pricing', pricingRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
app.use('/api/returns', returnRoutes_1.default);
app.use('/api/rfqs', rfqRoutes_1.default);
app.use('/api/bulk-orders', bulkOrderRoutes_1.default);
app.use('/api/subscriptions', subscriptionRoutes_1.default);
app.use('/api/purchase-orders', purchaseOrderRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/discounts', discountRoutes_1.default);
app.use('/api/payment-terms', paymentTermRoutes_1.default);
app.use('/api/custom-pricing', customPricingRoutes_1.default);
app.use('/api/invoices', invoiceRoutes_1.default);
app.use('/api/shipping', shippingRoutes_1.default);
app.use('/api/warehouses', warehouseRoutes_1.default);
app.use('/api/reserved-stock', reservedStockRoutes_1.default);
app.use('/api/backorders', backorderRoutes_1.default);
app.use('/api/analytics', analyticsRoutes_1.default);
app.use('/api/notifications', notificationRoutes_1.default);
app.use('/api/security', securityRoutes_1.default);
app.use('/api/brands', brandRoutes_1.default); // Mount brand routes
app.use('/api/categories', categoryRoutes_1.default); // Mount category routes
app.use('/api/subcategories', subCategoryRoutes_1.default); // Mount subcategory routes
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));
mongoose_1.default.connect(process.env.MONGODB_URI || 'https://sakura-petals-backend-server.mongo.cosmos.azure.com:443/ecommerce')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
