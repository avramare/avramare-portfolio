import { test, expect } from '@playwright/test';
import { getProjects, getReadme, getWeather } from '../src/utils/api';

test.describe('API Testing Suite', () => {

    test('should fetch GitHub projects successfully', async () => {
        const projects = await getProjects();
        expect(Array.isArray(projects)).toBeTruthy();
        expect(projects.length).toBeGreaterThan(0);
        expect(projects[0]).toHaveProperty('name');
        expect(projects[0]).toHaveProperty('html_url');
    });

    test('should fetch README content', async () => {
        const readme = await getReadme();
        expect(typeof readme).toBe('string');
        expect(readme.length).toBeGreaterThan(0);
    });

    test('should fetch weather data for valid city', async () => {
        const weather = await getWeather('London');
        expect(typeof weather).toBe('string');
        expect(weather).toContain('London');
    });

    test('should handle invalid city for weather data', async () => {
        const weather = await getWeather('InvalidCityName123456');
        expect(weather).toBeDefined();
    });

});