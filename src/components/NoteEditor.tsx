import { Button, Flex, TextAreaField } from "@aws-amplify/ui-react";
import { useState } from "react";
import { useNotes } from "../contexts/NotesContext";

export function NoteEditor() {
  const [content, setContent] = useState("");
  const { addNote } = useNotes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await addNote(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="1rem" padding="1rem">
        <TextAreaField
          label="New Note"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          rows={4}
          required
        />
        <Button type="submit" variation="primary">
          Add Note
        </Button>
      </Flex>
    </form>
  );
}
