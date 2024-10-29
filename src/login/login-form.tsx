import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextInput } from '@mantine/core';
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register('password', { required: 'Password is required' })} />
        {errors.password && <p style={{ color: 'white' }}></p>}
        <button type="submit">Trigger</button>
      </form>
    </div>
  );
}
