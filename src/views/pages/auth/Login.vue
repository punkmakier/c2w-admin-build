<script setup>
// import { useLayout } from '@/layout/composables/layout';
import { useAuthStore } from '@/stores/auth.js';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const state = reactive({
    username: '',
    password: ''
});
const store = useAuthStore();
const errorMessage = ref('');
const loading = ref(false);
const router = useRouter();
// const handleLogin = async () => {
//     loading.value = true;
//     const res = await axios.postLogin(state);
//     if (res.resStatus == 0) {
//         errorMessage.value = '';
//         const storeData = { username: res.username, token: res.token, role: res.role };
//         localStorage.setItem('auth.admin', JSON.stringify(storeData));
//         if (res.username === 'makier') {
//             router.push('/dashboard');
//         } else {
//             router.push('/admins');
//         }
//     } else {
//         errorMessage.value = res.resMsg;
//     }
//     loading.value = false;
// };

const handleLogin = async () => {
    loading.value = true;
    errorMessage.value = '';
    const res = await store.login(state);
    if (res === 'Failed') {
        errorMessage.value = 'Invalid username or password. Please try again.';
    } else {
        console.log(res);
        if (res.role === 4) {
            router.push('/dashboard');
        } else {
            router.push('/admins');
        }
    }
    loading.value = false;
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img src="@/assets/logo.png" alt="Sakai logo" class="mb-5 w-15rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="@/assets/admin.webp" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Admin!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                    <Message severity="error" :closable="false" v-if="errorMessage">{{ errorMessage }}</Message>
                    <form @submit.prevent="handleLogin">
                        <div>
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Username</label>
                            <InputText id="email1" type="text" placeholder="Enter username" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="state.username" />

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password1" v-model="state.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }" :feedback="false"></Password>

                            <!-- <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div> -->
                            <Button label="Sign In" type="submit" class="w-full p-3 text-xl mt-3" :loading="loading"></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
