import type { Meta, StoryObj } from "@storybook/react"
import { HoverCard } from "./HoverCard"

const meta: Meta<typeof HoverCard> = {
  title: "HoverCard",
  component: HoverCard,
  args: {
    background: 'black',
    title: '测试',
    desc: '这是一个备注',
  },
}

type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: (args) => <HoverCard {...args} />,
}

export default meta
