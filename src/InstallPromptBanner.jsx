import React, { useState, useEffect } from 'react';
import { Download, Share, X, PlusSquare } from 'lucide-react';

export default function InstallPromptBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Skip if already installed and running as standalone PWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (isStandalone) return;

    // 2. Skip if user previously dismissed the prompt
    const hasDismissed = localStorage.getItem('op_pwa_prompt_dismissed');
    if (hasDismissed === 'true') return;

    // 3. Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Capture native prompt on Android/Chrome
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show the banner on mobile Safari if not standalone
    if (isIosDevice && !isStandalone) {
      setShowPrompt(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem('op_pwa_prompt_dismissed', 'true');
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem('op_pwa_prompt_dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div role="region" aria-label="Install Eternal Pose" className="install-banner">
      <div className="install-row">
        <div>
          <h2>Put Eternal Pose on your home screen</h2>
          <p>It opens like an app and works offline.</p>
        </div>
        <button onClick={handleDismiss} className="btn btn-sm btn-icon" aria-label="Dismiss">
          <X size={18} />
        </button>
      </div>
      {isIOS ? (
        <p className="install-steps">
          <span>Tap</span><Share size={16} aria-label="Share" /><span>then</span>
          <PlusSquare size={16} aria-hidden="true" /><span>Add to Home Screen</span>
        </p>
      ) : (
        <button onClick={handleInstallClick} className="btn btn-field" style={{ width: '100%', marginTop: 10 }}>
          <Download size={18} aria-hidden="true" />Install
        </button>
      )}
    </div>
  );
}
