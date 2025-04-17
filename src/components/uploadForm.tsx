import React, { useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const FileUploadForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file || !title || !description || !subject) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const metaData = { title, description, subject };

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "meta",
      new Blob([JSON.stringify(metaData)], { type: "application/json" })
    );

    try {
      await axios.post("http://localhost:8080/api/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Success",
        description: "File uploaded successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setSubject("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Something went wrong. Try again!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt={10}>
      <Card className="p-4 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              isRequired
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Subject</FormLabel>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              isRequired
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              isRequired
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Upload File</FormLabel>
            <Input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              isRequired
            />
          </FormControl>
          <Button type="submit" variant="primary" className="w-100">
            Upload
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default FileUploadForm;
