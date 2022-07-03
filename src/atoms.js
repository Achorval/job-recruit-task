import { atom } from 'recoil';

export const registerState = atom({
    key: 'registerState', 
    default: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [],
});