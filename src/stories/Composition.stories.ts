import { Story } from '@storybook/vue3'
import MyComposition from '../components/CompositionComponent.vue'
import { Todo, Meta } from '../components/models'

export default {
  title: 'Example/Composition',
  component: MyComposition,
  argTypes: {
    onClick: {},
  },
}

const Template: Story = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyComposition },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<my-composition v-bind="args" />',
})

const todos: Todo[] = [{ id: 1, content: 'Cleaning' }]
const meta: Meta = {
  totalCount: todos.length,
}

export const Active = Template.bind({})
Active.args = {
  title: 'Hello World',
  todos,
  meta,
  active: true,
}

export const NonActive = Template.bind({})
NonActive.args = {
  title: 'Hello World',
  todos,
  meta,
  active: false,
}
