Feature: Update Existing email Folder.

    Scenario Outline: Try to Update existing email Folder with invalid name, then it will throw error.
        Given User details id: "<folderId>" and folder Name: "<folderName>" to update existing email Folder
        When Try to update existing email folder
        Then It will throw error: "<error>" with message: "<message>" while updating existing email folder
        And updateEmailFolder function will call <updateEmailFolderFunctionCallCount> time while updating existing email folder

        Examples:
            | folderId | folderName | updateEmailFolderFunctionCallCount | error           | message                       |
            |          |            | 0                                  | ValidationError | '"folderId" is required'      |
            | a        |            | 0                                  | ValidationError | '"folderId" must be a number' |
            | 2        |            | 0                                  | ValidationError | '"folderName" is required'    |


    Scenario Outline: Try to Update existing email Folder with valid name, then it will throw error.
        Given User details id: "<folderId>" and folder Name: "<folderName>" to update existing email Folder
        When Try to update existing email folder
        Then It will updating existing email folder Name with details: <updateEmailFolderDetails>
        And updateEmailFolder function will call <updateEmailFolderFunctionCallCount> time while updating existing email folder

        Examples:
            | folderId | folderName | updateEmailFolderDetails | updateEmailFolderFunctionCallCount |
            | 1        | vijayngh   | '{ "id": 1}'             | 1                                  |