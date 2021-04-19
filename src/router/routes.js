export default [
  { path: '/', redirect: '/login' },
  { name: 'Login', path: '/login', component: () => import('@/views/Login') },
  {
    name: 'Registration',
    path: '/registration',
    component: () => import('@/views/Registration')
  },
  {
    name: 'Layout',
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: []
  }
]
