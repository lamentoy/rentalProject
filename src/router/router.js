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
                path: '/showResult',
                name: "secondPage",
                component: () =>
                    import ('../views/secondPage.vue')

            },
            {
                path: '/favList',
                name: "favList",
                component: () =>
                    import ('../views/favList.vue')

            }
        ]
    }]

    const router = new VueRouter({
        routes
    })

    export default router