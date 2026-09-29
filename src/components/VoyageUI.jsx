import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Eye, EyeOff, Lock, Settings, SkipForward, X } from 'lucide-react';

// Hidden content is absent from the accessibility tree until deliberately revealed.
export function SpoilerContent({ hidden, children, label = 'plot summary' }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => setRevealed(false), [hidden]);
  if (!hidden) return <>{children}</>;
  return <div className="spoiler">
    <button className="spoiler-btn" aria-expanded={revealed} onClick={() => setRevealed(!revealed)}>
      <Lock size={14} aria-hidden="true" />{revealed ? `Hide ${label}` : `Show ${label}`}
    </button>
    {revealed && <div className="spoiler-open">{children}</div>}
  </div>;
}

export function Modal({ title, onClose, children, footer, className = '' }) {
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
  return <dialog ref={ref} className={`dialog ${className}`} aria-labelledby="dialog-title"
    onCancel={e => { e.preventDefault(); onClose(); }}
    onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="dialog-head">
      <h2 id="dialog-title">{title}</h2>
      <button className="btn btn-icon btn-sm" onClick={onClose} aria-label="Close"><X size={18} /></button>
    </div>
    <div className="dialog-body">{children}</div>
    {footer && <div className="dialog-foot">{footer}</div>}
  </dialog>;
}

