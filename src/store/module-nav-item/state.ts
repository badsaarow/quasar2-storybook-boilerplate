export interface NavItemStateInterface {
  navItems: any
}

function state(): NavItemStateInterface {
  return {
    navItems: [
      {
        root: '/home',
        to: '/home',
        icon: 'las la-home',
        label: 'Home',
      },
      {
        root: '/questions',
        to: '/questions',
        icon: 'las la-question-circle',
        label: 'Questions',
      },
      {
        root: '/images',
        to: '/images',
        icon: 'las la-image',
        label: 'Images',
      },
    ],
  }
}

export default state
