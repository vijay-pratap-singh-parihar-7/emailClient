const dataAccess = require("../../data-access-cockroachDb");
const Joi = require("joi");


const makeGetEmailFoldersUseCase = require("./getEmailFolders");
const makeCreateEmailFolderUseCase = require("./createEmailFolder");
const makeUpdateEmailFolderUseCase = require("./updateEmailFolder");
const makeDeleteEmailFolderController = require("./deleteEmailFolder");


const getEmailFoldersUseCase = makeGetEmailFoldersUseCase({
    getEmailFoldersDb: dataAccess.emailFolders.getEmailFolders,
});

const createEmailFolderUseCase = makeCreateEmailFolderUseCase({
    Joi,
    createEmailFolderDb: dataAccess.emailFolders.createEmailFolder,
});

const updateEmailFolderUseCase = makeUpdateEmailFolderUseCase({
    Joi,
    updateEmailFolderDb: dataAccess.emailFolders.updateEmailFolder,
});

const deleteEmailFolderUseCase = makeDeleteEmailFolderController({
    Joi,
    deleteEmailFolderDb: dataAccess.emailFolders.deleteEmailFolder
})


module.exports = Object.freeze({
    getEmailFoldersUseCase,
    createEmailFolderUseCase,
    updateEmailFolderUseCase,
    deleteEmailFolderUseCase
})