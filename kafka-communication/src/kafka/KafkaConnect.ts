import { AdminConfig, ConsumerConfig, Kafka, KafkaConfig, ProducerConfig } from 'kafkajs';

export class KafkaConnect {
    private kafka: Kafka;

    constructor(config: KafkaConfig) {
        this.kafka = new Kafka(config);
    }

    getProducer(config?: ProducerConfig) {
        return this.kafka.producer(config);
    }

    getConsumer(config: ConsumerConfig) {
        return this.kafka.consumer(config);
    }

    getAdmin(config?: AdminConfig) {
        return this.kafka.admin(config); 
    }
}
