import React from 'react';
import { Download, Lock, Monitor, Moon, Sun, Upload } from 'lucide-react';
import { Modal } from './VoyageUI';

const MODES = [['light', 'Light', Sun], ['system', 'Match device', Monitor], ['dark', 'Dark', Moon]];

function Switch({ checked, onChange, label }) {
  return <button className="switch" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} />;
}

export function SettingsDialog({
  onClose, shield, onShield, purist, onPurist, colorMode, onColorMode,
  themes, themeId, themeLocked, onTheme, artworks, bgMode, onBgMode,
  onExport, onImport, preImport, onUndoImport, skippedCount, onRestoreSkipped, onReset, onAbout
}) {
  const pieces = Object.entries(artworks);
  return <Modal title="Settings" onClose={onClose} footer={<button className="btn btn-ink" onClick={onClose}>Done</button>}>
    <section className="dialog-section" aria-labelledby="set-view">
      <h3 id="set-view">Viewing</h3>
      <div className="setting">
        <strong>Spoiler Shield</strong>
        <p>Keeps summaries, milestones and crew you haven't reached out of sight until you ask.</p>
        <Switch checked={shield} onChange={onShield} label="Spoiler Shield" />
      </div>
      <div className="setting">
        <strong>Canon Purist</strong>
        <p>Hides filler, films and specials from Up Next and the roadmap. Mostly-canon arcs stay.</p>
        <Switch checked={purist} onChange={onPurist} label="Canon Purist" />
      </div>
      <div className="setting">
        <strong>Light or dark</strong>
        <div className="segmented" role="group" aria-label="Light or dark">
          {MODES.map(([id, label, Icon]) => <button key={id} aria-pressed={colorMode === id} onClick={() => onColorMode(id)}><Icon size={16} aria-hidden="true" />{label}</button>)}
        </div>
      </div>
    </section>

    <section className="dialog-section" aria-labelledby="set-backup">
      <h3 id="set-backup">Backup</h3>
      <p style={{ color: 'var(--ink-2)', marginBottom: 12 }}>Your progress only lives in this browser. Save a backup file now and then, and load it on a new phone or browser to carry on.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <button className="btn" onClick={onExport}><Download size={18} aria-hidden="true" />Save a backup</button>
        <label className="btn" style={{ position: 'relative' }}>
          <Upload size={18} aria-hidden="true" />Load a backup…
          <input type="file" accept=".json,application/json" onChange={onImport} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
        </label>
      </div>
      <p style={{ color: 'var(--ink-2)', fontSize: 14, marginTop: 10 }}>Loading a backup shows you what it contains before anything changes.</p>
      {preImport && <div className="callout">
        <p>Your progress from before the last backup you loaded is saved ({new Date(preImport.savedAt).toLocaleDateString()}).</p>
        <button className="link-btn" onClick={onUndoImport}>Put it back</button>
      </div>}
    </section>

    <section className="dialog-section" aria-labelledby="set-theme">
      <h3 id="set-theme">Colours</h3>
      <div className="swatches">
        {Object.values(themes).map(t => {
          const locked = themeLocked(t);
          return <button key={t.id} className={`swatch ${locked ? 'is-locked' : ''}`} aria-pressed={themeId === t.id} disabled={locked}
            style={{ '--swatch': t.primary }} onClick={() => onTheme(t.id)}>
            <i aria-hidden="true" />{locked ? <span><Lock size={13} aria-hidden="true" /> Not met yet</span> : t.name}
          </button>;
        })}
      </div>
      {shield && <p style={{ color: 'var(--ink-2)', fontSize: 14, marginTop: 10 }}>Colours unlock as each Straw Hat joins. Turn the Spoiler Shield off to use any of them.</p>}
    </section>

    <section className="dialog-section" aria-labelledby="set-art">
      <h3 id="set-art">Title card art</h3>
      <div className="setting">
        <strong>Follow my saga</strong>
        <p>The art changes as you move into each new saga.</p>
        <Switch checked={bgMode === 'auto'} onChange={on => onBgMode(on ? 'auto' : 'east-blue')} label="Follow my saga" />
      </div>
      <details className="more" open={bgMode !== 'auto'}>
        <summary>Pick a piece instead</summary>
        <div className="art-picker">
          {pieces.map(([key, a]) => <button key={key} className="art-option" aria-pressed={bgMode === key} onClick={() => onBgMode(key)}>
            <img src={a.w960} alt="" loading="lazy" decoding="async" /><span>{a.name}</span>
          </button>)}
        </div>
      </details>
    </section>

    <section className="dialog-section danger" aria-labelledby="set-over">
      <h3 id="set-over">Start over</h3>
      <div className="setting">
        <strong>Put skipped stops back</strong>
        <p>{skippedCount ? `${skippedCount} stop${skippedCount === 1 ? ' is' : 's are'} skipped right now.` : 'Nothing is skipped right now.'}</p>
        <button className="btn btn-sm" disabled={!skippedCount} onClick={onRestoreSkipped}>Put back</button>
      </div>
      <div className="setting">
        <strong>Reset all progress</strong>
        <p>Clears everything you've watched and skipped. You'll be asked first.</p>
        <button className="btn btn-sm" onClick={onReset}>Reset…</button>
      </div>
    </section>
    <p style={{ fontSize: 14, color: 'var(--ink-2)' }}><button className="link-btn" onClick={onAbout}>About Eternal Pose</button></p>
  </Modal>;
}

