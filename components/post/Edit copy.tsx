import React, { useState, useEffect } from "react";

interface ComponentType {
    message: (name: string) => void,
    id: string,
    data: {
        id: string,
        name: string,
        age: number
    }[]
}


const MyComponent: React.FC<ComponentType> = React.memo(({ message, id, data }) => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);

    useEffect(() => {
        const findData = data.find(newData => newData.id === id);
        if (findData) {
            setName(findData.name);
            setAge(findData.age);
            message(findData.name);
        }
    }, [id]);

    const closeHandler = () => {
        console.log("Close button click");
    }

    const submitClickHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submit");
    }


    return (
        <>
            <h1>This is my component</h1>
            <form onSubmit={submitClickHandler}>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} value={name} />
                <input type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.valueAsNumber)} value={age} />
                <button onClick={closeHandler}>Close</button>
                <input type="submit" value="Submit Form" />
            </form>
        </>
    );
});

export default MyComponent;
