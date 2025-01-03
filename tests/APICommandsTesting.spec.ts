import { test, expect } from '@playwright/test';
import { projects, readme, weather } from '../src/utils/bin/api_commands';

test.describe('API Commands Tests', () => {
  test('projects command should return list of repositories', async () => {
    const result = await projects([]);
    expect(result).toBeTruthy();
    expect(result).toContain('href="https://github.com');
    expect(result).toContain('class="text-light-blue');
  });

  test('readme command should return README content', async () => {
    const result = await readme([]);
    expect(result).toContain('Opening GitHub README...');
    expect(result).toBeTruthy();
  });

  test('weather command should return weather data for valid city', async () => {
    const result = await weather(['london']);
    expect(result).toBeTruthy();
    expect(result).not.toContain('Usage: weather [city]');
  });

  test('weather command should return usage info when no city provided', async () => {
    const result = await weather([]);
    expect(result).toBe('Usage: weather [city]. Example: weather casablanca');
  });
});