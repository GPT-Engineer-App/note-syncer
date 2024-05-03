import { useState, useEffect } from 'react';
import { Box, Button, Flex, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { FaTrash, FaSave } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import { Navigate } from 'react-router-dom';

const supabaseUrl = 'https://mnwefvnykbgyhbdzpleh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth_token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const authStatus = localStorage.getItem('auth_token');
    setIsAuthenticated(!!authStatus);
    if (authStatus) {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      toast({
        title: 'Error fetching notes',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setNotes(data);
    }
  };

  const addNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ note }])
      .single();

    if (error) {
      toast({
        title: 'Error adding note',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setNotes([data, ...notes]);
      setNote('');
    }
  };

  const deleteNote = async (id) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .match({ id });

    if (error) {
      toast({
        title: 'Error deleting note',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  return (
    <ProtectedRoute>
      <Box p={5}>
        {isAuthenticated ? (
          <>
            <Flex mb={4} justify="space-between">
              <Input
                placeholder="Add a new note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button onClick={addNote} leftIcon={<FaSave />} colorScheme="blue" ml={2}>
                Save
              </Button>
            </Flex>
            <VStack spacing={4}>
              {notes.map((note) => (
                <Flex key={note.id} p={3} w="100%" borderWidth="1px" borderRadius="lg" alignItems="center" justifyContent="space-between">
                  <Text>{note.note}</Text>
                  <Button onClick={() => deleteNote(note.id)} colorScheme="red">
                    <FaTrash />
                  </Button>
                </Flex>
              ))}
            </VStack>
            <Button onClick={logout} colorScheme="red" mt={4}>
              Logout
            </Button>
          </>
        ) : (
          <Navigate to="/login" />
        )}
      </Box>
    </ProtectedRoute>
  );
};

export default Index;