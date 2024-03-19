import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from "./contexts/NotificationContext";
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import Logout from "./components/Authentication/Logout";
import Notification from "./components/Common/Notification/Notification";
import Header from './components/WebSite/Header';
import Home from './components/WebSite/Home';
import AllBooks from './components/Books/AllBooks';
import CreateBook from "./components/Books/CreateBook";
import EditBook from "./components/Books/EditBook";
import MyAccount from './components/User/MyAccount';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <AuthProvider>
        <NotificationProvider>
          <div id='container'>
            <Header />
            <Notification />
            <main id="site-content">
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path='/' element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path='/home' element={<Home />} />
                <Route path='/my-account' element={<MyAccount />} />
                <Route path="/all-books" element={<AllBooks />} />
                <Route path="/create-book" element={<CreateBook />}/>
                <Route path="/edit-book/:bookId" element={<EditBook />}/>
              </Routes>
            </main>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </>
  );
}

export default App;
