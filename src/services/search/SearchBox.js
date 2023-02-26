import React, { useState, useEffect } from 'react';

function SearchBox() {
    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInput(value);

        if (value.trim() === '') {
            setSearchResults([]);
            return;
        }

        fetch(`https://jsonplaceholder.typicode.com/todos?q=${value}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="search-container">
            <input type="text" value={input} onChange={handleInputChange} placeholder="Search..." />
            {searchResults && searchResults.length > 0 && (
                <ul className="search-results">
                    {searchResults.map(result => (
                        <li key={result.id}>{result.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBox;
