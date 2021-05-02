import * as React from 'react'
import * as ReactDOM from 'react-dom';
import {Login} from "./Login";
import {URLPane} from "./URLPane";

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

    const checkAuthCookie = async () => {
        setAuthCookie(await getAuthcookie() ?? '')
    }

    return (
        <>
            <h1>url.mob.bs</h1>
            {authCookie !== '' && <URLPane />}
            {authCookie === '' && <Login checkAuthCookie={checkAuthCookie} />}
        </>
    )
}
ReactDOM.render(<App />, document.getElementById("main"))