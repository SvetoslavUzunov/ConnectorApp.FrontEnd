import { useState, useEffect } from "react";
import * as bookService from '../services/bookService';

const useBookState = (bookId) => {
    const [book, setBook] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            let bookResult = await bookService.getByIdAsync(bookId);
            setBook(bookResult);
        }
        fetchApi();
    }, [bookId]);

    return [
        book,
        setBook
    ]
};

export default useBookState;