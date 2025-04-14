// stores/invite.ts
import { defineStore } from "pinia";

export const useInviteStore = defineStore("invite", {
    state: () => ({
        inviter: "",
        poolid: "",
        role: "",
        address: "",
    }),
    actions: {
        setInviteData(inviter: string, poolid: string, role: string, address: string) {
            this.inviter = inviter;
            this.poolid = poolid;
            this.role = role;
            this.address = address;
        },
        clearInviteData() {
            this.inviter = "";
            this.poolid = "";
            this.role = "";
            this.address = "";
        }
    },
});
