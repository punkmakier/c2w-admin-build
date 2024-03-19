import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '@/stores/auth.js';
function auth() {
    const auth = useAuthStore();
    if (!auth.user) {
        return '/';
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/dashboard',
            component: AppLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    beforeEnter: auth,
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/admins',
                    name: 'dashboardadmins',
                    beforeEnter: auth,
                    component: () => import('@/views/DashboardAdmin.vue')
                },
                {
                    path: '/paymentmethod',
                    name: 'paymentmethod',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/PaymentMethod.vue')
                },
                {
                    path: '/useraccounts',
                    name: 'useraccounts',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/UserAccounts.vue')
                },
                {
                    path: '/userdeposits',
                    name: 'userdeposits',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/UserDeposits.vue')
                },
                {
                    path: '/userwithdrawals',
                    name: 'userwithdrawals',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/UserWithdrawals.vue')
                },
                {
                    path: '/agentwithdrawals',
                    name: 'agentwithdrawals',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/AgentWithdrawals.vue')
                },
                {
                    path: '/agents',
                    name: 'agents',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/AgentsList.vue')
                },

                {
                    path: '/games',
                    name: 'games',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/Games.vue')
                },

                {
                    path: '/chat',
                    name: 'chat',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/ChatSupport.vue')
                },
                {
                    path: '/arena',
                    name: 'arena',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/ArenaManagement.vue')
                },
                {
                    path: '/3dlotto',
                    name: '3dlotto',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/Lottery3D.vue')
                },
                {
                    path: '/2dlotto',
                    name: '2dlotto',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/Lottery2D.vue')
                },
                {
                    path: '/pick3',
                    name: 'pick3',
                    beforeEnter: auth,
                    component: () => import('@/views/pages/LotteryPick3.vue')
                }
            ]
        }
    ]
});

export default router;
