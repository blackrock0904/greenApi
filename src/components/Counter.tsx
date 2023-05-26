import React, {useEffect} from 'react';
import {autorun, reaction, toJS, when} from "mobx";
import countStore from "../store/counterStore";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {Api} from "../utils/api";
const ID = "1101824783";
const TOKEN = "1e9e5b2074ef4c55b215128d96fe93bdcbdcdd32da4a4e03a0";
const Counter = () => {
    const getSetting = async () => {
        const res = await Api.getSettings(ID, TOKEN);
        console.log(111, res)
    }

    const sendMessage = async () => {
        const data = {
            "chatId": "79501205563@c.us",
            "message": "Привет, не обращай внимание, это тесты"
        }
        const res = await Api.sendMessage(ID, TOKEN, data)
        console.log(111, res)
    }

    const receiveNotification = async () => {
        const res = await Api.receiveNotification(ID, TOKEN)
        console.log(111, res)
    }



    return (
        <div className="App">
            <input type="text" placeholder='IdInstance'/>
            <input type="text" placeholder='ApiTokenInstance'/>
            <button onClick={() => getSetting()}>get settings</button>
            <button onClick={() => sendMessage()}>send message</button>
            <button onClick={() => receiveNotification()}>receiveNotification</button>
        </div>
    );
};

export default observer(Counter);