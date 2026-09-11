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
    <div
      role="region"
      aria-label="Install Eternal Pose"
      className="install-banner fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto p-4 rounded-2xl bg-slate-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-md text-slate-100"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
            🧭
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-100">Install Eternal Pose</h4>
            <p className="text-[11px] text-slate-400">
              Access the Grand Line offline with zero address bars
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Dismiss prompt"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80">
        {isIOS ? (
          <div className="flex items-center gap-2 text-[11px] text-amber-300/90 font-medium">
            <span>Tap</span>
            <Share className="w-3.5 h-3.5 text-amber-400 shrink-0 inline" />
            <span>then select</span>
            <span className="inline-flex items-center gap-1 font-bold text-slate-200">
              <PlusSquare className="w-3.5 h-3.5 text-amber-400" /> Add to Home Screen
            </span>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>
        )}
      </div>
    </div>
  );
}
