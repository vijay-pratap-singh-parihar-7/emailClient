Feature: Create New EmailFolder.

    Scenario Outline: Try to create new EmailFolder with invalid details, then it will throw error.
        Given Email Folder details folder name: "<folderName>", userId: "<userId>", providerId: "<providerId>" to create new email folder
        When Try to create new email folder
        Then It will throw error: "<error>" with message: "<message>" while creating new email folder
        And createEmailFolder function will call <createEmailFolderFunctionCallCount> time while creating new email folder

        Examples:
            | folderName | userId | providerId | createEmailFolderFunctionCallCount | error           | message                         |
            |            |        |            | 0                                  | ValidationError | '"folderName" is required'      |
            | Vijay      |        |            | 0                                  | ValidationError | '"userId" is required'          |
            | Vijay      | a      |            | 0                                  | ValidationError | '"userId" must be a number'     |
            | Vijay      | 1      | a          | 0                                  | ValidationError | '"providerId" must be a number' |



    Scenario Outline: Try to create new EmailFolder with invalid details, then it will throw error.
        Given Email Folder details folder name: "<folderName>", userId: "<userId>", providerId: "<providerId>" to create new email folder
        When Try to create new email folder
        Then It will create new email Folder with details: "<newEmailFolderDetail>"
        And createEmailFolder function will call <createEmailFolderFunctionCallCount> time while creating new email folder

        Examples:
            | folderName | userId | providerId | createEmailFolderFunctionCallCount | newEmailFolderDetail |
            | Vijay      | 1      | 1          | 1                                  | '{"id": 1}'          |

