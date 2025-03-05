"use client";

import { ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { NoteEditor } from "../components/NoteEditor";
import { NotesList } from "../components/NotesList";
import { NotesProvider } from "../contexts/NotesContext";

const theme = {
  name: "notes-app-theme",
  tokens: {
    colors: {
      background: {
        primary: { value: "#ffffff" },
        secondary: { value: "#f5f5f5" },
      },
      font: {
        interactive: { value: "#0072E5" },
      },
    },
  },
};

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <NotesProvider>
        <main className="min-h-screen p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">My Notes</h1>
            <div className="space-y-8">
              <section className="bg-white rounded-lg shadow">
                <NoteEditor />
              </section>
              <section className="bg-white rounded-lg shadow">
                <NotesList />
              </section>
            </div>
          </div>
        </main>
      </NotesProvider>
    </ThemeProvider>
  );
}
