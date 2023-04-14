const { Given, When, Then, After } = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require("joi");

const sandbox = sinon.createSandbox()
const makeUpdateUserUseCase = require('./updateUser');

const usersDb = {
    updateUserDb: () => {
    },
};

const updateUserStub = sandbox.stub(usersDb, 'updateUserDb');
updateUserStub.callsFake(function (args) {
    expect(args).to.deep.equal({
        id: this.id,
        name: this.name
    });
    return { "id": 1 };
}.bind(this));

After(() => {
    this.id = undefined;
    this.name = undefined;

    sandbox.resetHistory();
});

Given('User details id: {string} and name: {string} to update existing user',
    (id, name) => {
        this.id = id || undefined;
        this.name = name || undefined;
    },
);

When('Try to update existing user', async () => {
    const updateUserDb = makeUpdateUserUseCase({
        Joi,
        updateUserDb:usersDb.updateUserDb
    });

    try {
        this.result = await updateUserDb({
            id: this.id,
            name: this.name
        });
    }
    catch (e) {
        this.error = {
            name: e.name,
            message: e.message,
        };
    }
});

Then('It will throw error: {string} with message: "{string}" while updating existing user', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will updating existing user with details: {string}', (updateUserDetails) => {
    expect(this.result).deep.equal(JSON.parse(updateUserDetails));
}
);

Then('updateUser function will call {int} time while updating existing user',
    (updateUserFunctionCallCount) => {
        sinon.assert.callCount(updateUserStub, updateUserFunctionCallCount);
    },
);



