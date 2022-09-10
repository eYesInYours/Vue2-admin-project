// 获取品牌管理的数据的模块
import request from '@/utils/request'

// GET /admin/acl/user/{page}/{limit}
// 获取品牌数据的接口
export const reqTradeMarkList = (page, limit) => request({
    url:`/admin/product/baseTrademark/${page}/${limit}`,
    method:'GET'
})

// 处理添加品牌
// 新增品牌:
// admin/product/baseTrademark/save post 携带两个参数:品牌名称、品牌logo
// 切记:对于新增的品牌，给服务器传递数据，不需要传递ID，ID是由服务器生成

// 修改品牌的
// 修改品牌
// admin/product/baseTrademark/update put 携带三个参数: id、品牌名称、品牌logo
// 切记:对于修改某一个品牌的操作，前端携带的参数需要带上id，你需要告诉服务器修改的是哪一个品牌
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    // 有id表示修改
    if(tradeMark.id){
        return request({
            url:'/admin/product/baseTrademark/update',
            method:'put',
            data:tradeMark
        })
    }else{
        // 添加
        return request({
            url:'/admin/product/baseTrademark/save',
            method:'post',
            data:tradeMark
        })
    }
}

// 删除品牌
// DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => request({
        url:`/admin/product/baseTrademark/remove/${id}`,
        method:'delete'
    })
