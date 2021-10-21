import React, { useEffect, useState } from 'react';

const fetchData = () =>
    fetch('https://randomuser.me/api/?results=20')
        .then((res) => res.json())
        .then((data) => {
            const { results } = data;
            return results;
        })
        .catch((err) => {
            console.log(err);
        });

const extractObjectKeys = (object) => {
    let objectKeys = [];
    Object.keys(object).forEach((objectKey) => {
        const value = object[objectKey];
        if (typeof value !== 'object') {
            objectKeys.push(objectKey);
        } else {
            objectKeys = [...objectKeys, ...extractObjectKeys(value)];
        }
    });
    return objectKeys;
};

const flattenLocations = (locations = []) => {
    // console.log(locations);
    // const firstLocation = locations[0];
    // if i want to use it dynamically
    // const locationHeaders = extractObjectKeys(firstLocation);
    // return locationHeaders;
    const data = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const { street, coordinates, timezone, ...rest } of locations) {
        data.push({
            ...rest,
            number: street.number,
            name: street.name,
            latitude: coordinates.latitude,
            longitde: coordinates.longitde,
            description: timezone.description,
            offset: timezone.offset,
        });
    }

    const flattenedLocationHeaders = extractObjectKeys(data[0]);
    return { headers: flattenedLocationHeaders, data };
    // hand picking
};

// const getFilteredRows = (rows = [], filterKey) => {
//     rows.filter((row) => Object.values(row).some((s) => `${s}`.toLowerCase().includes(filterKey)));
//     return rows;
// };

const getFilteredRows = (rows: any[], filterKey: string) =>
    rows.filter((row: any) =>
        Object.values(row).some((s) => `${s}`.toLowerCase().includes(filterKey))
    );

export default function App() {
    const [people, setPeople] = useState([]);
    const [flattenedLocations, setFlattenedLocations] = useState({
        headers: [],
        data: [],
    });
    const [isAssending, setIsAssending] = useState(true);
    const [inputFieldValue, setInputFieldValue] = useState('');

    const sortColumn = (sortKey) => {
        setIsAssending((prevState) => !prevState);
        const newFlattenedLocation = {
            headers: [...flattenedLocations.headers],
            data: [...flattenedLocations.data],
        };

        if (isAssending) {
            newFlattenedLocation.data.sort((a, b) => {
                const releventValueA = a[sortKey];
                const releventValueB = b[sortKey];
                if (releventValueA > releventValueB) return 1;
                if (releventValueA < releventValueB) return -1;
                return 0;
            });
        } else {
            newFlattenedLocation.data.sort((a, b) => {
                const releventValueA = a[sortKey];
                const releventValueB = b[sortKey];
                if (releventValueA < releventValueB) return 1;
                if (releventValueA > releventValueB) return -1;
                return 0;
            });
        }

        setFlattenedLocations(newFlattenedLocation);
    };

    useEffect(() => {
        fetchData().then((results) => {
            setPeople(results);
            const ourFlattenedLocations = flattenLocations(results.map(({ location }) => location));
            setFlattenedLocations(ourFlattenedLocations);
        });
    }, []);
    return (
        <div>
            <input value={inputFieldValue} onChange={(e) => setInputFieldValue(e.target.value)} />
            <table>
                <thead>
                    <tr>
                        {flattenedLocations.headers.map((locationString, locationIdx) => (
                            <th
                                key={locationIdx}
                                onClick={() => {
                                    sortColumn(locationString);
                                }}
                            >
                                {locationString}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* {getFilteredRows(flattenedLocations.data, inputFieldValue).map(
                        (singleLocationObject) => (
                            <tr>
                                {Object.values(singleLocationObject).map((singleLocation) => (
                                <td>{singleLocation}</td>
                            ))}
                                {flattenedLocations.headers.map((header) => (
                                    <td>{singleLocationObject[header]}</td>
                                ))}
                            </tr>
                        )
                    )} */}
                    {getFilteredRows(flattenedLocations.data, inputFieldValue).map(
                        (location: any, locationIdx) => (
                            <tr key={locationIdx}>
                                {flattenedLocations.headers.map((header, headerIdx) => (
                                    <td key={headerIdx}>{location[header]}</td>
                                ))}
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
