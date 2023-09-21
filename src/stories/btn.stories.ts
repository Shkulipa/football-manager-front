import type { Meta, StoryObj } from '@storybook/react';
import { Btn } from '@/components/btn/btn';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Btn',
  component: Btn,
} satisfies Meta<typeof Btn>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const CommonArgs = {
  children: 'Some Text',
}
export const BtnPrimary: Story = {
  args: {
    ...CommonArgs,
    appearance: 'primary',
  },
};

export const BtnSecondary: Story = {
  args: {
    ...CommonArgs,
    appearance: 'secondary',
  },
};
