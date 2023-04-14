const { Kafka } = require('kafkajs');
const usersUseCase = require("../use-cases/users")

const kafka = new Kafka({
    clientId: "client-users",
    brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({
    groupId: 'userCreateGroup'
})
const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "first-topic", fromBeginning: true });
    
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const id = parseInt(message.value.toString());
            await usersUseCase.createDefaultEmailFolders(id);
        }
    });
}

run().catch(console.error);