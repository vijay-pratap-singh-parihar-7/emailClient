Feature: Delete Existing Email Folder.

    Scenario Outline: Try to delete existing email folder with invalid id, then throw error.
        Given There is an email folder id: "<folderId>"
        When email folder is deleted
        Then It will throw error: "<error>" with message: "<message>" while deleting existing email Folder
        And deleteEmailFolder function will call <deleteEmailFolderFunctionCallCount> time while deleting existing email folder

        Examples:
            | folderId | deleteEmailFolderFunctionCallCount | error           | message                       |
            |          | 0                                  | ValidationError | '"folderId" is required'      |
            | a        | 0                                  | ValidationError | '"folderId" must be a number' |



    Scenario Outline: Try to delete existing email folder with valid id.
        Given There is an email folder id: "<folderId>"
        When email folder is deleted
        Then It will deleting existing email folder with folder id : "<deleteEmailFolderIds>"
        And deleteEmailFolder function will call <deleteEmailFolderFunctionCallCount> time while updating existing email folder

        Examples:
            | folderId | deleteEmailFolder | deleteEmailFolderFunctionCallCount |
            | 1        | '{ "id": 1}'      | 1                                  |