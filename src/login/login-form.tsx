import { Button, TextInput } from '@mantine/core';
import styles from './RegistrationForm.module.css';

export function LoginForm() {
  return (
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
      <Button type="submit" fullWidth mt="xl">
        Log in
      </Button>
    </form>
  );
}
