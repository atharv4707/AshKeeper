import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GlobalNav } from './components/GlobalNav';
import { PlayerHUD } from './components/PlayerHUD';
import { LevelUpModal } from './components/LevelUpModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
import { QuestsPage } from './pages/QuestsPage';
import { WorldPage } from './pages/WorldPage';
import { CharacterPage } from './pages/CharacterPage';
import { CachePage } from './pages/CachePage';
import { InventoryPage } from './pages/InventoryPage';
import { NetworkPage } from './pages/NetworkPage';
import { SharedQuestPage } from './pages/SharedQuestPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { QuestLogPage } from './pages/QuestLogPage';
import { ReflectionPage } from './pages/ReflectionPage';
import { SettingsPage } from './pages/SettingsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#F8FAFC', fontWeight: 700 }}>
        Loading realm session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

// Inner layout wrapper that conditionally renders GlobalNav and PlayerHUD
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthOrLanding = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Cinematic Level-Up Modal (Global listener) */}
      <LevelUpModal />

      {isAuthOrLanding ? (
        // Immersive full-screen view without persistent RPG sidebars
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      ) : (
        // RPG In-Game Layout with persistent HUD and Global Navigation
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <GlobalNav />

          <div
            className="game-main-content"
            style={{
              flex: 1,
              marginLeft: 240,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0
            }}
          >
            <PlayerHUD />

            <main
              style={{
                flex: 1,
                padding: '24px 32px',
                maxWidth: 1400,
                width: '100%',
                margin: '0 auto'
              }}
            >
              <Routes>
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/quests" element={<ProtectedRoute><QuestsPage /></ProtectedRoute>} />
                <Route path="/world" element={<ProtectedRoute><WorldPage /></ProtectedRoute>} />
                <Route path="/character" element={<ProtectedRoute><CharacterPage /></ProtectedRoute>} />
                <Route path="/cache" element={<ProtectedRoute><CachePage /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute><InventoryPage /></ProtectedRoute>} />
                <Route path="/network" element={<ProtectedRoute><NetworkPage /></ProtectedRoute>} />
                <Route path="/shared-quest" element={<ProtectedRoute><SharedQuestPage /></ProtectedRoute>} />
                <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
                <Route path="/quest-log" element={<ProtectedRoute><QuestLogPage /></ProtectedRoute>} />
                <Route path="/who-you-are-becoming" element={<ProtectedRoute><ReflectionPage /></ProtectedRoute>} />
                <Route path="/reflection" element={<ProtectedRoute><ReflectionPage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>
          </div>

          <style>{`
            @media (max-width: 900px) {
              .game-main-content {
                margin-left: 0 !important;
                padding-bottom: 72px; /* clearance for mobile bottom dock */
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <AppContent />
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