export function ImportDialog({ plan, currentNext, currentUnits, onApply, onClose }) {
  if (plan.error) {
    return <Modal title="Couldn't load that" onClose={onClose} footer={<button className="btn btn-ink" onClick={onClose}>OK</button>}>
      <p style={{ paddingTop: 16 }}>{plan.error}</p>
    </Modal>;
  }
  const { result } = plan;
  return <Modal title="Load this backup?" onClose={onClose} footer={<>
    <button className="btn" onClick={onClose}>Keep what I have</button>
    <button className="btn btn-field" onClick={() => onApply(plan)}>Replace my progress</button>
  </>}>
    <p style={{ paddingTop: 16 }}><b>{plan.file}</b>{plan.date && !Number.isNaN(plan.date.getTime()) ? `, saved ${plan.date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}.</p>
    <table className="preview-table">
      <thead><tr><th scope="col" /><th scope="col">Now</th><th scope="col">In the backup</th></tr></thead>
      <tbody>
        <tr><th scope="row">Up next</th><td>{currentNext}</td><td>{plan.backupNext}</td></tr>
        <tr><th scope="row">Watch units</th><td className="num">{currentUnits.toLocaleString()}</td><td className="num">{plan.backupUnits.toLocaleString()}</td></tr>
        <tr><th scope="row">Stops watched</th><td className="num">–</td><td className="num">{result.watched.size}</td></tr>
        <tr><th scope="row">Skipped</th><td className="num">–</td><td className="num">{result.skipped.size}</td></tr>
      </tbody>
    </table>
    {(plan.partial || plan.unknown > 0) && <div className="callout warn">
      {plan.partial && <p>This file is missing part of a normal backup, so anything it doesn't include will start empty.</p>}
      {plan.unknown > 0 && <p>{plan.unknown} entr{plan.unknown === 1 ? 'y' : 'ies'} in it don't match anything in the current watch order and will be left out.</p>}
    </div>}
    <p className="callout">Replacing is undoable. Your current progress is kept aside, and you can put it back from Settings.</p>
  </Modal>;
}

export function TuneDialog({ target, plan, currentNext, onExtras, onApply, onClose }) {
  if (!plan) {
    return <Modal title="Can't find that episode" onClose={onClose} footer={<button className="btn btn-ink" onClick={onClose}>OK</button>}>
      <p style={{ paddingTop: 16 }}>Episode {target.ep} isn't in the watch order yet.</p>
    </Modal>;
  }
  return <Modal title={`You're on episode ${plan.ep}?`} onClose={onClose} footer={<>
    <button className="btn" onClick={onClose}>Cancel</button>
    <button className="btn btn-field" onClick={() => onApply(plan)}>Set my place</button>
  </>}>
    <table className="preview-table" style={{ marginTop: 14 }}>
      <tbody>
        <tr><th scope="row">Up next now</th><td>{currentNext}</td></tr>
        <tr><th scope="row">Up next after</th><td><b>{plan.next ? (plan.next.isEpBased ? `Ep ${plan.next.currentEp}, ${plan.next.item.title}` : plan.next.item.title) : 'caught up'}</b></td></tr>
        <tr><th scope="row">Story arcs marked watched</th><td className="num">{plan.story}</td></tr>
        {plan.cleared > 0 && <tr><th scope="row">Later stops cleared</th><td className="num">{plan.cleared}</td></tr>}
      </tbody>
    </table>
    {plan.extras > 0 && <fieldset style={{ border: 0, padding: 0, margin: '14px 0 0' }}>
      <legend style={{ fontWeight: 700, marginBottom: 4 }}>There are {plan.extras} filler arcs, films and specials before episode {plan.ep}. Did you watch them?</legend>
      <label className="choice"><input type="radio" name="extras" checked={target.extras === 'skip'} onChange={() => onExtras('skip')} /><span>Mostly not. Mark them skipped, and I can put any of them back later.</span></label>
      <label className="choice"><input type="radio" name="extras" checked={target.extras === 'watched'} onChange={() => onExtras('watched')} /><span>Yes, mark them watched too.</span></label>
    </fieldset>}
    <p className="callout">You can undo this straight after.</p>
  </Modal>;
}

