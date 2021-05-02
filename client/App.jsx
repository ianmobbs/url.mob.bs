import * as React from 'react'
import * as ReactDOM from 'react-dom';
import {Login} from "./Login";

const App = () => {
    const [authCookie, setAuthCookie] = React.useState('')

    React.useEffect(() => {
        checkAuthCookie()
    }, [])

    const getAuthcookie = () => {
        const cookies = `${document.cookie};`
        const authCookieSegment = cookies.split('authCookie=')[1]
        if (!authCookieSegment) {
            return
        }
        return authCookieSegment.split(';')[0]
    }

    const checkAuthCookie = () => {
        setAuthCookie(getAuthcookie() ?? '')
    }

    return (
        <>
            <h1>url.mob.bs</h1>
            {authCookie !== '' && 'Authenticated'}
            {authCookie === '' && <Login checkAuthCookie={checkAuthCookie} />}
        </>
    )
}
ReactDOM.render(<App />, document.getElementById("main"))