import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { SpoilerContent } from './VoyageUI';
import { KIND_LABEL, StateMark } from './ArcCard';

const CREW = [['Luffy', 'luffy'], ['Zoro', 'zoro'], ['Nami', 'nami'], ['Usopp', 'usopp'], ['Sanji', 'sanji'], ['Chopper', 'chopper'], ['Nico Robin', 'robin'], ['Franky', 'franky'], ['Brook', 'brook'], ['Jinbe', 'jinbe']];

export function Logbook({ bounty, stats, crew, themes, onField, shield, themeId, onTheme, achievements, pace, onPace, pacing }) {
  const [showLocked, setShowLocked] = useState(false);
  const unlocked = achievements.filter(a => a.isUnlocked);
  const locked = achievements.filter(a => !a.isUnlocked);
  const lockedVisible = !shield || showLocked;

  return <div className="log-grid">
    <section className="log-block poster two-thirds" aria-labelledby="bounty-title">
      <h3 id="bounty-title" className="sr-only">Bounty</h3>
      <div className="figure num"><small>฿</small>{bounty}</div>
      <p>Your bounty climbs with every episode. Big arcs pay more, filler pays nothing.</p>
      <dl className="log-rows">
        <div><dt>Watch units logged</dt><dd className="num">{stats.units.toLocaleString()}</dd></div>
        <div><dt>Time spent watching</dt><dd><span className="num">{stats.hours}</span> hours</dd></div>
        <div><dt>If you'd watched it all nonstop</dt><dd><span className="num">{stats.days}</span> days</dd></div>
        <div><dt>Filler you've skipped</dt><dd><span className="num">{stats.fillerSkippedHours}</span> hours</dd></div>
      </dl>
    </section>

    <section className="log-block third" aria-labelledby="pace-title">
      <h3 id="pace-title">Pace</h3>
      <div className="range-row">
        <label htmlFor="pace">Episodes a day <span className="num">{pace}</span></label>
        <input id="pace" type="range" min="1" max="15" value={pace} onChange={e => onPace(parseInt(e.target.value, 10))} />
      </div>
      <p className="pace-out">
        {pacing.remaining === 0 ? 'Nothing left to catch up on.' : <>At {pace} a day you'll catch up around <strong>{pacing.date}</strong>. That's <span className="num">{pacing.days.toLocaleString()}</span> days and <span className="num">{pacing.remaining.toLocaleString()}</span> watch units to go.</>}
      </p>
    </section>

    <section className="log-block half" aria-labelledby="crew-title">
      <h3 id="crew-title">Crew <span className="num" style={{ fontFamily: 'var(--text)', fontSize: 16, fontWeight: 700 }}>{crew.length} of 10</span></h3>
      <ul className="crew">
        {CREW.map(([name, id]) => {
          const joined = crew.includes(name);
          const hidden = shield && !joined;
          const theme = themes[id];
          return <li key={id}>
            {joined
              ? <button className="crew-slot" aria-pressed={themeId === id} onClick={() => onTheme(id)}
                  style={{ '--swatch': theme.primary, '--on-swatch': onField(theme.primary) }}>
                  <i aria-hidden="true">{name[0]}</i><span>{name}<small>{themeId === id ? 'Your colours' : 'Use their colours'}</small></span>
                </button>
              : <div className="crew-slot is-unmet"><i aria-hidden="true">?</i><span>{hidden ? 'Not met yet' : name}<small>Joins later</small></span></div>}
          </li>;
        })}
      </ul>
    </section>

    <section className="log-block half" aria-labelledby="ms-title">
      <h3 id="ms-title">Milestones <span className="num" style={{ fontFamily: 'var(--text)', fontSize: 16, fontWeight: 700 }}>{unlocked.length} of {achievements.length}</span></h3>
      {unlocked.length === 0 && <p style={{ margin: 0, color: 'var(--ink-2)' }}>Your first one comes with episode 1.</p>}
      <ul className="milestones">
        {unlocked.map(a => <li key={a.id} className="milestone">
          <span className="seal" aria-hidden="true"><a.icon size={20} strokeWidth={2} /></span>
          <div><h4>{a.title}</h4><p>{a.description}</p></div>
          <span className="tier">{a.tier}</span>
        </li>)}
        {lockedVisible && locked.map(a => <li key={a.id} className="milestone is-locked">
          <span className="seal" aria-hidden="true"><Lock size={18} /></span>
          <div><h4>{a.title}</h4><p>{a.description}</p></div>
          <span className="tier">{a.tier}</span>
        </li>)}
      </ul>
      {locked.length > 0 && shield && <div className="locked-count">
        <span><span className="num">{locked.length}</span> more ahead{showLocked ? '' : ', hidden by the Spoiler Shield'}.</span>
        <button className="link-btn" aria-expanded={showLocked} onClick={() => setShowLocked(!showLocked)}>{showLocked ? 'Hide them again' : 'Show them anyway'}</button>
      </div>}
    </section>
  </div>;
}

