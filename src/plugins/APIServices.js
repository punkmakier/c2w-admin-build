import axios from './API';
import axiosDec from './API';

const get = async (path) => {
    try {
        const response = await axios.get(path);
        return response.data;
    } catch (err) {
        console.error('Error getting data', err);
    }
};

const post = async (path, data) => {
    try {
        const response = await axios.post(path, data);
        return response.data;
    } catch (err) {
        console.error('Error sending data', err);
    }
};

const getDec = async (path) => {
    try {
        const response = await axiosDec.get(path);
        return response.data;
    } catch (err) {
        console.error('Error getting data', err);
    }
};

const postDec = async (path, data) => {
    try {
        const response = await axiosDec.post(path, data);
        return response.data;
    } catch (err) {
        console.error('Error sending data', err);
    }
};

export const AdminAPIRequest = {
    // Get Request

    getshowGameList: async () => {
        return await get('/api/admin/showGameList');
    },

    // Post Request
    postRegister: async (data) => {
        return await post('/api/register', data);
    },
    postLogin: async (data) => {
        return await post('/api/admin/login', data);
    },

    postAdminMonitoring: async (data) => {
        return await post('/api/admin/adminsMonitoring', data);
    },
    postUserReqWithdrawal: async (data) => {
        return await post('/api/admin/userReqWithdrawal', data);
    },
    postUpdateUserReqWithdrawal: async (data) => {
        return await post('/api/admin/updateUserReqWithdrawal', data);
    },
    postAddGames: async (data) => {
        return await post('/api/admin/addGames', data);
    },
    postUpdateGame: async (data) => {
        return await post('/api/admin/updateGames', data);
    },
    postDeleteGame: async (data) => {
        return await post('/api/admin/deleteGames', data);
    },
    postGetAllUsers: async (data) => {
        return await post('/api/admin/allPlayers', data);
    },
    postUpdateUsers: async (data) => {
        return await post('/api/admin/updateUser', data);
    },
    getDepositHistory: async (data) => {
        return await post('/api/admin/depositHistory', data);
    },
    getWithdrawalHistory: async (data) => {
        return await post('/api/admin/withdrawalHistory', data);
    },
    getAgentWithdrawalHistory: async (data) => {
        return await post('/api/admin/agentWithdrawalHistory', data);
    },
    postGetPaymentMethods: async (data) => {
        return await post('/api/admin/getPaymentMethods', data);
    },
    postAddPaymentMethod: async (data) => {
        return await post('/api/admin/addPaymentMethod', data);
    },
    showAllPaymentMethod: async (data) => {
        return await post('/api/admin/showAllPaymentMethod', data);
    },
    getPaymentGateway: async (data) => {
        return await post('/api/admin/getPaymentGateway', data);
    },

    postUpdatePaymentMethod: async (data) => {
        return await post('/api/admin/updatePaymentMethod', data);
    },
    postAddAgent: async (data) => {
        return await post('/api/admin/addAgent', data);
    },
    showAllAgents: async (data) => {
        return await post('/api/admin/showAllAgents', data);
    },
    postUpdateAgent: async (data) => {
        return await post('/api/admin/updateAgent', data);
    },
    fetchChatList: async (data) => {
        return await post('/api/admin/fetchChatList', data);
    },
    fetchChatByToken: async (data) => {
        return await post('/api/admin/fetchChatByToken', data);
    },
    addMessageChat: async (data) => {
        return await post('/api/chat/addMessage', data);
    },

    deleteConvo: async (data) => {
        return await post('/api/admin/deleteConvo', data);
    },

    // LOTTERY
    postGetGame: async (data) => {
        return await post('/api/getGame', data);
    },
    getGameByID: async (data) => {
        return await post('/api/getGameByID', data);
    },
    postDeclareDraw: async (data) => {
        return await postDec('/api/declare', data);
    },

    // Sabong

    postBetStatus: async (data) => {
        return await postDec('/api/sabong/gameSetting', data);
    },
    postSabongDeclare: async (data) => {
        return await postDec('/api/sabong/declare', data);
    },
    postFetchArena: async (data) => {
        return await postDec('/api/sabong/fetchArena', data);
    },
    postFetchGame: async (data) => {
        return await postDec('/api/sabong/fetchGame', data);
    },
    postCreateArena: async (data) => {
        return await postDec('/api/sabong/createArena', data);
    },
    postRedeclare: async (data) => {
        return await postDec('/api/sabong/redeclare', data);
    },
    postInserReglada: async (data) => {
        return await postDec('/api/sabong/insertReglada', data);
    },
    postFetchReglada: async (data) => {
        return await postDec('/api/sabong/fetchReglada', data);
    },
    postDeleteReglada: async (data) => {
        return await postDec('/api/sabong/deleteReglada', data);
    },
    postCloseArena: async (data) => {
        return await postDec('/api/sabong/closeArena', data);
    },

    // LOTTERY
    postLotteryDeclare: async (data) => {
        return await postDec('/api/lottery/declare', data);
    },
    postLotteryFetchGame: async (data) => {
        return await postDec('/api/lottery/fetchGame', data);
    },

    // WITHDRAWALS
    approveUserWithdrawal: async (data) => {
        return await post('/api/approveUserWithdrawal', data);
    },
    approveAgentWithdrawal: async (data) => {
        return await post('/api/approveAgentWithdrawal', data);
    },
    requestCountWithdraw: async (data) => {
        return await post('/api/admin/requestCountWithdraw', data);
    },
    fetchCountChat: async (data) => {
        return await post('/api/admin/fetchCountChat', data);
    }
};
