import * as React from 'react'
import * as ReactDOM from 'react-dom';
import {Login} from "./Login";

const App = () => {
    return (
        <>
            <h1>url.mob.bs</h1>
            <Login />
        </>
    )
}
ReactDOM.render(<App />, document.getElementById("main"))