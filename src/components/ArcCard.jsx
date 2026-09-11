import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, Circle, Tv, FastForward, Info, Minus, Plus, RotateCcw, SkipForward } from 'lucide-react';
import { ProgressBar, SpoilerContent } from './VoyageUI';

const TYPES = { canon: 'Canon', mixed: 'Mixed canon', movie: 'Movie', special: 'Special / OVA', recommended_filler: 'Recommended filler', filler: 'Filler' };

export function EpisodeStepper({ item, currentEp, watched, onEpisode, compact }) {
  const [draft, setDraft] = useState(currentEp?.toString() || '');
  useEffect(() => setDraft(currentEp?.toString() || ''), [currentEp]);
  const commit = () => {
    if (draft.trim() === '') { setDraft(currentEp?.toString() || ''); return; }
    const parsed = Number(draft);
    if (Number.isInteger(parsed)) {
      const value = Math.max(item.startEp - 1, Math.min(item.endEp, parsed));
      onEpisode(item, value);
      setDraft(value < item.startEp ? '' : value.toString());
    } else setDraft(currentEp?.toString() || '');
  };
  const count = watched ? item.epCount : currentEp === null ? 0 : Math.max(0, Math.min(item.epCount, currentEp - item.startEp + 1));
  return <div className={`episode-stepper ${compact ? 'stepper-compact' : ''}`}>
    <div className="episode-status"><span>{watched ? `Completed through Ep ${item.endEp}` : currentEp !== null ? `Episode ${currentEp} of ${item.endEp}` : `Not started · begins at Ep ${item.startEp}`}</span><strong>{Math.round(count / item.epCount * 100)}%</strong></div>
    <ProgressBar value={count / item.epCount * 100} label={`${item.title} progress`} />
    <div className="episode-controls">
      <div className="step-buttons"><button className="ui-button secondary" aria-label={`Previous episode in ${item.title}`} disabled={currentEp === null || currentEp < item.startEp} onClick={() => onEpisode(item, (currentEp !== null ? currentEp : item.startEp) - 1)}><Minus size={14} />1</button><button className="ui-button accent" aria-label={`Add one episode in ${item.title}`} onClick={() => onEpisode(item, (currentEp !== null ? currentEp : item.startEp - 1) + 1)}><Plus size={14} />1</button>{item.epCount > 5 && <button className="ui-button secondary" aria-label={`Add five episodes in ${item.title}`} onClick={() => onEpisode(item, Math.min(item.endEp, (currentEp !== null ? currentEp : item.startEp - 1) + 5))}><FastForward size={14} />+5</button>}</div>
      <label className="episode-input"><span>Episode</span><input type="number" inputMode="numeric" aria-label={`Current episode in ${item.title}`} min={item.startEp - 1} max={item.endEp} value={draft} placeholder={item.startEp.toString()} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); if (e.key === 'Escape') { setDraft(currentEp?.toString() || ''); } }} /></label>
    </div>
  </div>;
}

export default function ArcCard({ item, watched, skipped, active, currentEp, compact, shield, onToggle, onEpisode, onRestore, currentEpTitle }) {
  const [details, setDetails] = useState(false);
  const hasStepper = Boolean(item.startEp && item.endEp);
  return <article id={`arc-card-${item.id}`} tabIndex={-1} className={`arc-card ${compact ? 'arc-compact' : ''} ${active ? 'is-current' : ''} ${watched ? 'is-complete' : ''} ${skipped ? 'is-skipped' : ''}`} aria-label={item.title}>
    <div className="arc-body">
      <div className="arc-topline"><div className="arc-badges"><span className={`type-badge type-${item.type}`}>{TYPES[item.type]}</span>{active && <span className="status-badge current">Up next</span>}{watched && <span className="status-badge completed"><CheckCircle2 size={12} />Completed</span>}{skipped && <span className="status-badge"><SkipForward size={12} />Skipped</span>}{!compact && <span className="arc-tier">{item.type === 'canon' ? 'Essential' : item.tier}</span>}</div><button className="arc-check" aria-label={`${watched ? 'Mark unwatched' : 'Mark watched'}: ${item.title}`} aria-pressed={watched} onClick={() => onToggle(item)}>{watched ? <CheckCircle2 size={22} /> : <Circle size={22} />}</button></div>
      <h3>{item.title}</h3>
      <div className="arc-meta"><span><Tv size={13} />{item.episodes}</span>{!compact && item.chapters && <span><BookOpen size={13} />{item.chapters}</span>}</div>
      {compact && <button className="arc-details-toggle" aria-expanded={details} onClick={() => setDetails(!details)}>{details ? 'Hide details' : 'Arc details'}<ChevronDown size={13} /></button>}
      {(!compact || details) && <div className="arc-details">
        <SpoilerContent hidden={shield && !watched} label="plot summary"><p>{item.description}</p>{item.highlights && <p className="arc-highlights">Key moments: {item.highlights}</p>}</SpoilerContent>
        {item.onePace && item.onePace !== 'Skipped' && <div className="one-pace"><FastForward size={13} /><span>One Pace <strong>{item.onePace}</strong></span></div>}
        {item.watchTip && <p className="watch-advisory"><Info size={14} /><span>{item.watchTip}</span></p>}
        {item.skipReason && <details className="skip-advisory"><summary>Why this is optional</summary><p>{item.skipReason}</p></details>}
        {currentEpTitle && !watched && <p className="episode-title">“{currentEpTitle}”</p>}
      </div>}
      {skipped && <button className="ui-button secondary restore-item" onClick={() => onRestore(item.id)}><RotateCcw size={14} />Restore to queue</button>}
    </div>
    {hasStepper && <EpisodeStepper item={item} currentEp={currentEp} watched={watched} onEpisode={onEpisode} compact={compact} />}
    {!hasStepper && <button className="ui-button secondary film-complete" onClick={() => onToggle(item)}><CheckCircle2 size={15} />{watched ? 'Mark unwatched' : 'Mark watched'}</button>}
  </article>;
}
