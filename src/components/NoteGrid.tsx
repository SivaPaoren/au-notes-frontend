import { SimpleGrid } from "@chakra-ui/react";
import NoteCard from "./NoteCard";
import NoteContainer from "./NoteContainer";

export interface Note {
  id: number;
  name: string;
  background_image: string;
  description: string;
}

const NoteGrid = () => {
  const notes: Note[] = [
    {
      id: 1,
      name: "Java",
      background_image: "",
      description: "Description",
    },
    {
      id: 2,
      name: "Python",
      background_image: "",
      description: "Description",
    },
    {
      id: 1,
      name: "Java",
      background_image: "",
      description: "Description",
    },
    {
      id: 2,
      name: "Python",
      background_image: "",
      description: "Description",
    },
    {
      id: 1,
      name: "Java",
      background_image: "",
      description: "Description",
    },
    {
      id: 2,
      name: "Python",
      background_image: "",
      description: "Description",
    },
    {
      id: 1,
      name: "Java",
      background_image: "",
      description: "Description",
    },
    {
      id: 2,
      name: "Python",
      background_image: "",
      description: "Description",
    },
  ];
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
