import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TripDetailsPage from './pages/TripDetailsPage'
import SearchPage from './pages/SearchPage'
import CreateTripPage from './pages/CreateTripPage'
import ProfilePage from './pages/ProfilePage'
import ExperiencesPage from './pages/ExperiencesPage'
import ExperienceDetailsPage from './pages/ExperienceDetailsPage'
import MessagesPage from './pages/MessagesPage'
import MessageThreadPage from './pages/MessageThreadPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/trips/new" element={<CreateTripPage />} />
          <Route path="/trips/:tripId" element={<TripDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/experiences/:storyId" element={<ExperienceDetailsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:conversationId" element={<MessageThreadPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
