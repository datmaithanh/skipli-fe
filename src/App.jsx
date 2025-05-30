import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './App.css';
import ServicesPage from './pages/ServicePage/ServicesPage';
import GenerateCaptionOptions from './pages/ServicePage/GenerateCaptionOptions';
import SocialNetwork from './pages/ServicePage/SocialNetworkPost';
import PhoneLogin from './pages/Auth/PhoneLogin';
import ValidateAccessCode from './pages/Auth/ValidateAccessCode';
import Profile from './pages/Profile/Profile';
import GenerateIdeas from './pages/ServicePage/GenerateIdeas';
import IdeaList from './pages/ServicePage/IdeaList';
import GenerateCaptionFromIdea from './pages/ServicePage/GenerateCaptionFromIdea';

function App() {
  const location = useLocation();
  const isLogin = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/submitcode';

  return (
    <div className="flex">
      {!isLogin && <Sidebar />}
      <div className="flex-1 p-2">
        <Routes>
          <Route path="/" element={<PhoneLogin />} />
          <Route path="/submitcode" element={<ValidateAccessCode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/service" element={<ServicesPage />} />
          <Route path="/generate-caption" element={<GenerateCaptionOptions />} />
          <Route path="/generate-caption/socialnetworkpost" element={<SocialNetwork />} />
          <Route path="/generate-ideas" element={<GenerateIdeas />} />
          <Route path="/list-ideas" element={<IdeaList />} />
          <Route path="/list-ideas/generate-caption" element={<GenerateCaptionFromIdea />} />


        </Routes>
      </div>
    </div>
  );
}

export default App;
