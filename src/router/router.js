import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        name:"homePage",
        component: () =>
            import ('../views/homePage.vue'),


    },
 
    {
        path: "/mainPage",
        name: 'mainPage',
        component: () =>
            import ('../components/MainPage.vue'),
        redirect: '/filltheform',
        children: [
            {
                path: '/filltheform',
                name: "firstPage",
                component: () =>
                    import ('../views/firstPage.vue')
            },
            {
                path: '/favList',
                name: "favList",
                component: () =>
                    import ('../views/favList.vue')

            },
            {
                path:'/community',
                name:"community",
                component: () =>
                    import ('../views/community.vue')

            },
            {
                path:'/review',
                name:"review",
                component: () =>
                    import ('../views/review.vue')

            },
            {
                path:'/password',
                name:"password",
                component: () =>
                    import ('../views/password.vue')

            },
            {
                path:'/profile',
                name:"profile",
                component: () =>
                    import ('../views/profile.vue')

            },
        ]
    },
    {
        path:"/mobile",
        name:"mobileHomePage",
        component: () =>
            import ('../views/mobileHome.vue'),


    },
    {
        path:"/mobileMain",
        name:"mobileMainPage",
        component: () =>
            import ('../components/mobileMainPage.vue'),
        redirect: '/mfilltheform',
        children: [
            {
                path: '/mfilltheform',
                name: "mfirstPage",
                component: () =>
                    import ('../views/mfirstPage.vue')
            },
            {
                path: '/mfavList',
                name: "mfavList",
                component: () =>
                    import ('../views/mfavList.vue')

            },
            {
                path:'/mcommunity',
                name:"mcommunity",
                component: () =>
                    import ('../views/mcommunity.vue')

            },
            {
                path:'/mreview',
                name:"mreview",
                component: () =>
                    import ('../views/mreview.vue')

            },
            {
                path:'/mpassword',
                name:"mpassword",
                component: () =>
                    import ('../views/password.vue')

            },
            {
                path:'/mprofile',
                name:"mprofile",
                component: () =>
                    import ('../views/profile.vue')

            },
        ]


    },
]

    const router = new VueRouter({
        routes
    })

    export default router