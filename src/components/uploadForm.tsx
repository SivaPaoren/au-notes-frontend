import React, { useState } from "react";
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
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !title || !description) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast({
        title: "Success",
        description: "File uploaded successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTitle("");
      setDescription("");
      setFile(null);
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
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Upload File</FormLabel>
            <Input type="file" onChange={handleFileChange} />
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
