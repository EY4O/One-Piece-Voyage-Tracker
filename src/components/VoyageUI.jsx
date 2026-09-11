import React, { useEffect, useRef, useState } from 'react';
import { Anchor, ArrowRight, Check, CheckCircle2, Compass, Download, Eye, EyeOff, Film, LayoutList, Lock, Settings, SkipForward, Trophy, Upload, Users, Calculator, BookOpen } from 'lucide-react';

export function ProgressBar({ value, label }) {
  const percent = Math.max(0, Math.min(100, value));
  return <div className="progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percent)}><span style={{ width: `${percent}%` }} /></div>;
}

// Hidden content is absent from the accessibility tree until deliberately revealed.
export function SpoilerContent({ hidden, children, label = 'plot summary' }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => setRevealed(false), [hidden]);
  if (!hidden) return <>{children}</>;
  return <div className="spoiler-content">
    <button className="spoiler-toggle" aria-expanded={revealed} onClick={() => setRevealed(!revealed)}><Lock size={13} />{revealed ? `Hide ${label}` : `Reveal ${label}`}<span>Spoiler Shield</span></button>
    {revealed && <div className="spoiler-revealed">{children}</div>}
  </div>;
}

export function Modal({ label, onClose, children, message }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);
  return <dialog ref={ref} className="voyage-dialog" aria-label={label} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>{children}{message && <div className="modal-toast" role="status">{message}</div>}</dialog>;
}

export function UpNextBar({ next, onJump, onSkip, onAdvance }) {
  if (!next) return <aside className="up-next-bar"><div className="page-width"><CheckCircle2 size={20} /><strong>Your watch queue is clear.</strong><span>Explore the roadmap or restore skipped content in Settings.</span></div></aside>;
  return <aside className="up-next-bar" aria-label="Up next">
    <div className="page-width up-next-inner">
      <div className="up-next-label"><Compass size={21} /><span>UP NEXT</span></div>
      <div className="up-next-copy"><strong>{next.isEpBased ? `Episode ${next.currentEp}` : next.item.type === 'movie' ? 'Movie night' : 'Special / OVA'}<span> · {next.item.title}</span></strong><small>{next.saga.title}</small></div>
      <div className="up-next-actions">
        <button className="ui-button secondary" onClick={onJump}><Compass size={15} /><span>Jump to arc</span></button>
        <button className="ui-button quiet" onClick={onSkip} title="Skip this item without marking it watched"><SkipForward size={15} /><span>Skip</span></button>
        <button className="ui-button primary" onClick={onAdvance}>{next.isEpBased ? next.currentEp === next.endEp ? 'Finish arc' : 'Next (+1)' : 'Mark watched'}<ArrowRight size={16} /></button>
      </div>
    </div>
  </aside>;
}

const CREW = [ ['Luffy','🍖','luffy'], ['Zoro','⚔️','zoro'], ['Usopp','🎯','usopp'], ['Sanji','🍳','sanji'], ['Nami','🍊','nami'], ['Chopper','🌸','chopper'], ['Robin','📖','robin'], ['Franky','⭐','franky'], ['Brook','🎻','brook'], ['Jinbe','🌊','jinbe'] ];

