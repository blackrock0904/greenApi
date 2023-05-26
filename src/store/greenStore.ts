import {makeObservable, observable, action} from "mobx";

export interface IMessage {
    id : string,
    text: string,
    incoming: boolean
}

export interface IGreenStore {
    isEligible: boolean;
    greenId: string;
    greenToken: string;
    phone: number | null;
    messages: IMessage[];
    logout: () => void;
    setEligible: (v: boolean) => void;
    setPhone: (v: number) => void;
    addMessage: (message: IMessage) => void;
    clearMessages: () => void;
}

class GreenStore implements IGreenStore{
    isEligible: boolean;
    greenId: string;
    greenToken: string;
    phone: number | null;
    messages: IMessage[];

    constructor() {
        makeObservable(this, {
            isEligible: observable,
            phone: observable,
            messages: observable,
            logout: action,
            setEligible: action,
            setPhone: action,
            addMessage: action,
            clearMessages: action,
        });
        this.isEligible = false;
        this.greenId = "";
        this.greenToken = "";
        this.phone = null;
        this.messages = [];
    };

    logout() {
        this.isEligible = false;
        this.greenId = "";
        this.greenToken = "";
        this.phone = null;
        this.messages = [];
    }

    setEligible(v: boolean) {
        this.isEligible = v;
    }

    setPhone(v: number | null): void {
        this.phone = v;
    }

    addMessage(message: IMessage): void {
        this.messages.push(message);
    }

    clearMessages(): void {
        this.messages = []
    }
}

const storeInstance = new GreenStore();

export default storeInstance;