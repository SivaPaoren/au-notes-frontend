import React, { useEffect, useState } from "react";
import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";
import NoteCard from "./NoteCard";
import NoteContainer from "./NoteContainer";

export interface Note {
  id: number;
  title: string;
  description: string;
  subject: string;
}

const NoteGrid = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Replace this with your real API endpoint
    axios
      .get<Note[]>("http://localhost:8080/api/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  console.log(notes);

  return (
    <SimpleGrid
      minChildWidth="280px"
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={20}
      padding="10px"
    >
      {notes.map((note) => (
        <NoteContainer>
          <NoteCard note={note}></NoteCard>
        </NoteContainer>
      ))}
    </SimpleGrid>
  );
};

export default NoteGrid;
