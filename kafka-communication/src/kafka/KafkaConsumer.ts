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

  async subscribeToTopics(subscriptions: { topic: KafkaTopics, handler: (message: any) => void }[]) {
    const topicHandlers = new Map<KafkaTopics, (message: any) => void>();
    
    for (const { topic, handler } of subscriptions) {
      await this.consumer.subscribe({ topic, fromBeginning: true });
      topicHandlers.set(topic, handler); 
    }
  
    // Start consuming messages
    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const value = message.value?.toString();
  
        if (value) {
          try {
            const parsedMessage = JSON.parse(value);
  
            const handler = topicHandlers.get(topic as KafkaTopics);
  
            if (handler) {
              handler(parsedMessage); 
            }
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
