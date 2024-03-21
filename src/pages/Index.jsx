import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, IconButton, Input, Stack, Text, Textarea, useColorModeValue, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onDelete }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" bg={useColorModeValue("white", "gray.700")} position="relative">
      <Heading fontSize="xl">{note.title}</Heading>
      <Text mt={4}>{note.content}</Text>
      <IconButton icon={<FaTrash />} colorScheme="red" size="sm" position="absolute" top={2} right={2} onClick={() => onDelete(note.id)} />
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const addNote = () => {
    if (newNote.title || newNote.content) {
      setNotes([...notes, { id: Date.now(), ...newNote }]);
      setNewNote({ title: "", content: "" }); // Reset new note input
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Note Keeper</Heading>
        <Box>
          <Input placeholder="Title" mb={3} value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
          <Textarea placeholder="Take a note..." value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
          <Button leftIcon={<FaPlus />} colorScheme="teal" mt={3} onClick={addNote}>
            Add Note
          </Button>
        </Box>
        <Wrap spacing={8} justify="center">
          {notes.map((note) => (
            <WrapItem key={note.id} width={{ base: "100%", sm: "45%", md: "45%" }}>
              <NoteCard note={note} onDelete={deleteNote} />
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Container>
  );
};

export default Index;
