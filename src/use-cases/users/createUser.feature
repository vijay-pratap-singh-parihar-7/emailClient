Feature: Create New User.

    Scenario Outline: Try to create new user with invalid details, then it will throw error.
        Given User details name: "<name>", email: "<email>", accessToken: "<accessToken>", refreshToken: "<refreshToken>", and password: "<password>" to create new user
        When Try to create new user
        Then It will throw error: "<error>" with message: "<message>" while creating new user
        And createUser function will call <createUserFunctionCallCount> time while creating new user

        Examples:
          | name         | email              | accessToken   | refreshToken | password | createUserFunctionCallCount      | error           | message                                                |
          |              |                    |               |              |          | 0                                | ValidationError | '"name" is required'                                   |
          | Vijay pratap |                    |               |              |          | 0                                | ValidationError | '"email" is required'                                  |
          | Vijay pratap | vijay              |               |              |          | 0                                | ValidationError | '"email" must be a valid email'                        |
          | Vijay pratap | vijay@rapidops.com |               |              |          | 0                                | ValidationError | '"accessToken" is required'                            |
          | Vijay pratap | vijay@rapidops.com | gdfdf         |              |          | 0                                | ValidationError | '"refreshToken" is required'                           |
          | Vijay pratap | vijay@rapidops.com | gdfdf         | hhhh         |          | 0                                | ValidationError | '"password" is required'                               |
          | Vijay pratap | vijay@rapidops.com | gdfdf         | hhhh         | vijay@2  | 0                                | ValidationError | '"password" length must be at least 8 characters long' |


    Scenario Outline: Try to create new user with valid inputs, then it will throw error.
        Given User details name: "<name>", email: "<email>", accessToken: "<accessToken>", refreshToken: "<refreshToken>", and password: "<password>" to create new user
        When Try to create new user
        Then It will create new user with details: "<newUserDetails>"
        And createUser function will call <createUserFunctionCallCount> time while creating new user

         Examples:
          | name         | email              | accessToken   | refreshToken | password | newUserDetails | createUserFunctionCallCount      |       
          | Vijay pratap | vijay@rapidops.com | gdfdf         | hhhh         | vijay@214| '{ "id": 1}'   | 1                                |