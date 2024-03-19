import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import * as authenticationConstants from '../../constants/authenticationConstants';
import * as bookService from '../../services/bookService';
import * as userService from '../../services/userService';
import Card from 'react-bootstrap/Card';

const Home = () => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const { auth } = useAuthContext();

    useEffect(() => {
        const fetchApi = async () => {
            let currentlyLoggedUser = await userService.getCurrentlyLogged(auth);
            setUser(currentlyLoggedUser);
        }
        fetchApi();

    }, [auth]);

    useEffect(() => {
        bookService.getAllAsync()
            .then(result => {
                setBooks(result);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <section>
            {auth.accessToken ?
                <>
                    <div className="my-profile-section-main">
                        <h5 className="my-profile-section">My Profile</h5>
                        <hr />
                        <h5 className="my-profile-section">Hello, {user?.userName}!</h5>
                    </div>

                    <div className="cart-section">
                        <Card className="home-cart-main">
                            <Card.Header as="h6" className="home-cart">Available books in the system</Card.Header>
                            <Card.Body>
                                <Card.Title as='h4' className="home-cart">{books.length}</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                </>
                : <p className='no-products'>{authenticationConstants.PleaseRegisterOrLogin}</p>
            }
        </section>
    );
}

export default Home;