import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as bookService from '../../services/bookService';
import * as bookConstants from '../../constants/bookConstants';

const CreateBook = () => {
    const navigate = useNavigate();
    const { auth } = useAuthContext();
    const { addNotification } = useNotificationContext();

    const createBook = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let title = formData.get('title');
        let isbn = formData.get('isbn');
        let pageCount = formData.get('pageCount');
        let authors = [];
        authors.push(formData.get('author'));

        bookService.createAsync({
            title,
            isbn,
            pageCount,
            authors,
        }, auth.accessToken)
            .then(() => {
                navigate('/all-books');
                addNotification(bookConstants.SuccessfullyCreated, types.success);
            }).catch((error) => {
                addNotification(bookConstants.FailedCreated, types.error);
                console.log(error);
            })
    };

    return (
        <section id="create-page" className="createForm">
            <form id="create-form" onSubmit={createBook} method="POST">
                <fieldset>
                    <legend>Add book</legend>
                    <p className="field">
                        <label htmlFor="title">Title</label>
                        <span className="input">
                            <input type="text" name="title" id="title" placeholder="etc... The Lord Of The Rings" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="author">Author</label>
                        <span className="input">
                            <input type="text" name="author" id="author" placeholder="etc... J. R. R. Tolkien" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="pageCount">Page count</label>
                        <span className="input">
                            <input type="number" name="pageCount" id="pageCount" placeholder="etc... 100" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="isbn">ISBN</label>
                        <span className="input">
                            <input type='number' name="isbn" id="isbn" placeholder="etc... 1935182722" />
                        </span>
                    </p>

                    <input className="button submit" type="submit" value="Add Book" />
                </fieldset>
            </form>
        </section>
    );
}

export default CreateBook;