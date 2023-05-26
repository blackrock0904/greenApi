import {makeObservable, observable, action} from "mobx";

export enum MessagesType {
    in = "in",
    out = "out"
}

export interface IMessage {
    text: string,
    type: MessagesType,
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
    }

    setEligible(v: boolean) {
        this.isEligible = v;
    }

    setPhone(v: number | null): void {
        this.phone = v;
    }
}

const storeInstance = new GreenStore();

export default storeInstance;