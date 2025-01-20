import { ProducerConfig } from 'kafkajs';
import { ServerEvent } from '../types';
import { KafkaConnect } from './KafkaConnect';

export class KafkaProducer {
  private producer;

  constructor(private kafkaConnect: KafkaConnect, config?: ProducerConfig) {
    this.producer = this.kafkaConnect.getProducer(config);
  }

  async connect() {
    await this.producer.connect();
  }

  async sendEvent<T>(event: ServerEvent<T>) {
    const { topic, message } = event;
    try {
      await this.producer.send({
        topic,
        messages: [{
          key: message.key,
          value: JSON.stringify(message.value),
          headers: message.headers,
          partition: message.partition,
          timestamp: message.timestamp
        }],
      });
    } catch (error: any) {
      throw new Error(error?.message || "Failed to send event")
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
