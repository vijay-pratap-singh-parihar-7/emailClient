const { Given, When, Then, After } = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require("joi");

const sandbox = sinon.createSandbox()
const makeDeleteEmailFolderUseCase = require('./deleteEmailFolder');

const usersDb = {
    deleteEmailFolder: () => {
    },
};

const deleteEmailFolderStub = sandbox.stub(usersDb, 'deleteEmailFolder');
deleteEmailFolderStub.callsFake(function (args){
    console.log("no",args);
    console.log("no",this.folderId);
    expect(args).deep.equal({
        folderId: this.folderId
    })
    console.log("noo")
    return {id: 1};
}.bind(this));


After(() => {
    this.folderId = undefined;
    sandbox.resetHistory();
});


Given('There is an email folder id: {string}',
    (folderId) => {
        this.folderId = folderId || undefined;
    }
);


When('email folder is deleted', async () => {
    const deleteEmailFolderIds = makeDeleteEmailFolderUseCase({
        Joi,
        deleteEmailFolderDb: usersDb.deleteEmailFolder
    });
    
    try{
        this.folderId = await deleteEmailFolderIds({folderId: this.folderId});
    }
    catch(e){
        this.error = {
            name: e.name,
            message: e.message,
        };
    }
});

Then('It will throw error: {string} with message: "{string}" while deleting existing email Folder', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will deleting existing email folder with folder id : {string}', (deleteEmailFolderIds) => {
    console.log(this.result)
    expect(this.result).deep.equal(JSON.parse(deleteEmailFolderIds));
}
);


Then('deleteEmailFolder function will call {int} time while deleting existing email folder',
(deleteEmailFolderFunctionCallCount)=> {
    sinon.assert.callCount(deleteEmailFolderStub, deleteEmailFolderFunctionCallCount);
})