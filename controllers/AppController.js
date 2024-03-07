// controllers/AppController.js

import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static async getStatus(req, res) {
    const redisAlive = await redisClient.isAlive();
    const dbAlive = await dbClient.isAlive();

    return res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();

    return res.status(200).json({ users: nbUsers, files: nbFiles });
  }
}

export default AppController;
