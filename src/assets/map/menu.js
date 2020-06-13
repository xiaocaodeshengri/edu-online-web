import Layout from '@/views/layout/Layout'
const routeMap=[

    {
      path: '/user',
      component: Layout,
      redirect: '/user/table',
      name: '用户管理',
      meta: { title: '用户管理', icon: 'example' },
      children: [
        {
          path: 'table',
          name: '用户列表',
          component: () => import('@/views/edu/user/list'),
          meta: { title: '用户列表', icon: 'table' }
        },
        {
          path: 'save',
          name: '添加用户',
          component: () => import('@/views/edu/user/save'),
          meta: { title: '添加用户', icon: 'tree' }
        },
        {
          path: 'edit/:id',
          name: 'EduUserEdit',
          component: () => import('@/views/edu/user/save'),
          meta: { title: '编辑用户', noCache: true },
          hidden: true
        }
      ]
    },

    {
      path: '/course',
      component: Layout,
      redirect: '/course/list',
      name: '课程管理',
      meta: { title: '课程管理', icon: 'example' },
      children: [
        {
          path: 'list',
          name: '课程列表',
          component: () => import('@/views/edu/course/list'),
          meta: { title: '课程列表', icon: 'table' }
        },
        {
         path: 'info',
           name: '添加课程',
          component: () => import('@/views/edu/course/info'),
          meta: { title: '添加课程', icon: 'tree' }
         },
        {
           path: 'info/:id',
           name: 'EduCourseInfoEdit',
           component: () => import('@/views/edu/course/info'),
           meta: { title: '编辑课程基本信息', noCache: true },
           hidden: true
         },
         {
          path: 'chapter/:id',
          name: 'EduCourseChapterEdit',
          component: () => import('@/views/edu/course/chapter'),
          meta: { title: '编辑课程大纲', noCache: true },
          hidden: true
         },
        {
          path: 'publish/:id',
           name: 'EduCoursePublishEdit',
          component: () => import('@/views/edu/course/publish'),
          meta: { title: '发布课程', noCache: true },
          hidden: true
        }
      ]
    },

    {
      path: '/sub',
      component: Layout,
      redirect: '/sub/table',
      name: '订阅管理',
      meta: { title: '订阅管理', icon: 'example' },
      children: [
        {
          path: 'table',
          name: '已订阅课程',
          component: () => import('@/views/edu/sub/list'),
          meta: { title: '已订阅课程', icon: 'table' }
        },
        {
          path: 'all',
          name: '课程管理',
          component: () => import('@/views/edu/sub/all'),
          meta: { title: '课程管理', icon: 'tree' }
        },
      ]
    }
]
export default routeMap
