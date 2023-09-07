import axiosInsstance from "../ultils/axios"

import { Ticket } from '@acme/shared-models';

const ticketService = {
    getTicketsAPI: async (): Promise<Ticket[]> => {
        try {
            const res = (await axiosInsstance.get('/tickets')) as Ticket[];
            return res;
        } catch (error) {
            return []
        }
    },
    getTicketDetailAPI: async (ticketId: number): Promise<Ticket> => {
        try {
            const res = (await axiosInsstance.get(`/tickets/${ticketId}`)) as Ticket;
            return res;
        } catch (error) {
            return {} as Ticket;
        }
    },
    completeTicketAPI: async (ticketId: number): Promise<void> => {
        try {
            await axiosInsstance.put(`/tickets/${ticketId}/complete`);
        } catch (error) {
            throw error
        }
    },
    incompleteTicketAPI: async (ticketId: number): Promise<void> => {
        try {
            await axiosInsstance.delete(`/tickets/${ticketId}/complete`);
        } catch (error) {
            throw error
        }
    },
    assignToUserAPI: async (ticketId: number, userId: number): Promise<void> => {
        try {
            await axiosInsstance.put(`/tickets/${ticketId}/assign/${userId}`);
        } catch (error) {
            throw error
        }
    },
    unassignToUserAPI: async (ticketId: number): Promise<void> => {
        try {
            await axiosInsstance.put(`/tickets/${ticketId}/unassign`);
        } catch (error) {
            throw error
        }
    }
}

export default ticketService;