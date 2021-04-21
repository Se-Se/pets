export function setStorage(key, val) {
    wx.setStorage({
        key: key,
        data: val
    });
}
export function getStorage(key) {
    return new Promise((reslove,reject) => {
        wx.getStorage({
            key,
            success(res) {
                reslove(res.data);
            },
            fail(err) {
                reject(err);
            }
        });
    });
}