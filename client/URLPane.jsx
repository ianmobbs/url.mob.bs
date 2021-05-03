import * as React from 'react'
import * as ReactDOM from 'react-dom';
import axios from "axios";

export const URLPane = () => {
    const [urls, setUrls] = React.useState([]);
    const [longUrl, setLongUrl] = React.useState('');
    const [shortUrlId, setShortUrlID] = React.useState('');
    const [expiration, setExpiration] = React.useState(0);
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        getUrls()
    }, [])

    const handleFormChange = (callback) => {
        return (formEvent) => callback(formEvent.target.value)
    }

    const getUrls = async () => {
        try {
            const response = await axios.get('/api/urls');
            setUrls(response?.data?.urls)
        } catch (e) {
            setUrls([])
        }
    }

    const getUrlCard = (url) => {
        return (
            <div style={{"padding-bottom": "15px"}}>
                <div style={{"border-radius": "25px", "border": "2px solid"}}>
                    <div style={{"margin": "5px 5px 5px 5px"}}>
                        <h3><b><a href={url.longURL}>{url.longURL}</a></b></h3>
                        <p><a href={'http://' + window.location.host + '/' + url.shortUrlId}>{window.location.host + '/' + url.shortUrlId}</a></p>
                        <p>{url.clicks?.length} click{url.clicks?.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>
            </div>
        )
    }

    const getUrlCards = () => {
        return urls.map((url) => getUrlCard(url));
    }

    const sendCreateUrlRequest = async (e) => {
        e.preventDefault();
        var body = {
            longUrl
        }
        if (expiration > 0) {
            body = {...body, expiration}
        }
        if (shortUrlId !== '') {
            body = {...body, shortUrlId}
        }
        try {
            const response = await axios.post('/api/urls/', body)
            setMessage(response.data.message)
            props.checkAuthCookie()
        } catch (e) {
            setMessage(`Error: ${e?.response?.data?.error}`)
        } finally {
            getUrls()
        }
    }

    const getCreateUrlForm = () => {
        return (
            <>
                <h2>Create URL</h2>
                <form>
                    <label htmlFor="longURL">Long URL:</label><br />
                    <input id="longURL" name="longURL"
                           value={longUrl} onChange={handleFormChange(setLongUrl)}/><br />

                    <label htmlFor="shortUrlId">Short URL ID (optional):</label><br />
                    <input id="shortUrlId" name="shortUrlId"
                           value={shortUrlId} onChange={handleFormChange(setShortUrlID)} /><br />

                    <label htmlFor="expiration">Expiration (optional - epoch time format):</label><br />
                    <input type="number" id="expiration" name="expiration"
                           value={shortUrlId} onChange={handleFormChange(setExpiration)} /><br />

                    <>{message !== '' && message}<br/></>

                    <button type="submit" value="Login" onClick={sendCreateUrlRequest}>Create Short URL</button><br />
                </form>
            </>
        )
    }

    return (
        <>
            <h2>URL Pane</h2>
            {getUrlCards()}
            <hr />
            {getCreateUrlForm()}
        </>
    )
}