import { useNavigate } from 'react-router-dom';
import { Button, Container, Group, TextInput } from '@mantine/core';

export function RegistrationForm() {
  let navigate = useNavigate();
  const navBack = () => {
    let path = '/';
    navigate(path);
  };

  return (
    <Container>
      <h1>Sign up</h1>
      <form>
        <TextInput withAsterisk label="Email" placeholder="ex. user@gmail.com" required />
        <TextInput withAsterisk label="Username" placeholder="ex. username" mt="md" required />
        <TextInput
          withAsterisk
          label="Password"
          placeholder="Password"
          type="password"
          mt="md"
          required
        />
        <TextInput
          withAsterisk
          label="Confirm Password"
          placeholder="Password"
          type="password"
          mt="md"
          required
        />
        <br></br>
        <Group>
          <Button type="submit">Register</Button>
          <Button onClick={navBack}>Cancel</Button>
        </Group>
      </form>
    </Container>
  );
}
