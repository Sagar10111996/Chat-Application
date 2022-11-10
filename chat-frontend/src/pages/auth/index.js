import React, { useState } from 'react'
import SignIn from '../../components/signIn';
import SignUp from '../../components/signUp';
// import AlertDialog from '../../errorBoundary';

function Login () {

	const [signInDisplay, setSignInDisplay] = useState(true)

	return (
		<div style={styles.container}>
			{/* <AlertDialog /> */}
			{
				signInDisplay
				?
					<SignIn setSignInDisplay={setSignInDisplay} />
				:
					<SignUp setSignInDisplay={setSignInDisplay}/>
			}
		</div>
	)
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
},
}

export default Login