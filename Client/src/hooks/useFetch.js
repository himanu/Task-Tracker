import { useEffect, useState } from "react";

const useFetch = (apiMethod) => {
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const loadData = async () => {
        try {
            setIsFetching(true);
            const result = await apiMethod();
            setData(result?.data);
        } catch (err) {
            setError(err.message);
        }
        setIsFetching(false);
    }
    useEffect(() => {loadData()}, []);

    return {
        data,
        isFetching,
        error
    }
}

export default useFetch;
