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

export const Accent = Template.bind({})
Accent.args = {
  flat: true,
  dense: true,
  round: true,
  icon: 'menu',
  color: 'accent',
  label: 'Accent',
}
export const Negative = Template.bind({})
Negative.args = {
  color: 'negative',
  label: 'Negative',
}
export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
  label: 'Primary',
}
export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary',
  label: 'Secondary',
}
export const Amber = Template.bind({})
Amber.args = {
  color: 'amber',
  label: 'Amber',
}
export const Purple = Template.bind({})
Purple.args = {
  color: 'purple',
  label: 'Purple',
}
