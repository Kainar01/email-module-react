export enum EventType {
  SAVE_TEMPLATE = 'react-email-module:save-template:',
  SEND_TEMPLATE = 'react-email-module:send-template:',
}

function on(eventType: string, listener: () => void) {
  document.addEventListener(eventType, listener);
}

function off(eventType: string, listener: () => void) {
  document.removeEventListener(eventType, listener);
}

function trigger(eventType: string) {
  const event = new CustomEvent(eventType);
  document.dispatchEvent(event);
}

function getEventType(eventType: EventType, uid: string): string {
  return `${eventType}${uid}`;
}
export { on, off, trigger, getEventType };
