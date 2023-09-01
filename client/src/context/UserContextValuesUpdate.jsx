import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export function UserContextValuesUpdate(props) {
    const ctx = useContext(UserContext);
    
    useEffect(() => {
        console.log('bandymas suzinoti ar esu prisijunges...');

        fetch('http://localhost:3001/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }, []);

    return <div>{props.children}</div>;
}