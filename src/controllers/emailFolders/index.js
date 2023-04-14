const Joi = require('joi');
const useCases = require('../../use-cases');


const makeGetAllFoldersController = require('./getEmailFolders');
const makeCreateEmailFolderController = require('./createEmailFolder');
const makeUpdateEmailFolderController = require("./updateEmailFolder");
const makeDeleteEmailFolderController = require("./deleteEmailFolder")


const getAllEmailFoldersController = makeGetAllFoldersController({
    getEmailFolders: useCases.emailFolders.getEmailFoldersUseCase
});

const createEmailFolderController = makeCreateEmailFolderController({
    Joi,
    createEmailFolder: useCases.emailFolders.createEmailFolderUseCase
});

const updateEmailFolderController = makeUpdateEmailFolderController({
    Joi,
    updateEmailFolder: useCases.emailFolders.updateEmailFolderUseCase
});

const deleteEmailFolderController = makeDeleteEmailFolderController({
    Joi,
    deleteEmailFolder: useCases.emailFolders.deleteEmailFolderUseCase
})

module.exports = Object.freeze({
    getAllEmailFoldersController,
    createEmailFolderController,
    updateEmailFolderController,
    deleteEmailFolderController
})