// spu模块请求文件
import request from '@/utils/request'

// 获取spu列表数据接口
// GET /admin/product/{page}/{limit}  page limit category3Id
export const reqSpuList = (page, limit, category3Id) => request({
    url:`/admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id}
})

// 获取spu信息
// GET /admin/product/getSpuById/{spuId}
export const reqGetSpu = (spuId) => request({
    url:`/admin/product/getSpuById/${spuId}`,
    method:'get'
})

// 获取品牌信息
// GET /admin/product/baseTrademark/getTrademarkList
export const reqGetTrademarkList = () => request({
    url:'/admin/product/baseTrademark/getTrademarkList',
    method:'get'
})

// 获取spu图片数据
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get'
})

// 获取平台全部的销售属性
// GET /admin/product/baseSaleAttrList
export const reqSaleAttrList = () => request({
    url:'/admin/product/baseSaleAttrList',
    method:'get'
})

// 修改spu | 添加spu
// POST /admin/product/updateSpuInfo        POST /admin/product/saveSpuInfo
export const reqAddOrUpdateSpu = (spuInfo) => {
    // 有id代表修改
    if(spuInfo.id){
        return request({
            url:'/admin/product/updateSpuInfo',
            method:'post',
            data:spuInfo
        })
    }else{
        return request({
            url:'/admin/product/saveSpuInfo',
            method:'post',
            data:spuInfo
        })
    }
}

// 删除spu
// DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete'
})