export function VoyageHeader({ artwork, next, progress, watched, total, stats, bounty, unlockedCount, achievementCount, crew, shield, themeId, onTheme, onAchievements, onSettings, onJump, onAdvance }) {
  return <header className="voyage-hero">
    <img className="hero-art" src={artwork} alt="" />
    <div className="hero-shade" />
    <div className="page-width hero-content">
      <div className="brand-row"><a href="#main-content" className="brand"><Compass size={25} /><span>ETERNAL POSE<small>THE ONE PIECE VOYAGE TRACKER</small></span></a><button className="ui-button secondary" aria-label="Settings" onClick={onSettings}><Settings size={16} /><span>Settings</span></button></div>
      <div className="hero-grid">
        <div className="hero-intro"><p className="eyebrow">YOUR GRAND LINE COMPANION</p><h1>Every episode.<br /><em>A little closer.</em></h1><p className="hero-description">One voyage. Every arc, film, and detour in order.<br />Pick up where your adventure left off.</p>
          <button className="bounty-link" onClick={onAchievements}><Trophy size={18} /><span><small>YOUR BOUNTY</small><strong>฿ {bounty}</strong></span><span className="bounty-milestones">{unlockedCount}/{achievementCount} milestones <ArrowRight size={14} /></span></button>
        </div>
        <section className="continue-card" aria-label="Continue your voyage">
          <div className="section-caption"><span className="eyebrow">{next ? 'CONTINUE YOUR VOYAGE' : 'VOYAGE STATUS'}</span><Anchor size={18} /></div>
          {next ? <><p className="next-saga">{next.saga.title}</p><h2>{next.item.title}</h2><div className="next-episode"><strong>{next.isEpBased ? `EP ${next.currentEp}` : next.item.type.toUpperCase()}</strong><span>{next.isEpBased ? `of ${next.endEp} in this arc` : next.item.episodes}</span></div><p className="next-context">{next.isEpBased ? next.episodeTitle : next.item.watchTip || 'An optional stop along your voyage.'}</p><div className="continue-actions"><button className="ui-button primary" onClick={onAdvance}>{next.isEpBased ? next.currentEp === next.endEp ? 'Finish arc' : 'Next episode (+1)' : 'Mark watched'}<ArrowRight size={17} /></button><button className="ui-button secondary" onClick={onJump}>View arc</button></div></> : <><h2>You’ve reached the end of your queue.</h2><p className="next-context">Your progress is saved. Revisit an arc or restore skipped stops in Settings.</p></>}
          <div className="voyage-progress"><div><span>Voyage progress</span><strong>{progress}%</strong></div><ProgressBar value={progress} label="Overall voyage progress" /><small>{watched.toLocaleString()} / {total.toLocaleString()} watch units · episodes + film/special equivalents</small></div>
        </section>
      </div>
      <div className="voyage-stats"><div><strong>{watched.toLocaleString()}</strong><span>Watch units logged</span></div><div><strong>{stats.hoursWatched}<small> hrs</small></strong><span>Screen time</span></div><div><strong>{stats.daysEquivalent}<small> days</small></strong><span>Continuous watch time</span></div><div><strong>{stats.fillerHoursSaved}<small> hrs</small></strong><span>Unwatched / skipped filler</span></div></div>
      <div className="crew-strip"><div className="crew-label"><Users size={17} /><span>Your crew <strong>{crew.length}/10</strong></span></div><div className="crew-members">{CREW.map(([name, icon, id]) => {
        const recruited = crew.includes(name === 'Robin' ? 'Nico Robin' : name);
        const masked = shield && !recruited;
        return <SpoilerContent key={id} hidden={masked} label="crew member"><button className="crew-member" aria-pressed={themeId === id} onClick={() => onTheme(id)} title={`Activate ${name} theme`}><span>{icon}</span>{name}{recruited && <Check size={12} />}</button></SpoilerContent>;
      })}</div></div>
    </div>
  </header>;
}

const TABS = [['roadmap','Watch roadmap',Compass],['achievements','Achievements',Trophy],['tierlist','Movies & placement',Film],['pacing','Watch pace',Calculator],['quicktips','Watch guide',BookOpen]];
export function Navigation({ active, onTab, compact, onCompact, shield, onShield, onExport, onImport }) {
  return <div className="navigation-block"><nav className="voyage-nav" aria-label="Voyage sections">{TABS.map(([id,label,Icon]) => <button key={id} className="nav-button" aria-current={active === id ? 'page' : undefined} onClick={() => onTab(id)}><Icon size={17} />{label}</button>)}</nav><div className="view-toolbar"><span className="local-save"><CheckCircle2 size={14} />Progress saved on this device</span><div className="toolbar-actions"><button className="ui-button quiet" aria-pressed={compact} onClick={onCompact}><LayoutList size={15} />{compact ? 'Compact view' : 'Detailed view'}</button><button className="ui-button quiet shield-button" aria-pressed={shield} onClick={onShield}>{shield ? <EyeOff size={15} /> : <Eye size={15} />}Shield {shield ? 'on' : 'off'}</button><button className="ui-button quiet" onClick={onExport} title="Export progress JSON" aria-label="Export progress JSON"><Download size={16} /></button><label className="ui-button quiet import-control" title="Import progress JSON"><Upload size={16} /><span className="sr-only">Import progress JSON</span><input aria-label="Import progress JSON" type="file" accept=".json" onChange={onImport} /></label></div></div></div>;
}
