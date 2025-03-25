import { Request, Response } from 'express';
import SalesReport from '../models/SalesReport';
import CustomerBehavior from '../routes/CustomerBehavior';
import SalesPerformance from '../models/SalesPerformance';
import InventoryTurnover from '../models/InventoryTurnover';
import Dashboard from '../models/Dashboard';

export const createSalesReport = async (req: Request, res: Response): Promise<void> => {
  const { date, totalSales, totalOrders, averageOrderValue } = req.body;

  try {
    const salesReport = new SalesReport({ date, totalSales, totalOrders, averageOrderValue });
    await salesReport.save();
    res.status(201).json({ message: 'Sales report created successfully', salesReport });
  } catch (error) {
    res.status(500).json({ error: 'Error creating sales report' });
  }
};

export const getSalesReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const salesReports = await SalesReport.find();
    res.json(salesReports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sales reports' });
  }
};

export const createCustomerBehavior = async (req: Request, res: Response): Promise<void> => {
    const { userId, totalOrders, totalSpent, lastPurchaseDate } = req.body;
  
    try {
      const customerBehavior = new CustomerBehavior({ userId, totalOrders, totalSpent, lastPurchaseDate });
      await customerBehavior.save();
      res.status(201).json({ message: 'Customer behavior data created successfully', customerBehavior });
    } catch (error) {
      res.status(500).json({ error: 'Error creating customer behavior data' });
    }
};
  
  export const getCustomerBehavior = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerBehavior = await CustomerBehavior.find().populate('userId');
      res.json(customerBehavior);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching customer behavior data' });
    }
};

export const createSalesPerformance = async (req: Request, res: Response): Promise<void> => {
    const { companyId, totalSales, totalOrders, averageOrderValue } = req.body;
  
    try {
      const salesPerformance = new SalesPerformance({ companyId, totalSales, totalOrders, averageOrderValue });
      await salesPerformance.save();
      res.status(201).json({ message: 'Sales performance data created successfully', salesPerformance });
    } catch (error) {
      res.status(500).json({ error: 'Error creating sales performance data' });
    }
};
  
export const getSalesPerformance = async (req: Request, res: Response): Promise<void> => {
    try {
      const salesPerformance = await SalesPerformance.find().populate('companyId');
      res.json(salesPerformance);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching sales performance data' });
    }
};

export const createInventoryTurnover = async (req: Request, res: Response): Promise<void> => {
    const { productId, turnoverRate, date } = req.body;
  
    try {
      const inventoryTurnover = new InventoryTurnover({ productId, turnoverRate, date });
      await inventoryTurnover.save();
      res.status(201).json({ message: 'Inventory turnover data created successfully', inventoryTurnover });
    } catch (error) {
      res.status(500).json({ error: 'Error creating inventory turnover data' });
    }
};
  
export const getInventoryTurnover = async (req: Request, res: Response): Promise<void> => {
    try {
      const inventoryTurnover = await InventoryTurnover.find().populate('productId');
      res.json(inventoryTurnover);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching inventory turnover data' });
    }
};

export const createDashboard = async (req: Request, res: Response): Promise<void> => {
    const { companyId, widgets } = req.body;
  
    try {
      const dashboard = new Dashboard({ companyId, widgets });
      await dashboard.save();
      res.status(201).json({ message: 'Dashboard created successfully', dashboard });
    } catch (error) {
      res.status(500).json({ error: 'Error creating dashboard' });
    }
};
  
export const getDashboard = async (req: Request, res: Response): Promise<void> => {
    const { companyId } = req.params;
  
    try {
      const dashboard = await Dashboard.findOne({ companyId }).populate('companyId');
      res.json(dashboard);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching dashboard' });
    }
};