import { useState, useEffect } from "react";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null | unknown;
}



function useFetchProperties<T>(page: number, perPage: number): FetchState<T> {
    const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
    const URL = `${BASE_API_URL}/paginated-listings?page=${page}&perPage=${perPage}`
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null | unknown>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
                setError(null);
            } catch (error: unknown) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [URL]);

    return { data, loading, error };
}

export default useFetchProperties;