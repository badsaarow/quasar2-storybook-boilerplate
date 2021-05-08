import { Story } from '@storybook/vue3'
import MyButton from './QuasarBtn.vue'

export default {
  title: 'Example/Quasar',
  component: MyButton,
  argType: {
    onClick: {},
  },
}

const Template: Story = (args) => ({
  components: { MyButton },
  setup() {
    return { args }
  },
  template: '<my-button v-bind="args" />',
})

export const Primary = Template.bind({})
Primary.args = {
  flat: true,
  dense: true,
  round: true,
  icon: 'menu',
  label: 'Button',
}
