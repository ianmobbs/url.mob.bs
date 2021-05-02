import * as React from 'react'
import * as ReactDOM from 'react-dom';
import axios from "axios";

export const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const [message, setMessage] = React.useState('')
    const [showLogin, setShowLogin] = React.useState(true);

    const flipLogin = () => {
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
        setMessage('')
        setShowLogin(!showLogin);
    }

    const getRegisterText = () => {
        return (
            <button onClick={flipLogin}>
                {showLogin && "New user? Register here"}
                {!showLogin && "Have an account? Login here"}
            </button>
        )
    }

    const handleFormChange = (callback) => {
        return (formEvent) => callback(formEvent.target.value)
    }

    const sendRegistrationRequest = async (e) => {
        e.preventDefault();
        const body = {
            email,
            password,
            passwordConfirmation
        }
        try {
            const response = await axios.post('/api/accounts/', body)
            setMessage(response.data.message)
        } catch (e) {
            console.log(e.response.data);
            setMessage(e.response.data.error)
        }
    }

    const sendLoginRequest = async(e) => {
        e.preventDefault();
        const body = {
            email,
            password
        }
        try {
            const response = await axios.post('/api/accounts/login', body)
            setMessage(response.data.message)
            props.checkAuthCookie()
        } catch (e) {
            setMessage(`Error: ${e?.response?.data?.error}`)
        }
    }

    const getSignupPane = () => {
        return (<>
            <h2>Registration</h2>
            <form>
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email"
                       value={email} onChange={handleFormChange(setEmail)}/><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password"
                       value={password} onChange={handleFormChange(setPassword)} /><br />

                <label htmlFor="passwordConfirmation">Confirm password:</label><br />
                <input type="password" id="passwordConfirmation" name="passwordConfirmation"
                       value={passwordConfirmation} onChange={handleFormChange(setPasswordConfirmation)} /><br /><br />

                <>{message != '' && message}<br/></>

                <button type="submit" value="Register" onClick={sendRegistrationRequest}>Register</button><br />
            </form>
        </>);
    }

    const getLoginPane = () => {
        return (
            <>
                <h2>Login</h2>
                <form>
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" name="email"
                           value={email} onChange={handleFormChange(setEmail)}/><br />

                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password"
                           value={password} onChange={handleFormChange(setPassword)} /><br />

                    <>{message != '' && message}<br/></>

                    <button type="submit" value="Login" onClick={sendLoginRequest}>Login</button><br />
                </form>

            </>
        )
    }

    return (
        <>
            {showLogin && getLoginPane()}
            {!showLogin && getSignupPane()}
            <br /><hr />
            {getRegisterText()}
        </>
    )
}