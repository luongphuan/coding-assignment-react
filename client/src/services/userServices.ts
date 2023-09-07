import axiosInsstance from "../ultils/axios"

import { User } from '@acme/shared-models';

const userServices = {
    getUsersAPI: async (): Promise<User[]> => {
        try {
            const res = (await axiosInsstance.get('/users')) as User[];
            return res;
        } catch (error) {
            console.log('error from axios', error);
            return []
        }
    }
}

export default userServices;