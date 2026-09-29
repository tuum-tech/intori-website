// Shared iOS chrome and icons for the app mocks. Every element with a
// data-icon attribute gets that icon; data-status and data-tabbar build the
// status bar and tab bar. Runs synchronously so headless capture sees it.
(function () {
  const stroke = (d, w = 1.8) =>
    `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`

  const ICONS = {
    clock: stroke('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    pin: stroke('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    tv: stroke('<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="m9 2 3 3 3-3"/>'),
    calplus: stroke('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5"/>', 2),
    check: stroke('<path d="M5 12.5 10 17.5 19 7"/>', 2.4),
    chev: stroke('<path d="m9 6 6 6-6 6"/>', 2),
    arrow: stroke('<path d="M5 12h14M13 6l6 6-6 6"/>', 2),
    more: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><circle cx="5.5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="18.5" cy="12" r="1.9"/></svg>',
    home: stroke('<path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-6h-6v6H5.5A1.5 1.5 0 0 1 4 19v-8.5Z"/>'),
    week: stroke('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" stroke-width="2.6"/>'),
    interests: stroke('<path d="M10 4.5 11.6 9l4.4 1.6-4.4 1.6L10 16.7l-1.6-4.5L4 10.6 8.4 9 10 4.5Z"/><path d="M17.5 3v4M15.5 5h4M17 15.5v3M15.5 17h3"/>'),
    you: stroke('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3.2"/><path d="M6.2 18.4a7 7 0 0 1 11.6 0"/>'),
    bell: stroke('<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    calcheck: stroke('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4"/>', 2),
    calendar: stroke('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    x: stroke('<path d="M6 6l12 12M18 6 6 18"/>', 2.2),
    left: stroke('<path d="m15 6-6 6 6 6"/>', 2),
    edit: stroke('<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M10 16.5l4.5-4.5 1.5 1.5-4.5 4.5H10v-1.5Z"/>'),
  }

  const STATUS_ICONS = `
    <svg width="19" height="12" viewBox="0 0 19 12" fill="currentColor" aria-hidden="true"><rect x="0" y="8" width="3.2" height="4" rx="1"/><rect x="5" y="5.5" width="3.2" height="6.5" rx="1"/><rect x="10" y="3" width="3.2" height="9" rx="1"/><rect x="15" y="0" width="3.2" height="12" rx="1"/></svg>
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true"><path d="M8.5 2.3c2.4 0 4.6.9 6.2 2.5l1.2-1.2A10.4 10.4 0 0 0 8.5.6 10.4 10.4 0 0 0 1.1 3.6l1.2 1.2a8.7 8.7 0 0 1 6.2-2.5Zm0 3.4c1.5 0 2.8.6 3.8 1.5l1.2-1.2a7.1 7.1 0 0 0-10 0l1.2 1.2c1-.9 2.3-1.5 3.8-1.5Zm0 3.4c.6 0 1.1.2 1.5.6L8.5 11.2 7 9.7c.4-.4.9-.6 1.5-.6Z"/></svg>
    <svg width="27" height="13" viewBox="0 0 27 13" fill="currentColor" aria-hidden="true"><rect x=".5" y=".5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2.5"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" opacity=".45"/></svg>`

  document.querySelectorAll('[data-status]').forEach((el) => {
    el.classList.add('status')
    el.innerHTML = `<span>9:41</span><span class="island"></span><span class="icons">${STATUS_ICONS}</span>`
  })

  document.querySelectorAll('[data-tabbar]').forEach((el) => {
    const active = el.getAttribute('data-tabbar')
    el.classList.add('tabbar')
    el.innerHTML = [['home', 'Home'], ['week', 'Week'], ['interests', 'Interests'], ['you', 'You']]
      .map(([k, label]) => `<span class="tab${k === active ? ' on' : ''}">${ICONS[k].replace('width="16" height="16"', 'width="26" height="26"')}${label}</span>`)
      .join('')
  })

  // Only known icon names and a numeric size ever reach innerHTML.
  document.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.getAttribute('data-icon')
    if (!Object.prototype.hasOwnProperty.call(ICONS, name)) return
    const size = Number.parseInt(el.getAttribute('data-size') ?? '', 10)
    const svg = ICONS[name]
    el.innerHTML = Number.isFinite(size) && size > 0 ? svg.replace(/width="\d+" height="\d+"/, `width="${size}" height="${size}"`) : svg
  })

  if (new URLSearchParams(location.search).has('render')) document.documentElement.classList.add('render')
})()
