import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.NOTES_TABLE;

export const handler = async (event) => {
    const { httpMethod, path, body } = event;

    try {
        switch (httpMethod) {
            case 'GET':
                if (path.includes('/notes/')) {
                    const noteId = path.split('/').pop();
                    const getCommand = new GetCommand({
                        TableName: TABLE_NAME,
                        Key: { id: noteId }
                    });

                    const note = await docClient.send(getCommand);

                    return {
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(note.Item)
                    };
                } else {
                    const scanCommand = new ScanCommand({
                        TableName: TABLE_NAME
                    });

                    const notes = await docClient.send(scanCommand);

                    return {
                        statusCode: 200,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(notes.Items)
                    };
                }

            case 'POST':
                const newNote = JSON.parse(body);
                newNote.id = Date.now().toString();
                newNote.createdAt = new Date().toISOString();

                const putCommand = new PutCommand({
                    TableName: TABLE_NAME,
                    Item: newNote
                });

                await docClient.send(putCommand);

                return {
                    statusCode: 201,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(newNote)
                };

            case 'PUT':
                const noteToUpdate = JSON.parse(body);
                const noteId = path.split('/').pop();

                const updateCommand = new UpdateCommand({
                    TableName: TABLE_NAME,
                    Key: { id: noteId },
                    UpdateExpression: 'set content = :content, updatedAt = :updatedAt',
                    ExpressionAttributeValues: {
                        ':content': noteToUpdate.content,
                        ':updatedAt': new Date().toISOString()
                    },
                    ReturnValues: 'ALL_NEW'
                });

                const updatedNote = await docClient.send(updateCommand);

                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(updatedNote.Attributes)
                };

            case 'DELETE':
                const deleteNoteId = path.split('/').pop();

                const deleteCommand = new DeleteCommand({
                    TableName: TABLE_NAME,
                    Key: { id: deleteNoteId }
                });

                await docClient.send(deleteCommand);

                return {
                    statusCode: 204,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                };

            default:
                return {
                    statusCode: 405,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({ message: 'Method not allowed' })
                };
        }
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};