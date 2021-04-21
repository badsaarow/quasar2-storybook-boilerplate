import { mount } from '@vue/test-utils'
import ButtonDemo from './ButtonDemo.vue'

describe('Button test', () => {
  const wrapper = mount(ButtonDemo, {})
  const buttonElement = wrapper.find('#mybutton')

  it('Button text', () => {
    expect(buttonElement.text()).toContain('rocket muffin')
  })

  it('Button click', async () => {
    await buttonElement.trigger('click', {})
    const spanElement = wrapper.find('span')
    expect(spanElement.text()).toBe('1')
  })
})
