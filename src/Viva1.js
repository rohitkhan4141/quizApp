import { Fragment, useEffect, useState } from 'react';
import './App.css';

function App() {
    // https://randomuser.me/api
    const [stringData, setStringData] = useState([]);
    const [pageCounter, setPageCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchUser = async (pageCounter2) => {
        setLoading(true);
        setError(false);
        try {
            const url = `https://randomuser.me/api?&page=${pageCounter2}`;
            const fetchDataOfUser = await fetch(url);
            const jsonFetchDataOfUser = await fetchDataOfUser.json();
            console.log(jsonFetchDataOfUser);
            const user = jsonFetchDataOfUser.results;
            setStringData((prevState) => [...prevState, ...user]);
        } catch (err) {
            setError('There was a problem fetching user');
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser(pageCounter);
    }, [pageCounter]);
    return (
        <div className="App">
            <p>hello</p>
            <button type="button" onClick={() => setPageCounter((prevCount) => prevCount + 1)}>
                new user
            </button>

            {error && <p>{error}</p>}
            {stringData?.map((singleUser, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={`elem${idx}`}>
                    <img src={singleUser.picture.large} alt="ima" />
                    <p>{singleUser.name.first}</p>
                </Fragment>
            ))}
            {loading && <p>loading..</p>}
        </div>
    );
}

export default App;
