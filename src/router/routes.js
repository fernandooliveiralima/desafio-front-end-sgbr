
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'categorias', name: 'categorias', component: () => import('src/pages/CategoriesPage.vue') },
      { path: 'favoritos', name: 'favoritos', component: () => import('src/pages/FavoritesPage.vue') },
      { path: 'sobre', name: 'sobre', component: () => import('src/pages/AboutPage.vue') }
      
      
    ]
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
