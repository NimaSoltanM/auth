import { Form } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AuthForm({ buttonText }) {
  return (
    <div className='form-container'>
      <Form method='POST'>
        <div>
          <label htmlFor='email'>ایمیل</label>
          <input
            type='email'
            required
            placeholder='ایمیل'
            name='email'
            id='email'
          />
        </div>
        <div>
          <label htmlFor='password'>رمز عبور</label>
          <input
            type='password'
            required
            placeholder='رمز عبور'
            name='password'
          />
        </div>
        <button type='submit'>{buttonText}</button>
      </Form>
    </div>
  );
}

AuthForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
};
