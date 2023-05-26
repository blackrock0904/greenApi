import {action, makeObservable, observable} from "mobx";

class CounterStore {
    counter: number = 0;

    constructor(cnt: number = 0) {
        makeObservable(this, {
            counter: observable,
            inc: action,
            dec: action
        });
        this.counter = cnt;
    }

    inc() {
        this.counter += 1;
    }
    dec() {
        this.counter -= 1;
    }
}

export default new CounterStore(0);