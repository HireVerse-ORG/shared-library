import mongoose from 'mongoose';
import { IDatabase } from '../types/database.interface';

export class MongoDBConnection implements IDatabase {
  private connection?: mongoose.Connection;

  async connect(uri: string) {
    try {
      await mongoose.connect(uri);
      this.connection = mongoose.connection;
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection failed:', err);
      throw err;
    }
  }

  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
      }
    } catch (err) {
      console.error('Failed to disconnect from MongoDB:', err);
    }
  }
}