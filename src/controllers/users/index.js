const Joi = require('joi');
const useCases = require('../../use-cases');
const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: "client-users",
    brokers: ["localhost:9092"]
});

const producer = kafka.producer();


const makeGetAllUserController = require('./getAllUsers');
const makeCreateUserController = require('./createUsers');
const makeUpdateUserController = require('./updateUsers');
const makeDeleteUserController = require('./deleteUsers');


const getAllUsersController = makeGetAllUserController({
    getAllUsers: useCases.users.getAllUsers,
});

const createUserController = makeCreateUserController({
    Joi,
    createUserUseCase: useCases.users.createUserUseCase,
    producer
});

const updateUserController = makeUpdateUserController({
    Joi,
    updateUser: useCases.users.updateUser,
});

const deleteUserController = makeDeleteUserController({
    Joi,
    deleteUser: useCases.users.deleteUser,
    deleteDefaultEmailFolders: useCases.users.deleteDefaultEmailFolders
})

module.exports = Object.freeze({
    getAllUsersController,
    createUserController,
    updateUserController,
    deleteUserController
})