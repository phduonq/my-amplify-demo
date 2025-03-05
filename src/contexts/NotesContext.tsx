import { del, get, post, put } from "@aws-amplify/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface ApiResponse {
  statusCode: number;
  body: string;
  headers: Record<string, string>;
}

interface NotesContextType {
  notes: Note[];
  addNote: (content: string) => Promise<void>;
  updateNote: (id: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = (await get({
        apiName: "notesApi",
        path: "/notes",
      })) as unknown as ApiResponse;

      const parsedNotes = JSON.parse(response.body) as Note[];
      setNotes(parsedNotes);
      setError(null);
    } catch (err) {
      setError("Failed to fetch notes");
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function addNote(content: string) {
    try {
      const response = (await post({
        apiName: "notesApi",
        path: "/notes",
        options: {
          body: { content },
        },
      })) as unknown as ApiResponse;

      const newNote = JSON.parse(response.body) as Note;
      setNotes((prev) => [...prev, newNote]);
      setError(null);
    } catch (err) {
      setError("Failed to add note");
      console.error("Error adding note:", err);
    }
  }

  async function updateNote(id: string, content: string) {
    try {
      const response = (await put({
        apiName: "notesApi",
        path: `/notes/${id}`,
        options: {
          body: { content },
        },
      })) as unknown as ApiResponse;

      const updatedNote = JSON.parse(response.body) as Note;
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, ...updatedNote } : note
        )
      );
      setError(null);
    } catch (err) {
      setError("Failed to update note");
      console.error("Error updating note:", err);
    }
  }

  async function deleteNote(id: string) {
    try {
      await del({
        apiName: "notesApi",
        path: `/notes/${id}`,
      });
      setNotes((prev) => prev.filter((note) => note.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete note");
      console.error("Error deleting note:", err);
    }
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        deleteNote,
        loading,
        error,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
