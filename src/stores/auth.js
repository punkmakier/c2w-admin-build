import { ref, watch, onScopeDispose } from 'vue';
import { defineStore } from 'pinia';
import { AdminAPIRequest as axios } from '@/plugins/APIServices.js';

function handleStorageEvent(event) {
    if (typeof key !== 'undefined' && event.key === key) {
        val.value = JSON.parse(newValue || 'null');
    }
}

function useLocalStorage(key, defaultValue) {
    const val = ref(defaultValue);
    const storageVal = window.localStorage.getItem(key);

    if (storageVal) {
        val.value = JSON.parse(storageVal);
    }

    window.addEventListener('storage', handleStorageEvent);

    onScopeDispose(() => window.removeEventListener('storage', handleStorageEvent));

    watch(val, (newValue) => window.localStorage.setItem(key, JSON.stringify(newValue)), { deep: true });

    return val; // Don't forget to return the ref value
}

export const useAuthStore = defineStore('auth', () => {
    const user = useLocalStorage('auth.admin'); // Correct usage with parentheses

    async function login(creds) {
        const getResult = await axios.postLogin(creds);
        if (getResult.resStatus == 0) {
            const res = [
                {
                    username: getResult.username,
                    token: getResult.token,
                    role: getResult.role
                }
            ];
            user.value = res;
            const returnVal = { resStatus: 0, ...res[0] };
            return returnVal;
        } else {
            return 'Failed';
        }
    }

    function resetUser() {
        user.value = null;
    }

    return {
        user,
        login,
        resetUser
    };
});
