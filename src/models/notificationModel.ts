import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: string; // ID of the user receiving the notification
  type: 'B2C' | 'B2B'; // Type of notification (B2C or B2B)
  message: string; // Notification message
  read: boolean; // Whether the notification has been read
  createdAt: Date; // Timestamp of when the notification was created
  role: 'buyer' | 'admin' | 'manager'; // Role of the user receiving the notification
  metadata?: {
    orderId?: string; // Optional: ID of the related order
    paymentId?: string; // Optional: ID of the related payment
    stockLevel?: number; // Optional: Stock level for B2B notifications
  };
}

const NotificationSchema: Schema = new Schema({
  userId: { type: String, required: true }, // User ID
  type: { type: String, enum: ['B2C', 'B2B'], required: true }, // Notification type
  message: { type: String, required: true }, // Notification message
  read: { type: Boolean, default: false }, // Read status
  createdAt: { type: Date, default: Date.now }, // Timestamp
  role: { type: String, enum: ['buyer', 'admin', 'manager'], required: true }, // User role
  metadata: {
    orderId: { type: String }, // Optional: Related order ID
    paymentId: { type: String }, // Optional: Related payment ID
    stockLevel: { type: Number }, // Optional: Stock level for B2B
  },
});

export default mongoose.model<INotification>('Notification', NotificationSchema);