export function Films({ films, positionIndex, shield, isWatched, isSkipped, onToggle, placement }) {
  return <ul className="ledger">
    {films.map(({ item, index }) => {
      const watched = isWatched(item.id);
      const ahead = index > positionIndex && !watched;
      const unreleased = /theatrical/i.test(item.episodes);
      const pick = item.tier === 'Must Watch';
      return <li key={item.id} className={isSkipped(item.id) ? 'is-skipped' : ''}>
        <div className="rail"><StateMark item={item} watched={watched} skipped={isSkipped(item.id)} onToggle={onToggle} /></div>
        <div className="stop-body">
          <div className="stop-head">
            <h3>{item.title}</h3>
            <span className={`kind ${pick ? 'is-pick' : ''}`}>{unreleased ? 'Not out yet' : pick ? 'Worth it' : KIND_LABEL[item.type]}</span>
          </div>
          <p className="stop-meta">
            {watched && <span className="stop-state">Watched</span>}
            <span>{item.episodes}</span>
            <span><b>{placement(index)}</b></span>
          </p>
          <div className="stop-details" style={{ marginTop: 10 }}>
            <SpoilerContent hidden={shield && ahead} label="what it's about">
              <p>{item.description}</p>
            </SpoilerContent>
            {item.watchTip && !unreleased && <p className="muted">{item.watchTip.replace(/^⭐\s*/, '')}</p>}
            {item.skipReason && <p className="muted">Optional: {item.skipReason}</p>}
          </div>
        </div>
      </li>;
    })}
  </ul>;
}

export function Guide({ skippable, tieIns, fillerHours, onJumpTo }) {
  return <div className="guide-cols">
    <section className="guide-block" aria-labelledby="g-how">
      <h3 id="g-how">How this works</h3>
      <dl>
        <div><dt>Up next and +1</dt><dd>The card at the top is always the next thing to watch. Hit Watched after each episode. On a phone the same button follows you down the page.</dd></div>
        <div><dt>Skipping</dt><dd>Skipped isn't watched. Anything you skip stays on the roadmap with a break in the line, and you can put it back whenever you like.</dd></div>
        <div><dt>Spoiler Shield</dt><dd>On by default. Summaries, milestones and crew you haven't reached aren't shown until you ask for them. Arc names and artwork still show, so it's not bulletproof.</dd></div>
        <div><dt>Watch units</dt><dd>Films and specials count as a rough number of episodes (23.5 minutes each), so your total runs a bit higher than the episode count.</dd></div>
        <div><dt>Backups</dt><dd>Everything lives in this browser. Save a backup file from Settings before you clear your browser or switch phones.</dd></div>
      </dl>
    </section>

    <section className="guide-block" aria-labelledby="g-keep">
      <h3 id="g-keep">Worth keeping</h3>
      <ol>
        <li><b>G-8 (ep 196–206)</b> is filler, but it's one of the best stretches of the early show. Don't skip it.</li>
        <li><b>Strong World</b> fits best around ep 429, right after the Little East Blue tie-in episodes. Watch Episode 0 first.</li>
        <li><b>The 3D2Y special</b> goes right after ep 516.</li>
        <li><b>ONE PIECE FAN LETTER</b> (2024) is a standalone 25-minute special and one of the best-loved episodes of the whole show.</li>
      </ol>
    </section>

    <section className="guide-block wide" aria-labelledby="g-skip">
      <h3 id="g-skip">Filler you can skip</h3>
      <p style={{ margin: '0 0 10px', color: 'var(--ink-2)' }}>About <span className="num">{fillerHours}</span> hours in total. None of it changes the story.</p>
      <table className="skip-table">
        <thead><tr><th scope="col">Arc</th><th scope="col">Episodes</th><th scope="col">Hours</th></tr></thead>
        <tbody>{skippable.map(f => <tr key={f.id}>
          <td><button className="link-btn" onClick={() => onJumpTo(f.id)}>{f.title}</button></td>
          <td className="num">{f.episodes}</td>
          <td className="num">{(f.epCount * 23.5 / 60).toFixed(1)}</td>
        </tr>)}</tbody>
      </table>
      {tieIns.length > 0 && <>
        <p style={{ margin: '16px 0 8px', fontWeight: 700 }}>Film tie-ins: only if you're watching the film</p>
        <table className="skip-table">
          <tbody>{tieIns.map(f => <tr key={f.id}>
            <td><button className="link-btn" onClick={() => onJumpTo(f.id)}>{f.title}</button></td>
            <td className="num">{f.episodes}</td>
            <td className="num">{(f.epCount * 23.5 / 60).toFixed(1)}</td>
          </tr>)}</tbody>
        </table>
      </>}
    </section>
  </div>;
}
