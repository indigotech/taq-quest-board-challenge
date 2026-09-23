import { Row } from '@atomic/obj.grid';
import type { Meta, StoryObj } from '@storybook/react';
import { FaIcon } from './fa-icon.component';

const meta: Meta<typeof FaIcon> = {
  title: 'Atomic/Atoms/Icon',
};

export default meta;

type Story = StoryObj<typeof FaIcon>;

export const AllIcons: Story = {
  render: () => (
    <Row cols={5} className="gap-md">
      {Object.entries(FaIcon).map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center rounded-md border p-md">
          <Icon className="text-2xl" />
          <p className="mt-sm text-center text-sm">{name}</p>
        </div>
      ))}
    </Row>
  ),
};
