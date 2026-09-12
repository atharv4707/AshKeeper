import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Sword,
  Globe,
  User as UserIcon,
  Archive,
  Share2,
  Trophy,
  History,
  Sparkles,
  Settings,
  Flame,
  Menu,
  X,
  Package
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const GlobalNav: React.FC = () => {
  const { user, archetype } = useGame();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavLinks = [
    { to: '/home', label: 'HOME', icon: Compass },
    { to: '/quests', label: 'QUESTS', icon: Sword },
    { to: '/world', label: 'WORLD', icon: Globe },
    { to: '/character', label: 'CHARACTER', icon: UserIcon },
    { to: '/cache', label: 'CACHE', icon: Archive },
    { to: '/inventory', label: 'INVENTORY', icon: Package },
    { to: '/network', label: 'NETWORK', icon: Share2 },
    { to: '/achievements', label: 'MILESTONES', icon: Trophy },
    { to: '/quest-log', label: 'QUEST LOG', icon: History },
    { to: '/who-you-are-becoming', label: 'BECOMING', icon: Sparkles },
    { to: '/settings', label: 'SETTINGS', icon: Settings }
  ];

  const handleLinkClick = () => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside
        className="desktop-sidebar hud-glass-panel"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 240,
          zIndex: 90,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid var(--border-subtle)',
          borderRadius: 0,
          padding: '24px 16px',
          background: 'rgba(9, 13, 20, 0.94)'
        }}
      >
        {/* Logo Section */}
        <div>
          <div
            onClick={() => {
              sound.playClick();
              navigate('/');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              marginBottom: 32,
              paddingLeft: 8
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #FF6B2B 0%, #FF9E40 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(255, 107, 43, 0.5)'
              }}
            >
              <Flame size={20} color="#07090E" strokeWidth={2.4} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 16,
                  letterSpacing: '0.12em',
                  color: 'var(--text-primary)'
                }}
              >
                ASHKEEPER
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  color: 'var(--text-muted)'
                }}
              >
                LIFE IS THE QUEST
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {mainNavLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    transition: 'all 0.2s ease',
                    color: isActive ? '#FF9E40' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(255, 107, 43, 0.12)' : 'transparent',
                    borderLeft: isActive ? '3px solid #FF6B2B' : '3px solid transparent'
                  })}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div
          onClick={() => {
            sound.playClick();
            navigate('/character');
          }}
          style={{
            padding: '12px 10px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-full)',
              objectFit: 'cover',
              border: '2px solid #FF6B2B',
              boxShadow: '0 0 10px rgba(255, 107, 43, 0.3)'
            }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 13,
                color: 'var(--text-primary)'
              }}
            >
              {user.name}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                fontFamily: 'var(--font-display)',
                color: 'var(--text-muted)'
              }}
            >
              <span style={{ color: '#FF9E40', fontWeight: 700 }}>LV. {user.level < 10 ? `0${user.level}` : user.level}</span>
              <span>•</span>
              <span style={{ color: archetype.color }}>{archetype.name.replace('THE ', '')}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Floating Bottom Bar */}
      <div
        className="mobile-bottom-nav"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: 'rgba(9, 13, 20, 0.95)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border-subtle)',
          zIndex: 95,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 12px'
        }}
      >
        <NavLink
          to="/home"
          onClick={handleLinkClick}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: isActive ? '#FF9E40' : 'var(--text-muted)',
            fontSize: 10,
            fontFamily: 'var(--font-display)',
            fontWeight: 700
          })}
        >
          <Compass size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/quests"
          onClick={handleLinkClick}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: isActive ? '#FF9E40' : 'var(--text-muted)',
            fontSize: 10,
            fontFamily: 'var(--font-display)',
            fontWeight: 700
          })}
        >
          <Sword size={18} />
          <span>Quests</span>
        </NavLink>

        <NavLink
          to="/world"
          onClick={handleLinkClick}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: isActive ? '#FF9E40' : 'var(--text-muted)',
            fontSize: 10,
            fontFamily: 'var(--font-display)',
            fontWeight: 700
          })}
        >
          <Globe size={18} />
          <span>World</span>
        </NavLink>

        <NavLink
          to="/character"
          onClick={handleLinkClick}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: isActive ? '#FF9E40' : 'var(--text-muted)',
            fontSize: 10,
            fontFamily: 'var(--font-display)',
            fontWeight: 700
          })}
        >
          <UserIcon size={18} />
          <span>Character</span>
        </NavLink>

        <button
          onClick={() => {
            sound.playClick();
            setMobileMenuOpen(true);
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: 'var(--text-muted)',
            fontSize: 10,
            fontFamily: 'var(--font-display)',
            fontWeight: 700
          }}
        >
          <Menu size={18} />
          <span>More</span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="modal-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="hud-glass-panel"
            onClick={e => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: 360,
              padding: 24,
              background: '#0D1117'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: '#FF9E40' }}>
                ASHKEEPER DIRECTORY
              </div>
              <button onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {mainNavLinks.map(link => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={handleLinkClick}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 10px',
                      background: isActive ? 'rgba(255, 107, 43, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      color: isActive ? '#FF9E40' : 'var(--text-primary)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 11,
                      fontWeight: 700
                    })}
                  >
                    <Icon size={16} />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Global CSS media query override for desktop vs mobile nav */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
