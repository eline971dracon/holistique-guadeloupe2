import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import QuizPage from '@/pages/QuizPage';
import DirectoryPage from '@/pages/DirectoryPage';
import CreationsDirectoryPage from '@/pages/CreationsDirectoryPage';
import ElinePage from '@/pages/ElinePage';
import TherapistProfile from '@/pages/TherapistProfile';
import CreatorProfile from '@/pages/CreatorProfile';
import RegisterTherapistPage from '@/pages/RegisterTherapistPage';
import CreatorRegistrationPage from '@/pages/CreatorRegistrationPage';
import BlogPage from '@/pages/BlogPage';
import DirectoryGatePage from '@/pages/DirectoryGatePage';
import RegistrationTypePage from '@/pages/RegistrationTypePage';
import EditTherapistProfilePage from '@/pages/EditTherapistProfilePage';
import EditCreatorProfilePage from '@/pages/EditCreatorProfilePage';
import MyInnerJourneyPage from '@/pages/MyInnerJourneyPage';
import JourneyResultsPage from '@/pages/JourneyResultsPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import RituelDomeEauTerrePage from '@/pages/RituelDomeEauTerrePage';
import TerrePage from '@/pages/TerrePage';
import EauPage from '@/pages/EauPage';
import FeuPage from '@/pages/FeuPage';
import AirPage from '@/pages/AirPage';
import EtherPage from '@/pages/EtherPage';
import TherapistGatePage from '@/pages/TherapistGatePage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminEditTherapistPage from '@/pages/AdminEditTherapistPage';
import AdminEditCreatorPage from '@/pages/AdminEditCreatorPage';
import AdminEditContentPage from '@/pages/AdminEditContentPage';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen sacred-geometry">
      <Helmet>
        <title>Terra Nova — Mon Voyage Intérieur</title>
        <meta name="description" content="Terra Nova : Plateforme holistique interactive pour composer votre journée bien-être sur mesure en Guadeloupe. Connectez-vous aux thérapeutes, artistes et lieux sacrés." />
      </Helmet>
      
      <ScrollToTop />
      <Navigation />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/annuaire" element={<DirectoryPage />} />
        <Route path="/annuaire-creations" element={<CreationsDirectoryPage />} />
        <Route path="/annuaire-gate" element={<DirectoryGatePage />} />
        <Route path="/eline-dracon" element={<ElinePage />} />
        <Route path="/soin/rituel-dome-eau-terre" element={<RituelDomeEauTerrePage />} />
        <Route path="/soin/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/therapeute/:id" element={<TherapistProfile />} />
        <Route path="/createur/:id" element={<CreatorProfile />} />
        <Route path="/rejoindre-aventure" element={<TherapistGatePage />} />
        <Route path="/inscription-type" element={<RegistrationTypePage />} />
        <Route path="/choix-inscription" element={<RegistrationTypePage />} />
        <Route path="/inscription-therapeute" element={<RegisterTherapistPage />} />
        <Route path="/inscription-artiste" element={<CreatorRegistrationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/edit-therapist/:id" element={<AdminEditTherapistPage />} />
        <Route path="/admin/edit-creator/:id" element={<AdminEditCreatorPage />} />
        <Route path="/admin/edit-content" element={<AdminEditContentPage />} />
        <Route path="/mon-compte/modifier-profil" element={<EditTherapistProfilePage />} />
        <Route path="/mon-compte/modifier-profil-createur" element={<EditCreatorProfilePage />} />
        <Route path="/edit-therapist-profile/:id" element={<EditTherapistProfilePage />} />
        <Route path="/mon-voyage-interieur" element={<MyInnerJourneyPage />} />
        <Route path="/mon-voyage-interieur/resultats" element={<JourneyResultsPage />} />
        <Route path="/porte/terre" element={<TerrePage />} />
        <Route path="/porte/eau" element={<EauPage />} />
        <Route path="/porte/feu" element={<FeuPage />} />
        <Route path="/porte/air" element={<AirPage />} />
        <Route path="/porte/ether" element={<EtherPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;