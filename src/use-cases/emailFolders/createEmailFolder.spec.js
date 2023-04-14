const { Given, When, Then, After } = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require("joi");

const sandbox = sinon.createSandbox()
const makeCreateEmailFolderUseCase = require('./createEmailFolder');

const usersDb = {
    createEmailFolderDb: () => {
    },
};

const createEmailFolderDbStub = sandbox.stub(usersDb, 'createEmailFolderDb');
createEmailFolderDbStub.callsFake(function (args) {
    expect(args).to.deep.equal({
        folderName: this.folderName,
        userId: this.userId,
        providerId: this.providerId
    });

    return { id: 1 };
}.bind(this));

After(() => {
    this.folderName = undefined;
    this.userId = undefined;
    this.providerId = undefined;

    sandbox.resetHistory();
});

Given('Email Folder details folder name: {string}, userId: {string}, providerId: {string} to create new email folder',
    (folderName, userId, providerId) => {
        this.folderName = folderName || undefined;
        this.userId = userId || undefined;
        this.providerId = providerId || undefined;
    },
);

When('Try to create new email folder', async () => {
    const createEmailFolderDb = makeCreateEmailFolderUseCase({
        Joi,
        createEmailFolderDb: usersDb.createEmailFolderDb
    });

    try {
        this.result = await createEmailFolderDb({
            folderName: this.folderName,
            userId: this.userId,
            providerId: this.providerId
        });
    }
    catch (e) {
        console.log(e.name);
        this.error = {
            name: e.name,
            message: e.message,
        };
    }
});

Then('It will throw error: {string} with message: "{string}" while creating new email folder', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will create new email Folder with details: "{string}"', (newEmailFolderDetail) => {
    expect(this.result).deep.equal(JSON.parse(newEmailFolderDetail));
}
);

Then('createEmailFolder function will call {int} time while creating new email folder',
    (createEmailFolderFunctionCallCount) => {
        sinon.assert.callCount(createEmailFolderDbStub, createEmailFolderFunctionCallCount);
    },
);

