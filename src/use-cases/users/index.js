const Joi = require("joi");
const dataAccess = require('../../data-access-cockroachDb');
const makeGetAllUsersUseCase = require('./getAllUsers');
const makeCreateUserUseCase = require('./createUser');
const makeUpdateUserUseCase = require('./updateUser');
const makeDeleteUserUseCase = require('./deleteUser');
const makeCreateDefaultEmailFoldersUseCase = require("./createDefaultEmailFolders");
const makeDeleteDefaultEmailFoldersUseCase = require('./deleteDefaultEmailFolders')

const getAllUsers = makeGetAllUsersUseCase({
    getAllUsersDb: dataAccess.users.getAllUsers
});

const createUserUseCase = makeCreateUserUseCase({
    Joi,
    usersDb:dataAccess.users
});


const updateUser = makeUpdateUserUseCase({
    Joi,
    updateUserDb: dataAccess.users.updateUser
});

const deleteUser = makeDeleteUserUseCase({
    Joi,
    deleteUserDb: dataAccess.users.deleteUser
});

const createDefaultEmailFolders = makeCreateDefaultEmailFoldersUseCase({
    createEmailFoldersDb: dataAccess.emailFolders.createEmailFolder
});

const deleteDefaultEmailFolders = makeDeleteDefaultEmailFoldersUseCase({
    emailFolderDb: dataAccess.emailFolders
})

module.exports = Object.freeze({
    getAllUsers,
    createUserUseCase,
    updateUser,
    deleteUser,
    createDefaultEmailFolders,
    deleteDefaultEmailFolders
})