import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, Container, TextInput } from '@mantine/core';
import styles from '../CSS/forms.css';

export function LoginForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  return (
    <div className="loginform">
      <Container>
        <h1>Login</h1>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <TextInput label="Username" placeholder="username"></TextInput>
          <TextInput label="Password" placeholder="password"></TextInput>
          <small>
            <Link to="/signupform">Dont have an account?</Link>
          </small>
          <br></br>
          <Button type="submit">Submit</Button>
        </form>
        <Button type="button">Cancel</Button>
      </Container>
    </div>
  );
}
