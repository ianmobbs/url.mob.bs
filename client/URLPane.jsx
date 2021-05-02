import * as React from 'react'
import * as ReactDOM from 'react-dom';
import axios from "axios";


export const URLPane = () => {
    const [urls, setUrls] = React.useState([]);

    React.useEffect(() => {
        getUrls()
    }, [])

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

    return (
        <>
            <h2>URL Pane</h2>
            {getUrlCards()}
        </>
    )
}