import React, { useEffect, useState } from 'react';
import { Check, ChevronDown, Minus, Plus, RotateCcw } from 'lucide-react';
import { SpoilerContent } from './VoyageUI';

export const KIND_LABEL = { canon: 'Canon', mixed: 'Mostly canon', movie: 'Film', special: 'Special', recommended_filler: 'Good filler', filler: 'Filler' };

export const isDetourType = type => type !== 'canon' && type !== 'mixed';

// The state of a stop is a mark in a fixed cell: filled when watched, half when
// under way, the eyecatch colour when it's next, struck through when skipped.
export function StateMark({ item, watched, skipped, current, partial, onToggle }) {
  const state = watched ? 'watched' : skipped ? 'skipped' : current ? 'up next' : partial ? 'in progress' : 'not watched';
  const cls = watched ? 'is-done' : skipped ? 'is-skipped' : current ? 'is-current' : partial ? 'is-partial' : '';
  return <button className={`mark ${cls}`} aria-pressed={watched} onClick={() => onToggle(item)}
    aria-label={`${item.title}, ${state}. ${watched ? 'Mark as not watched' : 'Mark as watched'}`}>
    {watched && <Check size={16} strokeWidth={3.5} aria-hidden="true" />}
  </button>;
}

// onEp is the episode you're on: the next one to watch inside this arc.
export function EpisodeStepper({ item, onEp, onSetEp }) {
  const on = onEp ?? item.startEp;
  const [draft, setDraft] = useState(String(on));
  useEffect(() => setDraft(String(on)), [on]);
  const commit = () => {
    const n = Number(draft);
    if (!Number.isInteger(n)) { setDraft(String(on)); return; }
    const value = Math.max(item.startEp, Math.min(item.endEp, n));
    if (value !== on) onSetEp(item, value);
    setDraft(String(value));
  };
  const done = Math.max(0, Math.min(item.epCount, on - item.startEp));
  return <>
    <div className="stepper">
      <span className="on">On ep <b className="num">{on}</b> of {item.endEp}</span>
      <button className="btn btn-sm" disabled={on <= item.startEp} onClick={() => onSetEp(item, on - 1)} aria-label={`Back one episode in ${item.title}`}><Minus size={16} aria-hidden="true" /></button>
      <button className="btn btn-sm btn-ink" onClick={() => onSetEp(item, on + 1)} aria-label={`Watched episode ${on} of ${item.title}`}><Plus size={16} aria-hidden="true" />1</button>
      {item.epCount > 5 && <button className="btn btn-sm" onClick={() => onSetEp(item, Math.min(item.endEp + 1, on + 5))} aria-label={`Watched five more episodes of ${item.title}`}>+5</button>}
      <label>Go to
        <input type="number" inputMode="numeric" min={item.startEp} max={item.endEp} value={draft}
          aria-label={`Episode you're on in ${item.title}`}
          onChange={e => setDraft(e.target.value)} onBlur={commit}
          onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); if (e.key === 'Escape') setDraft(String(on)); }} />
      </label>
    </div>
    <div className="stop-progress" aria-hidden="true"><span style={{ '--p': done / item.epCount }} /></div>
  </>;
}

export default function ArcCard({ item, watched, skipped, current, onEp, shield, onToggle, onSetEp, onRestore, onSkip }) {
  const [open, setOpen] = useState(false);
  const epBased = Boolean(item.startEp && item.endEp);
  const partial = epBased && !watched && onEp !== null && onEp > item.startEp;
  const detour = isDetourType(item.type);
  const pick = detour && item.tier === 'Must Watch';
  const showStepper = epBased && !watched && (current || partial || open);
  const chapters = item.chapters && !/anime original/i.test(item.chapters) ? item.chapters : null;
  const state = watched ? 'Watched' : skipped ? 'Skipped' : current ? 'Up next' : partial ? `On ep ${onEp}` : null;

  return <li id={`arc-card-${item.id}`} tabIndex={-1} className={`stop ${detour ? 'is-detour' : ''} ${skipped ? 'is-skipped' : ''}`}>
    <div className="rail"><StateMark item={item} watched={watched} skipped={skipped} current={current} partial={partial} onToggle={onToggle} /></div>
    <div className="stop-body">
      <div className="stop-head">
        <h3>{item.title}</h3>
        <span className={`kind ${item.type === 'canon' ? 'is-canon' : ''} ${pick ? 'is-pick' : ''}`}>{pick ? 'Worth it' : KIND_LABEL[item.type]}</span>
      </div>
      <p className="stop-meta">
        {state && <span className="stop-state">{state}</span>}
        <span>{epBased ? <>Ep <b className="num">{item.episodes}</b></> : item.episodes}</span>
        {chapters && <span>{chapters}</span>}
        {item.onePace && !/skipped|tba|in production/i.test(item.onePace) && <span>One Pace {item.onePace}</span>}
      </p>
      {showStepper && <EpisodeStepper item={item} onEp={onEp} onSetEp={onSetEp} />}
      <div className="stop-tools">
        <button className="link-btn" aria-expanded={open} aria-controls={`details-${item.id}`} onClick={() => setOpen(!open)}>
          {open ? 'Hide details' : 'Details'}<ChevronDown size={14} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', marginLeft: 4, verticalAlign: '-2px' }} />
        </button>
        {skipped && <button className="link-btn" onClick={() => onRestore(item.id)}><RotateCcw size={14} aria-hidden="true" style={{ marginRight: 4, verticalAlign: '-2px' }} />Put back in the queue</button>}
        {!skipped && !watched && detour && <button className="link-btn" onClick={() => onSkip(item)}>Skip</button>}
      </div>
      {open && <div className="stop-details" id={`details-${item.id}`}>
        <SpoilerContent hidden={shield && !watched} label="summary">
          <p>{item.description}</p>
          {item.highlights && <p className="muted">Big moments: {item.highlights}</p>}
        </SpoilerContent>
        {item.watchTip && <p><b>Tip:</b> {item.watchTip.replace(/^⭐\s*/, '')}</p>}
        {item.skipReason && <details className="why-optional"><summary>Why it's optional</summary><p className="muted">{item.skipReason}</p></details>}
      </div>}
    </div>
  </li>;
}
