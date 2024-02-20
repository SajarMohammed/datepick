
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  { id: createEventId(), title: 'All-day event', start: '2024-02-20' },
  { id: createEventId(), title: 'Timed event', start: '2024-02-21T12:00:00' }
];

export function createEventId() {
  return String(eventGuid++)
}