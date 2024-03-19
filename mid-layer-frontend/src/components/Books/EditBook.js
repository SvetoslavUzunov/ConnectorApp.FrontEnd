import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useBookState from '../../hooks/useBookState';
import * as bookService from '../../services/bookService';
import * as bookConstants from '../../constants/bookConstants';

const EditBook = () => {
    const { bookId } = useParams();
    const [book] = useBookState(bookId);
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();

    const bookEditSubmitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        formData.append('id', bookId);

        let bookData = Object.fromEntries(formData);
        bookData.authors = [bookData.authors];

        bookService.editAsync(bookData);

        navigate('/home');
        addNotification(bookConstants.SuccessfullyEdited, types.success);
    };

    return (
        <section id="edit-page" className="editForm">
            <form id="edit-form" method="POST" onSubmit={bookEditSubmitHandler}>
                <fieldset>
                    <legend>Edit book</legend>
                    <p className="field">
                        <label htmlFor="title">Title</label>
                        <span className="input" >
                            <input type="text" name="title" id="title" placeholder='Title' defaultValue={book.title} />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="authors">Author</label>
                        <span className="input" >
                            <input type="text" name="authors" id="authors" placeholder="Author name" defaultValue={book.authors} />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="pageCount">Page count</label>
                        <span className="input">
                            <input type="number" name="pageCount" id="pageCount" defaultValue={book.pageCount} />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="isbn">ISBN</label>
                        <span className="input">
                            <input type='number' name="isbn" id="isbn" defaultValue={book.isbn} />
                        </span>
                    </p>
                    
                    <input className="button submit" type="submit" value="Save changes" />
                </fieldset>
            </form>
        </section>
    );
}

export default EditBook;