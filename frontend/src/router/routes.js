const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: { requiresAuth: "client" }
      },
      {
        path: "/admin",
        component: () => import("pages/admin/Index.vue"),
        meta: { requiresAuth: "admin" },
        children: [
          { path: "", redirect: "customers" },
          {
            path: "customers",
            component: () => import("pages/admin/CustomerList.vue")
          }
        ]
      },
      { path: "/signin", component: () => import("pages/Signin.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
