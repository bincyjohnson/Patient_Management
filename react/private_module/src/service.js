import mongoInstance from './api/mongoInstance';

export const getData = (url) => mongoInstance.get(url);

export const setData = (url, data) => mongoInstance.post(url, data);

export const editData = (url, data) => mongoInstance.patch(url, data);

export const deleteData = (url) => mongoInstance.delete(url);