export function Masthead({ shield, onShield, onSettings }) {
  return <header className="masthead">
    <div className="shell">
      <a className="brand" href="#main-content"><b>Eternal Pose</b><span>One Piece voyage tracker</span></a>
      <div className="masthead-actions">
        <button className="btn btn-sm shield-switch" role="switch" aria-checked={shield} aria-label="Spoiler Shield" onClick={onShield}>
          {shield ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
          <span className="label-wide">{shield ? 'Spoilers hidden' : 'Spoilers shown'}</span><span className="label-narrow">{shield ? 'Shield on' : 'Shield off'}</span>
        </button>
        <button className="btn btn-sm" onClick={onSettings} aria-label="Settings"><Settings size={16} aria-hidden="true" /><span className="label-wide">Settings</span></button>
      </div>
    </div>
  </header>;
}

const KIND_WORD = { movie: 'Film', special: 'OVA' };

function Art({ art, eager }) {
  if (!art) return null;
  return <img src={art.w960} srcSet={`${art.w960} 960w, ${art.w1920} 1920w`} sizes="(min-width: 1180px) 1180px, 100vw"
    alt="" loading={eager ? 'eager' : 'lazy'} fetchpriority={eager ? 'high' : 'auto'} decoding="async" />;
}
export { Art };

export function TitleCard({ next, art, afterSkip, skippedCount, onAdvance, onSkip, onJump, onRestoreSkipped, onRoadmap, cardRef }) {
  // The cut only plays once the episode has changed from the one the card opened on.
  // After that the class stays put, and the key change on the numeral replays it.
  const cutKey = next ? (next.isEpBased ? next.currentEp : next.item.id) : null;
  const openedOn = useRef(cutKey);
  const cut = cutKey !== openedOn.current ? 'cut' : '';
  if (!next) {
    return <section className="title-card caught-up" ref={cardRef} aria-labelledby="card-title">
      <div className="keyframe"><Art art={art} eager /></div>
      <span className="card-tab">The end, for now</span>
      <div className="placard">
        <h1 id="card-title" className="ep-title" style={{ WebkitLineClamp: 'unset' }}>You're caught up.</h1>
        <p className="ep-context">Nothing left in your queue. {skippedCount > 0 ? `You skipped ${skippedCount} stop${skippedCount === 1 ? '' : 's'} along the way, and they're still there if you want them.` : 'New episodes get added as they air.'}</p>
      </div>
      <div className="card-actions">
        {skippedCount > 0
          ? <button className="btn btn-field btn-primary" onClick={onRestoreSkipped}>Put skipped stops back</button>
          : <button className="btn btn-field btn-primary" onClick={onRoadmap}>Look back over the roadmap</button>}
      </div>
    </section>;
  }

  const { item, saga, isEpBased, currentEp, endEp, episodeTitle, isDetour } = next;
  const lastOfArc = isEpBased && currentEp === endEp;
  const primary = isEpBased ? `Watched ep ${currentEp}${lastOfArc ? ' · arc done' : ''}` : 'Watched it';
  const tab = isDetour ? 'Detour' : isEpBased ? 'Next episode' : KIND_WORD[item.type] || 'Up next';

  return <section className="title-card" ref={cardRef} aria-labelledby="card-title">
    <div className="keyframe"><Art art={art} eager /></div>
    <span className="card-tab">{tab}</span>
    <div className="placard">
      <div className="ep-number" aria-hidden="true" style={{ '--digits': isEpBased ? String(currentEp).length : 3 }}>
        {isEpBased ? <><small>EP</small><strong key={currentEp} className={cut}>{currentEp}</strong></> : <strong key={item.id} className={`is-word ${cut}`}>{KIND_WORD[item.type] || 'Extra'}</strong>}
      </div>
      <h1 id="card-title" className="ep-title">
        <span className="sr-only">{isEpBased ? `Up next, episode ${currentEp}: ` : 'Up next: '}</span>
        {isEpBased ? episodeTitle : item.title}
      </h1>
      <p className="ep-context">
        {isEpBased ? <><b>{item.title}</b> · {saga.title} · <span className="nowrap">episodes {item.episodes}</span></> : <><b>{item.episodes}</b> · {saga.title}{item.watchTip ? ` · ${item.watchTip.replace(/^⭐\s*/, '')}` : ''}</>}
      </p>
    </div>
    <div className="card-actions">
      <button className="btn btn-field btn-primary" onClick={onAdvance}><Check size={20} strokeWidth={3} aria-hidden="true" />{primary}</button>
      {isDetour && <div className="secondary">
        <button className="btn" onClick={onSkip}><SkipForward size={18} aria-hidden="true" />Skip detour</button>
      </div>}
      <div className="card-more">
        {isDetour && afterSkip && <span>Skipping goes straight to {afterSkip}.</span>}
        <button className="link-btn" onClick={onJump}>Find it in the roadmap</button>
        {!isDetour && <button className="link-btn" onClick={onSkip}>Skip this {isEpBased ? 'arc' : 'one'}</button>}
      </div>
    </div>
  </section>;
}

export function BountyStrip({ bounty, onLogbook }) {
  return <div className="bounty-strip">
    <span className="label">Bounty</span>
    <strong className="num">฿ {bounty}</strong>
    <button className="btn btn-sm" onClick={onLogbook}>Logbook<ArrowUpRight size={16} aria-hidden="true" /></button>
  </div>;
}

export function VoyageAxis({ segments, positionEp, lastEp, percent, currentSagaId, onSaga, onTune }) {
  const [draft, setDraft] = useState('');
  const at = Math.min(100, Math.max(0, ((positionEp - .5) / lastEp) * 100));
  const submit = e => {
    e.preventDefault();
    const n = Number(draft);
    if (Number.isInteger(n) && n >= 1) onTune(Math.min(n, lastEp));
  };
  return <section className="axis-panel" aria-labelledby="axis-title">
    <div className="axis-head">
      <h2 id="axis-title">Your voyage</h2>
      <p><span className="num">Ep {positionEp.toLocaleString()}</span> of <span className="num">{lastEp.toLocaleString()}</span> · <span className="num">{percent}%</span> of everything, films included</p>
    </div>
    <div className="axis">
      {segments.map(s => <button key={s.id} className={`axis-seg ${s.id === currentSagaId ? 'is-here' : ''}`}
        style={{ '--span': s.span, '--done': `${Math.round(s.done * 100)}%` }}
        aria-label={`${s.title}, episodes ${s.start} to ${s.end}, ${Math.round(s.done * 100)}% watched. Go to this saga`}
        title={s.title} onClick={() => onSaga(s.id)}>
        <span className="fill" aria-hidden="true" />
      </button>)}
      <span className="axis-pin" style={{ '--at': `${at}%` }} aria-hidden="true"><b className="num">Ep {positionEp}</b><i /></span>
    </div>
    <div className="axis-ends" aria-hidden="true"><span>Ep 1</span><span>Ep {lastEp}</span></div>
    <form className="tune" onSubmit={submit}>
      <label>Jump to an episode
        <input type="number" inputMode="numeric" min={1} max={lastEp} value={draft} placeholder="e.g. 650" onChange={e => setDraft(e.target.value)} />
      </label>
      <button className="btn" type="submit" disabled={!draft}>Set my place</button>
      <p>Coming back after a break? Type the episode you're on and I'll mark everything before it. You'll see what changes first.</p>
    </form>
  </section>;
}

export function NowStrip({ next, visible, onAdvance, onShow }) {
  if (!next) return null;
  const { item, isEpBased, currentEp, episodeTitle } = next;
  return <div className={`now-strip ${visible ? 'is-on' : ''}`} aria-hidden={!visible} inert={!visible ? '' : undefined}>
    <div className="now-inner">
      <span className="now-ep num" aria-hidden="true">{isEpBased ? currentEp : KIND_WORD[item.type] || '•'}</span>
      <button className="now-copy" onClick={onShow}>
        <strong>{isEpBased ? episodeTitle : item.title}</strong>
        <span>{isEpBased ? `Episode ${currentEp} · ${item.title}` : item.episodes}</span>
      </button>
      <button className="btn btn-field" onClick={onAdvance}><Check size={18} strokeWidth={3} aria-hidden="true" />Watched</button>
    </div>
  </div>;
}

export function ToastDock({ toast, onUndo, onDismiss }) {
  return <div className="toast-dock" role="status" aria-live="polite">
    {toast && <div className="toast" key={toast.id}>
      <span>{toast.message}</span>
      {toast.undo && <button className="btn btn-sm" onClick={onUndo}>Undo</button>}
      {!toast.undo && <button className="btn btn-sm btn-plain" style={{ color: 'inherit' }} onClick={onDismiss} aria-label="Dismiss"><X size={16} /></button>}
    </div>}
  </div>;
}

export function Eyecatch({ event, onDone }) {
  useEffect(() => {
    if (!event) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(onDone, reduced ? 0 : 1300);
    return () => clearTimeout(t);
  }, [event, onDone]);
  if (!event) return null;
  return <div className="eyecatch" aria-hidden="true" key={event.id}>
    <div className="tone-band" />
    <div className="eyecatch-inner"><strong>{event.title}, done.</strong></div>
  </div>;
}

const TABS = [['roadmap', 'Roadmap'], ['logbook', 'Logbook'], ['films', 'Films'], ['guide', 'Guide']];

export function Tabs({ active, onTab }) {
  const onKey = e => {
    const i = TABS.findIndex(([id]) => id === active);
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const nextId = TABS[(i + step + TABS.length) % TABS.length][0];
    onTab(nextId);
    requestAnimationFrame(() => document.getElementById(`tab-${nextId}`)?.focus());
  };
  return <div className="tabs" role="tablist" aria-label="Sections" onKeyDown={onKey}>
    {TABS.map(([id, label]) => <button key={id} id={`tab-${id}`} role="tab" className="tab" aria-selected={active === id}
      aria-controls={`panel-${id}`} tabIndex={active === id ? 0 : -1} onClick={() => onTab(id)}>{label}</button>)}
  </div>;
}
