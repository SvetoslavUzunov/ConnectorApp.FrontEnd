import { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import BooksList from '../Books/BooksList';
import SearchBar from '../SearchBar';
import * as bookService from '../../services/bookService';
import * as authenticationConstants from '../../constants/authenticationConstants';

const AllBooks = () => {
    const [books, setBooks] = useState(null);
    const [inputText, setInputText] = useState("");
    const { auth } = useAuthContext();

    useEffect(() => {
        bookService.getAllAsync()
            .then(result => {
                const sortResult = [...result].sort((a, b) => (
                    a.title > b.title ? 1 : -1
                ))
                setBooks(sortResult);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    let inputHandler = (e) => {
        var valueToLowerCase = e.target.value.toLowerCase();
        setInputText(valueToLowerCase);
    };

    return (
        <>
            {auth.role == authenticationConstants.AdminRole ?
                <>
                    <SearchBar inputValue={inputHandler} />
                    <section className='dashboard'>
                        <h1>All Books</h1>
                        <section>
                        <BooksList books={books} inputValues={inputText} />
                        </section>
                    </section>
                </>
                : <p className='no-products'>{authenticationConstants.AccessDenied}</p>}
        </>
    );
}

export default AllBooks;