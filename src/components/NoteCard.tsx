import { Card, Image, CardBody, Heading, Text } from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder.webp";
import { Note } from "./NoteGrid";

interface Props {
  note: Note;
}

const NoteCard = ({ note }: Props) => {
  return (
    <Card
      width="100%"
      height="100%"
      boxShadow="md"
      borderRadius="lg"
      overflow="hidden"
    >
      /* background image shall be here*/
      <Image src={noImage || noImage} width="100%" objectFit="cover" />
      <CardBody>
        <Heading fontSize="2xl">{note.title}</Heading>
        <Text>{note.description}</Text>
        <Text>{note.subject}</Text>
      </CardBody>
    </Card>
  );
};

export default NoteCard;
