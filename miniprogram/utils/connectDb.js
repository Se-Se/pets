export function upFile() {
    wx.chooseImage({
        success(res) {
            console.log(res)
            const tempFilePaths = res.tempFilePaths
            wx.uploadFile({
                url: 'https://7072-product-3g82ogbs6a8b5380-1305212632.tcb.qcloud.la/pet_header_img', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                    'user': 'test'
                },
                success(res) {
                    const data = res.data
                    //do something
                }
            })
        }
    })
}
export function cloudUpFiles(dir_name) {
    return new Promise((reslove) => {
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                wx.showLoading({
                    title: '正在上传...',
                    mask: true,
                });
                const arr = [];
                console.log(111, res)
                const tempFilePaths = res.tempFilePaths;
                tempFilePaths.forEach((item, index) => {
                    const stemp = new Date().getTime();
                    wx.cloud.uploadFile({
                        cloudPath: `${dir_name}/${stemp}.png`,
                        filePath: item
                    }).then((res) => {
                        console.log(res)
                        arr.push({ fileID: res.fileID, name: 'test' });
                        if (arr.length === tempFilePaths.length) {
                            // this.uploadList('add', arr);
                            reslove(arr);
                        }
                    });
                });
            }
        });
    })

}

export function cloudUpSingleFile(dir_name) {
    return new Promise((reslove) => {
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                wx.showLoading({
                    title: '正在上传...',
                    mask: true,
                });
                const arr = [];
                const tempFilePaths = res.tempFilePaths;
                let str = tempFilePaths[0].split('.')[0];
                let name = str.substring(str.length-10);
                wx.cloud.uploadFile({
                    cloudPath: `${dir_name}/${name}.png`,
                    filePath: tempFilePaths[0]
                }).then((res) => {
                    arr.push({ fileID: res.fileID, name: 'test' });
                    reslove(arr);
                });
            }
        });
    })

}
export function addDbCloudInfo(name, info) {
    if (!wx.cloud) {
        console.log('wx.cloud error');
        return;
    }
    const db = wx.cloud.database();
    return db.collection(name).add({ data: info })

}

export function updateDb(c_name, whereObj, upAttr, val) {
    return new Promise(reslove => {
        const db = wx.cloud.database();
        db.collection(c_name).where(whereObj).update({
            data: {
                [upAttr]: val
            },
            success: function (res) {
                reslove(res.data)
            }
        })
    });
}
export function getDb(c_name, whereObj) {
    return new Promise(reslove => {
        const db = wx.cloud.database();
        db.collection(c_name).where(whereObj).get().then(res=>{
            reslove(res.data)
        })
    });
}