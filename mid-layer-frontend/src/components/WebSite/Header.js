import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as authenticationConstants from '../../constants/authenticationConstants';

const Header = () => {
    const { auth } = useAuthContext();

    let adminView = (
        <div id="admin">
            <Link to="./home" className="button">Home</Link>
            <Link to="./all-books" className="button">All Books</Link>
            <Link to="./create-book" className="button">Create Book</Link>
            <Link to="./my-account" className="button">My Account</Link>
            <Link to="./logout" className="button">Logout</Link>
        </div>
    );

    let guestView = (
        <div id="guest">
            <Link to="./login" className="button">Login</Link>
            <Link to="./register" className="button">Register</Link>
        </div>
    );

    const renderView = () => {
        if (auth.role == authenticationConstants.AdminRole) {
            return adminView;
        } else {
            return guestView;
        }
    }

    return (
        <>
            {auth.accessToken ?
                <header id="site-header">
                    <nav className="navbar">
                        <section className="navbar-dashboard">
                            {renderView()}
                        </section>
                    </nav>
                </header>
                : <></>}
        </>
    );
}

export default Header;