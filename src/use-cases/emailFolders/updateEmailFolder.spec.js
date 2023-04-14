const { Given, When, Then, After } = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require("joi");

const sandbox = sinon.createSandbox()
const makeUpdateEmailFolderUseCase = require('./updateEmailFolder');

const usersDb = {
    updateEmailFolderDb: () => {
    },
};

const updateEmailFolderDetailsStub = sandbox.stub(usersDb, 'updateEmailFolderDb');
updateEmailFolderDetailsStub.callsFake(function (args) {
    expect(args).to.deep.equal({
        folderId: this.folderId,
        folderName: this.folderName
    });
    return { "id": 1 };
}.bind(this));

After(() => {
    this.folderId = undefined;
    this.folderName = undefined;

    sandbox.resetHistory();
});

Given('User details id: {string} and folder Name: {string} to update existing email Folder',
    (folderId, folderName) => {
        this.folderId = folderId || undefined;
        this.folderName = folderName || undefined;
    },
);

When('Try to update existing email folder', async () => {
    const updateEmailFolder = makeUpdateEmailFolderUseCase({
        Joi,
        updateEmailFolderDb: usersDb.updateEmailFolderDb
    });

    try {
        this.result = await updateEmailFolder({
            folderId: this.folderId,
            folderName: this.folderName
        });
    }
    catch (e) {
        this.error = {
            name: e.name,
            message: e.message,
        };
    }
});

Then('It will throw error: {string} with message: "{string}" while updating existing email folder', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will updating existing email folder Name with details: {string}', (updateEmailFolderDetails) => {
    expect(this.result).deep.equal(JSON.parse(updateEmailFolderDetails));
}
);

Then('updateEmailFolder function will call {int} time while updating existing email folder',
    (updateEmailFolderFunctionCallCount) => {
        sinon.assert.callCount(updateEmailFolderDetailsStub, updateEmailFolderFunctionCallCount);
    },
);



