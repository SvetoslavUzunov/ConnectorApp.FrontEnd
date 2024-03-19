import BookCard from "../Books/BookCard";
import * as bookConstants from '../../constants/bookConstants';

const BooksList = ({
    books,
    inputValues
}) => {
    const filteredData = books?.filter((book) => {
        if (inputValues === '') {
            return book;
        }
        else {
            return book?.title.toLowerCase().includes(inputValues.trim())
            || book?.isbn?.toLowerCase().includes(inputValues.trim())
            || (book?.authors?.some(author => author.toLowerCase().includes(inputValues.trim())) ?? false);
        }
    });

    return (
        <>
            {filteredData?.length > 0
                ? (<ul className="other-users-list">
                    {filteredData.map(x => <BookCard key={x.id} book={x} />)}
                </ul>)
                : < p className="no-users">{bookConstants.NoBooksFound}</p>
            }
        </>
    );
}

export default BooksList;