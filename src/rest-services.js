const express = require('express');
const controller = require('./controllers');
const router = express.Router();

function init(){
    initUsers();
    initEmail();
    initEmailFolder();
}

// Users
function initUsers(){
    router.get('/users', controller.userControllers.getAllUsersController);
    router.post('/users', controller.userControllers.createUserController);
    router.put('/users/:id', controller.userControllers.updateUserController);
    router.delete('/users/:id', controller.userControllers.deleteUserController);
}

// Emails
function initEmail(){
    router.get('/emailFolders/:userId', controller.emailFoldersController.getAllEmailFoldersController);
    router.post('/emailFolders/:userId', controller.emailFoldersController.createEmailFolderController);
    router.put('/emailFolders/:folderId', controller.emailFoldersController.updateEmailFolderController);
    router.delete('/emailFolders/:folderId', controller.emailFoldersController.deleteEmailFolderController);
}


// EmailFolder
function initEmailFolder(){}


init();
module.exports = router;