export function ResetDialog({ units, onConfirm, onClose }) {
  return <Modal title="Reset all progress?" onClose={onClose} footer={<>
    <button className="btn" onClick={onClose}>Keep my progress</button>
    <button className="btn btn-danger" onClick={onConfirm}>Reset everything</button>
  </>}>
    <p style={{ paddingTop: 16 }}>This clears <span className="num">{units.toLocaleString()}</span> watch units, every skip, and every episode you're partway through. Up next goes back to episode 1.</p>
    <p className="callout">If you might want this progress again, save a backup from Settings first.</p>
  </Modal>;
}

export function AboutDialog({ onClose }) {
  return <Modal title="About Eternal Pose" onClose={onClose} footer={<button className="btn btn-ink" onClick={onClose}>Close</button>}>
    <div style={{ display: 'grid', gap: 12, paddingTop: 16 }}>
      <p>Eternal Pose is a free, non-commercial fan project. I made it because I kept losing my place in One Piece and forgetting which bits I meant to skip.</p>
      <p>One Piece and everything related to it, including characters, names and episode titles, belongs to Eiichiro Oda, Shueisha and Toei Animation. I don't own any of it.</p>
      <p>There's no account and no server. Your progress stays in your browser.</p>
      <p>If you want to chip in, tips on <a href="https://ko-fi.com/looneth" target="_blank" rel="noopener noreferrer">Ko-fi</a> go toward the domain and hosting. The code is on <a href="https://github.com/EY4O/One-Piece-Voyage-Tracker" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
    </div>
  </Modal>;
}

export function FinaleDialog({ stats, bounty, onClose }) {
  return <Modal title="That's the whole voyage, for now" className="finale" onClose={onClose} footer={<button className="btn btn-field" onClick={onClose}>Back to the roadmap</button>}>
    <strong className="num">฿ {bounty}</strong>
    <p><span className="num">{stats.units.toLocaleString()}</span> watch units and <span className="num">{stats.hours}</span> hours. That's <span className="num">{stats.days}</span> days if you'd watched nonstop.</p>
    <p>You're caught up. New episodes show up here as they're added.</p>
  </Modal>;
}
