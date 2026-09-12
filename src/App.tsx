import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
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
                <Route path="/home" element={<HomePage />} />
                <Route path="/quests" element={<QuestsPage />} />
                <Route path="/world" element={<WorldPage />} />
                <Route path="/character" element={<CharacterPage />} />
                <Route path="/cache" element={<CachePage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/network" element={<NetworkPage />} />
                <Route path="/shared-quest" element={<SharedQuestPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/quest-log" element={<QuestLogPage />} />
                <Route path="/who-you-are-becoming" element={<ReflectionPage />} />
                <Route path="/reflection" element={<ReflectionPage />} />
                <Route path="/settings" element={<SettingsPage />} />
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
      <GameProvider>
        <AppContent />
      </GameProvider>
    </BrowserRouter>
  );
}
