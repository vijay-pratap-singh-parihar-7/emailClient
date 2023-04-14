Feature: Update Existing User.

    Scenario Outline: Try to Update existing user with invalid name, then it will throw error.
        Given User details id: "<id>" and name: "<name>" to update existing user
        When Try to update existing user
        Then It will throw error: "<error>" with message: "<message>" while updating existing user
        And updateUser function will call <updateUserFunctionCallCount> time while updating existing user

        Examples:
            | id | name | updateUserFunctionCallCount | error           | message                 |
            |    |      | 0                           | ValidationError | '"id" is required'      |
            | a  |      | 0                           | ValidationError | '"id" must be a number' |
            | 2  |      | 0                           | ValidationError | '"name" is required'    |


    Scenario Outline: Try to Update existing user with invalid name, then it will throw error.
        Given User details id: "<id>" and name: "<name>" to update existing user
        When Try to update existing user
        Then It will updating existing user with details: <updateUserDetails>
        And updateUser function will call <updateUserFunctionCallCount> time while updating existing user

        Examples:
            | id | name        | updateUserDetails | updateUserFunctionCallCount |
            | 1  | vijay singh | '{ "id": 1}'      | 1                           |