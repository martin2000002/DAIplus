export { EventsSection } from './components/EventsSection';
export { EventCard } from './components/EventCard';
export { EventDetailPage } from './components/EventDetailPage';
export {
  events,
  getRecentEvents,
  getEventBySlug,
  getAllEventSlugs,
  getCategoryLabel,
  categoryConfig,
  formatEventDate,
  isUpcoming,
  getSortedEvents,
} from './data/events';
export type { Event } from './data/events';
