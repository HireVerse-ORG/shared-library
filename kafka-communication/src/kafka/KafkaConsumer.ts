import { ConsumerConfig } from 'kafkajs';
import { KafkaTopics } from '../events/topics';
import { KafkaConnect } from './KafkaConnect';

export class KafkaConsumer {
  private consumer;

  constructor(private kafkaConnect: KafkaConnect, config: ConsumerConfig) {
    this.consumer = this.kafkaConnect.getConsumer(config);
  }

  async connect() {
    await this.consumer.connect();
  }

  async subscribeToTopic<T>(topic: KafkaTopics, handler: (message: T) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const value = message.value?.toString();

        if (value) {
          try {
            const parsedMessage: T = JSON.parse(value);
            handler(parsedMessage);
          } catch (error) {
            console.error(`Failed to process message from topic: ${topic}. Error:`, error);
          }
        }
      },
    });
  }


  async disconnect() {
    await this.consumer.disconnect();
  }
}
