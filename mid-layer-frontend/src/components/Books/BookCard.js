import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as authenticationConstants from '../../constants/authenticationConstants';
import ConfirmDialog from '../Common/ConfirmDialog/ConfirmDialog';
import * as bookConstants from '../../constants/bookConstants';
import * as bookService from '../../services/bookService';

const BookCard = ({
    book
}) => {
    const navigate = useNavigate();
    const { auth } = useAuthContext();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { addNotification } = useNotificationContext();

    const deleteHandler = (e) => {
        e.preventDefault();

        bookService.removeAsync(book?.id, auth.accessToken)
            .then(() => {
                navigate('/home');
                addNotification(bookConstants.DeleteBook, types.success);
            })
            .finally(() => {
                setShowDeleteDialog(false);
            })
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteDialog(true);
    };

    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onDelete={deleteHandler} />
            <div className="container">
                <div className="row card-header">
                    <div className="card text-center mb-3">
                        <div className="card-header">
                            Book details
                        </div>
                        <div className="card-body">
                            <p className="card-text text-secondary">Title: {book?.title}</p>
                            <p className="card-text text-secondary">Author: {book?.authors.join(', ')} </p>
                            <p className='card-text text-secondary'>Page count: {book?.pageCount}</p>
                            <p className='card-text text-secondary'>ISBN: {book?.isbn}</p>
                            {auth.role == authenticationConstants.AdminRole ?
                                <>
                                    <Link className="button edit-button" to={`/edit-book/${book.id}`}>Edit</Link>
                                    <Link className="button remove-button" to={`#`} onClick={deleteClickHandler}>Delete</Link>
                                </>
                                : <></>}
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </>
    );
}

export default BookCard; 