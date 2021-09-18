import { Story } from '@storybook/vue3'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { DropResult } from 'smooth-dnd'

interface SampleItem {
  id: number
  data: string
}

type SampleItemList = Array<SampleItem>

export default {
  title: 'Example/Vue3SmoothDnD',
  component: Container,
  argType: {
    onDrop: {},
    items: [],
  },
}

const Template: Story = (args) => ({
  components: { Container, Draggable },
  setup() {
    const { items, onDrop } = args
    return { items, onDrop }
  },
  template: `<Container @drop="onDrop">
      <Draggable v-for="(item, i) in items" :key="item.id">
        <div class="draggable">{{ i + 1 }} -> {{ item.data }}</div>
      </Draggable>
    </Container>
  `,
})

export const Primary = Template.bind({})
Primary.args = {
  onDrop: (dropResult: DropResult) => {
    console.log('onDrop', dropResult)
  },
  items: [
    { id: 1, data: 'Princess Mononoke' },
    { id: 2, data: 'Spirited Away' },
    { id: 3, data: 'My Neighbor Totoro' },
    { id: 4, data: "Howl's Moving Castle" },
  ] as SampleItemList,
}
