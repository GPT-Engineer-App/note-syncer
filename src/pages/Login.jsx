import { useState } from 'react';
import { Box, Button, Input, Flex, useToast } from '@chakra-ui/react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async () => {
    const response = await fetch('https://mnwefvnykbgyhbdzpleh.supabase.co/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('auth_token', data.access_token);
      onLogin(true);
    } else {
      toast({
        title: 'Login Failed',
        description: data.error_description || 'An error occurred during login.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" p={10}>
      <Box p={5} shadow="md" borderWidth="1px">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} mb={4} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb={4} />
        <Button onClick={handleLogin} colorScheme="blue">Login</Button>
      </Box>
    </Flex>
  );
};

export default Login;