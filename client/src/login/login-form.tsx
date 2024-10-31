import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Group, Space, TextInput } from '@mantine/core';

export function LoginForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();
  const navBack = () => {
    let path = '/';
    navigate(path);
  };
  return (
    <>
      <Container>
        <h1>Login</h1>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <TextInput label="Username" placeholder="username"></TextInput>
          <TextInput label="Password" placeholder="password"></TextInput>
          <small>
            <Link to="/signupform">Dont have an account?</Link>
          </small>
          <br></br>
          <br></br>

          <Group>
            <Button type="submit">Submit</Button>
            <Button onClick={navBack}>Cancel</Button>
          </Group>
        </form>
      </Container>
    </>
  );
}
