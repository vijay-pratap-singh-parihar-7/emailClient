const { Given, When, Then, After } = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require("joi");

const sandbox = sinon.createSandbox()
const makeCreateUserUseCase = require('./createUser');

const usersDb = {
    createUser: () => {
    },
};

const createUserStub = sandbox.stub(usersDb, 'createUser');
createUserStub.callsFake(function (args) {
    expect(args).to.deep.equal({
        name: this.name,
        email: this.email,
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        password: this.password
    });

    return { id: 1 };
}.bind(this));

After(() => {
    this.name = undefined;
    this.email = undefined;
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.password = undefined;

    sandbox.resetHistory();
});

Given('User details name: {string}, email: {string}, accessToken: {string}, refreshToken: {string}, and password: {string} to create new user',
    (name, email, accessToken, refreshToken, password) => {
        this.name = name || undefined;
        this.email = email || undefined;
        this.accessToken = accessToken || undefined;
        this.refreshToken = refreshToken || undefined;
        this.password = password || undefined;
    },
);

When('Try to create new user', async () => {
    const createUser = makeCreateUserUseCase({
        Joi,
        usersDb
    });

    try {
        this.result = await createUser({
            name: this.name,
            email: this.email,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            password: this.password
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

Then('It will throw error: {string} with message: "{string}" while creating new user', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});

Then('It will create new user with details: "{string}"', (newUserDetails) => {
    expect(this.result).deep.equal(JSON.parse(newUserDetails));
}
);

Then('createUser function will call {int} time while creating new user',
    (createUserFunctionCallCount) => {
        sinon.assert.callCount(createUserStub, createUserFunctionCallCount);
    },
);

