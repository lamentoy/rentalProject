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
    }]

    const router = new VueRouter({
        routes
    })

    export default router