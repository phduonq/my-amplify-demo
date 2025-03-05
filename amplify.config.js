export const config = {
    projectName: 'my-amplify-app',
    backend: {
        type: 'api',
        api: {
            type: 'rest',
            paths: {
                '/notes': {
                    name: 'notes',
                    methods: ['GET', 'POST'],
                    function: {
                        type: 'lambda',
                        handler: 'backend/function/notesHandler/src/index.handler'
                    }
                },
                '/notes/{id}': {
                    name: 'note',
                    methods: ['GET', 'PUT', 'DELETE'],
                    function: {
                        type: 'lambda',
                        handler: 'backend/function/notesHandler/src/index.handler'
                    }
                }
            }
        },
        function: {
            notesHandler: {
                type: 'lambda',
                runtime: 'nodejs18.x',
                handler: 'index.handler',
                environment: {
                    NOTES_TABLE: 'Notes'
                }
            }
        },
        storage: {
            Notes: {
                type: 'dynamodb',
                tableName: 'Notes',
                partitionKey: {
                    name: 'id',
                    type: 'string'
                }
            }
        }
    }
}