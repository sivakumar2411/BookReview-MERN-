import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomeBR from './components/HomeBR';
import Reviews  from './components/Reviews';
import { ExistReview, Review } from './components/ReviewTA';
import  SignUp  from './components/SignUp';
import  SignIn  from './components/SignIn';
import Contact  from './components/Contact.jsx';
import Books from './components/Books.jsx';
import { Profile } from './components/Profile.jsx';
import AdminSettings from './components/AdminSettings.jsx';
import AddBook, { EditBook } from './components/AddBook.jsx';
import Friends from './components/Friends.jsx';
import { useEffect } from 'react';
function App() {
  return (
      <Routes>
        <Route path='/' exact element={<HomeBR />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/SignIn' element={<SignIn />}/>
        <Route path='/Friends' element={<Friends />}/>
        <Route path='/AdminSettings' element={<AdminSettings />}/>
        <Route path='/HomeBR' element={<HomeBR />}/>
        <Route path='/Reviews' element={<Reviews />}/>
        <Route path='/Books' element={<Books />}/>
        <Route path='/AddBook' element={<AddBook />}/>
        <Route path='/EditBook' element={<EditBook />}/>
        <Route path='/Review' element={<Review />}/>
        <Route path='/ExistReview' element={<ExistReview />}/>
        <Route path='/Contact' element={<Contact />}/>
        <Route path='/Profile' element={<Profile />}/>
      </Routes>
  );
}
export default App;