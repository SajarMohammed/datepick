
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  { id: createEventId(), title: 'Inependence Day', start: '2024-08-15', end: '2024-08-15' },
  { id: createEventId(), title: 'Holi', start: '2024-03-25', end: '2024-03-25' },
  { id: createEventId(), title: 'Christmas', start: '2024-12-25', end: '2024-12-25' },
  { id: createEventId(), title: 'Republic Day', start: '2024-01-26', end: '2024-01-26' },
  { id: createEventId(), title: 'Gandhi Jayanti', start: '2024-10-02', end: '2024-10-02' },
  { id: createEventId(), title: 'Environment Day', start: '2024-06-05', end: '2024-06-05' },
  { id: createEventId(), title: 'Easter', start: '2024-03-31', end: '2024-03-31' },
  { id: createEventId(), title: 'Eid ul fithar', start: '2024-04-11', end: '2024-04-11' },
  { id: createEventId(), title: 'Bakrid', start: '2024-06-17', end: '2024-06-17' },
  { id: createEventId(), title: 'Muharam', start: '2024-07-17', end: '2024-07-17' },
  { id: createEventId(), title: 'onam', start: '2024-09-15', end: '2024-09-15' },
  { id: createEventId(), title: 'New Year', start: '2024-01-01', end: '2024-01-01' },
  { id: createEventId(), title: 'Dussehera', start: '2024-10-12',  end:'2024-10-12' },
  { id: createEventId(), title: 'New Year', start: '2025-01-01', end: '2025-01-01' },
  { id: createEventId(), title: 'May Day', start: '2024-05-01', end: '2024-05-01' },
];

export function createEventId() {
  return String(eventGuid++)
}