import React, { useState } from 'react';
 import { Formik } from 'formik';
import { registerUser } from '../../services/auth';
import styles from './styles';

function SignUp (props) {
  const {setSignInDisplay} = {...props}
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState(false)
  return (
  <div style={styles.signInContainer}>
    <h2 style={styles.heading}>Register With Us</h2>
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', password2: '' }}
      validate={values => {
        const errors = {};

        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.firstName) errors.firstName = 'Required'
        if (!values.lastName) errors.lastName = 'Required'
        if (!values.password) errors.password = 'Required';
        if (values.password !== values.password2) errors.password2 = "Passwords don't match"; 
        
        return errors;
      }}
      
      onSubmit={(values, actions) => {
        let body = {
          'first_name': values.firstName,
          'last_name': values.lastName,
          'email': values.email,
          'password': values.password
        }
        let res = registerUser(body)
        if (res) {
          setRegisterSuccessMsg(true)
          setTimeout(() => {
            setRegisterSuccessMsg(false)
            setSignInDisplay(true)
          }, 2500)
        }
        actions.resetForm({
          values: {firstName: '', lastName: '', email: '', password: '', password2: ''}
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.formControl}>
            <label style={styles.label}>First Name</label>
            <input
              style={styles.input}
              type="text"
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
            />
          <p style={styles.errorMsg}>{errors.firstName && touched.firstName && errors.firstName}</p>
          </div>
          <div style={styles.formControl}>
            <label style={styles.label}>Last Name</label>
              <input
                style={styles.input}
                type="text"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
              />
            <p style={styles.errorMsg}>{errors.lastName && touched.lastName && errors.lastName}</p>
          </div>
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
          <div style={styles.formControl}>
            <label style={styles.label}>Confirm Password</label>
            <input
              style={styles.input}
              type="password"
              name="password2"
              onChange={handleChange}
              value={values.password2}
            />
            <p style={styles.errorMsg}>{errors.password2 && touched.password2 && errors.password2}</p>
          </div>
          <button style={styles.button} type="submit" disabled={false}>Submit</button>
        </form>
      )}
    </Formik>
    <p style={styles.signUpStatement}>Back to <span style={styles.register} onClick={() => setSignInDisplay(true)}>SignIn</span></p>
    {
      registerSuccessMsg && alert("Registration Successful")
    }
  </div>
    )
}

export default SignUp