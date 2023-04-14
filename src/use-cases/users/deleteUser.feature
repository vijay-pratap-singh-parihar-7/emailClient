Feature: Delete Existing User.

    Scenario Outline: Try to delete existing User with invalid id, then throw error.
        Given There is an user id: "<id>"
        When user is deleted
        Then It will throw error: "<error>" with message: "<message>" while deleting existing user
        And deleteUser function will call <deleteUserFunctionCallCount> time while deleting existing user

        Examples:
            | id | deleteUserFunctionCallCount | error           | message                 |
            |    | 0                           | ValidationError | '"id" is required'      |
            | a  | 0                           | ValidationError | '"id" must be a number' |