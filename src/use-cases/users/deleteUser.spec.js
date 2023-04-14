const { Given, When, Then, After } = require('cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require("joi");

const sandbox = sinon.createSandbox()
const makeDeleteUserUseCase = require('./deleteUser');
const { overArgs } = require('lodash');

const usersDb = {
    deleteUser: () => {
    },
};

const deleteUserStub = sandbox.stub(usersDb, 'deleteUser');
deleteUserStub.callsFake(function (args){
    console.log(args);
    expect(args).to.deep.equal({
        id: this.id
    })
    return {id: 1};
}.bind(this));


After(() => {
    this.id = undefined;
    sandbox.resetHistory();
});


Given('There is an user id: {string}',
    (id) => {
        this.id = id || undefined;
    }
);


When('user is deleted', async () => {
    const deleteUser = makeDeleteUserUseCase({
        Joi,
        usersDb
    });
    
    try{
        this.id = await deleteUser({id: this.id});
    }
    catch(e){
        // console.log(e)
        this.error = {
            name: e.name,
            message: e.message,
        };
    }
});

Then('It will throw error: {string} with message: "{string}" while deleting existing user', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});


Then('deleteUser function will call {int} time while deleting existing user',
(deleteUserFunctionCallCount)=> {
    sinon.assert.callCount(deleteUserStub, deleteUserFunctionCallCount);
})