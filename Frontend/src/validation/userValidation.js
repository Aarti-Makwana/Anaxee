import * as Yup from 'yup';

const userValidation = Yup.object().shape({
  username: Yup.string()
    .required('User name is required')
    .min(2, 'User name must be at least 2 characters')
    .max(100, 'User name must not exceed 100 characters'),
  email: Yup.string()
    .required('User email is required')
    .email('User email must be valid'),
  
});

export default userValidation;
