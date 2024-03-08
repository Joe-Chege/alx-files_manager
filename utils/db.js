import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.db = null; // The database instance

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log(`Connected to MongoDB: ${DATABASE}`);
      this.db = this.client.db(`${DATABASE}`);
    } catch (err) {
      console.error(`Error connecting to MongoDB: ${err}`);
    }
  }

  async isAlive() {
    try {
      // Check if the client and topology are available and connected
      if (this.client && this.client.topology && this.client.topology.isConnected()) {
        await this.client.db().command({ ping: 1 });
        return true;
      }
      return false;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return false;
    }
  }

  async nbUsers() {
    try {
      const users = this.db.collection('users');
      const usersNum = await users.countDocuments();
      return usersNum;
    } catch (error) {
      console.error('Error counting users:', error);
      return -1;
    }
  }

  async nbFiles() {
    try {
      const files = this.db.collection('files');
      const filesNum = await files.countDocuments();
      return filesNum;
    } catch (error) {
      console.error('Error counting files:', error);
      return -1;
    }
  }

  async close() {
    try {
      await this.client.close();
      console.log(`Closed MongoDB connection: ${DATABASE}`);
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
