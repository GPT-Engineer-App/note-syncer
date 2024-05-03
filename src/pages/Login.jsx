import { useState } from 'react';
import { Box, Button, Input, Flex, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mnwefvnykbgyhbdzpleh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      navigate('/');
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} mb={3} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb={3} />
        <Button onClick={handleLogin} colorScheme="blue" width="full">Login</Button>
      </Box>
    </Flex>
  );
};

export default Login;