import { ITopicConfig, Admin, AdminConfig } from 'kafkajs';
import { KafkaConnect } from './KafkaConnect';

export class KafkaAdmin {
  private admin: Admin;

  constructor(private kafkaConnect: KafkaConnect, config?: AdminConfig) {
    this.admin = this.kafkaConnect.getAdmin(config); 
  }

  async connect() {
    await this.admin.connect();
    console.log('Kafka Admin connected');
  }

  async disconnect() {
    await this.admin.disconnect();
    console.log('Kafka Admin disconnected');
  }

  async createTopics(topics: ITopicConfig[]) {
    try {
      const result = await this.admin.createTopics({
        topics,
        waitForLeaders: true, 
      });

      if (result) {
        console.log('Topics created successfully:', topics.map(t => t.topic));
      } else {
        console.log('No topics were created (they may already exist)');
      }
    } catch (error) {
      console.error('Error creating topics:', error);
      throw error;
    }
  }

  async deleteTopics(topics: string[]) {
    try {
      await this.admin.deleteTopics({
        topics,
      });
      console.log('Topics deleted successfully:', topics);
    } catch (error) {
      console.error('Error deleting topics:', error);
      throw error;
    }
  }

  async listTopics(): Promise<string[]> {
    try {
      const topics = await this.admin.listTopics();
      return topics;
    } catch (error) {
      console.error('Error listing topics:', error);
      throw error;
    }
  }
}
