import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: 'Button',
	component: Button
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const CommonArgs = {
	children: 'Some Text'
};
export const ButtonPrimary: Story = {
	args: {
		...CommonArgs,
		appearance: 'primary'
	}
};

export const ButtonSecondary: Story = {
	args: {
		...CommonArgs,
		appearance: 'secondary'
	}
};
