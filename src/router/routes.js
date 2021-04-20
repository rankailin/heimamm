export default [
  { path: '/', redirect: '/login' },
  { name: 'Login', path: '/login', component: () => import('@/views/Login') },
  {
    name: 'Layout',
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: []
  }
]
