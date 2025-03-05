import { Button, Card, Collection, Flex, Text } from "@aws-amplify/ui-react";
import { useNotes } from "../contexts/NotesContext";

export function NotesList() {
  const { notes, deleteNote, loading, error } = useNotes();

  if (loading) {
    return <Text>Loading notes...</Text>;
  }

  if (error) {
    return <Text color="red">{error}</Text>;
  }

  return (
    <Collection
      items={notes}
      type="list"
      direction="column"
      gap="1rem"
      padding="1rem"
    >
      {(note) => (
        <Card key={note.id} padding="1rem">
          <Flex direction="column" gap="0.5rem">
            <Text>{note.content}</Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Text variation="secondary" fontSize="small">
                {new Date(note.createdAt).toLocaleDateString()}
              </Text>
              <Button
                variation="destructive"
                size="small"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </Button>
            </Flex>
          </Flex>
        </Card>
      )}
    </Collection>
  );
}
