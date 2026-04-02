
import { Page, expect } from '@playwright/test';

export class HomePage {
	constructor(private readonly page: Page) {}

	async goto() {
		await this.page.goto('/');
	}

	async assertTitleContains(text: string) {
		await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
	}
}
