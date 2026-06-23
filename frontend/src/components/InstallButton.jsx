import { useState, useEffect } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect if already installed / running as standalone app
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsStandalone(standalone);

    // Listen for Android/Chrome's install prompt event
    function handleBeforeInstallPrompt(e) {
      e.preventDefault();
      setDeferredPrompt(e);
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  async function handleClick() {
    if (deferredPrompt) {
      // Android/Chrome — trigger real native install prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else if (isIOS()) {
      // iOS — Apple blocks programmatic install, show instructions instead
      setShowIOSModal(true);
    } else {
      // Fallback for other browsers / already-supported cases
      setShowIOSModal(true);
    }
  }

  // Don't show button if app is already installed/running standalone
  if (isStandalone) return null;

  return (
    <>
      <button onClick={handleClick} style={{
        background: 'rgba(10,92,71,0.08)', color: '#0a5c47', border: '1.5px solid #0a5c47',
        padding: '7px 14px', borderRadius: 7, fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap'
      }}>
        <span style={{ fontSize: 14 }}>⬇</span> Install App
      </button>

      {showIOSModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(15,20,18,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={() => setShowIOSModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '16px 16px 0 0', padding: 24, width: '100%', maxWidth: 420, animation: 'slideUp 0.25s ease-out' }}>
            <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#16201C' }}>Add SJ Medex to Home Screen</div>
              <button onClick={() => setShowIOSModal(false)} style={{ background: '#F4F4F1', border: 'none', borderRadius: '50%', width: 28, height: 28, fontSize: 16, cursor: 'pointer', color: '#6b7280' }}>×</button>
            </div>

            {isIOS() ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0a5c47', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>1</div>
                  <div style={{ fontSize: 13.5, color: '#374151', paddingTop: 2 }}>Tap the <strong>Share</strong> icon <span style={{ fontSize: 16 }}>⬆️</span> at the bottom of Safari</div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0a5c47', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>2</div>
                  <div style={{ fontSize: 13.5, color: '#374151', paddingTop: 2 }}>Scroll down and tap <strong>"Add to Home Screen"</strong> ➕</div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0a5c47', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>3</div>
                  <div style={{ fontSize: 13.5, color: '#374151', paddingTop: 2 }}>Tap <strong>"Add"</strong> at the top right — done!</div>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 13.5, color: '#374151', lineHeight: 1.7 }}>
                Open this site in <strong>Chrome</strong> and tap the menu (⋮) at the top right, then select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
