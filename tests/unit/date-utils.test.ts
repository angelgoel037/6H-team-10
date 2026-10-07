import { describe, it, expect } from 'vitest';
import { doTimesOverlap, formatTimeString } from '@/src/shared/utils/date';

describe('Time Conflict & Date Helpers', () => {
  it('should detect overlapping time intervals (FR-007)', () => {
    // A: 17:00–18:00, B: 17:30–18:30 (Overlap)
    expect(doTimesOverlap('17:00', '18:00', '17:30', '18:30')).toBe(true);

    // A: 10:00–12:00, B: 11:00–11:30 (Contained)
    expect(doTimesOverlap('10:00', '12:00', '11:00', '11:30')).toBe(true);
  });

  it('should return false for non-overlapping sequential time intervals', () => {
    // A: 17:00–18:00, B: 18:00–19:00 (Back to back, no conflict)
    expect(doTimesOverlap('17:00', '18:00', '18:00', '19:00')).toBe(false);

    // A: 09:00–10:00, B: 14:00–15:00 (Completely separate)
    expect(doTimesOverlap('09:00', '10:00', '14:00', '15:00')).toBe(false);
  });

  it('should format 24-hour time strings to readable 12-hour AM/PM format', () => {
    expect(formatTimeString('16:00')).toBe('4:00 PM');
    expect(formatTimeString('09:30')).toBe('9:30 AM');
    expect(formatTimeString('12:00')).toBe('12:00 PM');
    expect(formatTimeString('00:00')).toBe('12:00 AM');
  });
});
