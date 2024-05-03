import { useState } from 'react';
import { Box, Button, Input, useToast, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      toast({
        title: 'Login Failed',
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
    <Box p={5}>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} colorScheme="blue">
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;