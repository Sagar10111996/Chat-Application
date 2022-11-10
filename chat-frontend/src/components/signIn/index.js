import React from 'react'
import { Formik } from 'formik';
import { loginUser } from '../../services/auth'
import styles from './styles';

function SignIn (props) {
  const {setSignInDisplay} = {...props}

  return (
  <div style={styles.signInContainer}>
    <h2 style={styles.heading}>Sign In</h2>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.password = 'Required'; 
        }
        return errors;
      }}
      
      onSubmit={(values, actions) => {
        loginUser(values)
        actions.resetForm({
          values: {email: '', password: ''}
        });

      }}
    >
      {({
        values,
        errors,
        touched,
        resetForm,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.formControl}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            <p style={styles.errorMsg}>{errors.email && touched.email && errors.email}</p>
          </div>
          <div style={styles.formControl}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            <p style={styles.errorMsg}>{errors.password && touched.password && errors.password}</p>
          </div>
          <button type="submit" disabled={false} style={styles.button}>
            Submit
          </button>
        </form>
      )}
    </Formik>
    <p style={styles.signUpStatement}>Don't have an account ? <span style={styles.register} onClick={() => setSignInDisplay(false)}>Please Register</span></p>
  </div>
  )
}

export default SignIn