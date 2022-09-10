// 添加spu中的sku
import request from '@/utils/request'

// 获取图片数据
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({
    url:`/admin/product/spuImageList/${spuId}`,
    method:'get'
})

// 获取销售属性
// GET /admin/product/spuSaleAttrList/{spuId}
export const reqSaleAttrList = (spuId) => request({
    url:`/admin/product/spuSaleAttrList/${spuId}`,
    method:'get'
})

// 获取平台属性
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'get'
})

// 保存sku
// POST /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({
    url:'/admin/product/saveSkuInfo',
    method:'post',
    data:skuInfo
})

// 查看sku
// GET /admin/product/findBySpuId/{spuId}
export const reqFindSku = (spuId) => request({
    url:`/admin/product/findBySpuId/${spuId}`,
    method:'get'
})


// ------
// 以下是sku组件中使用到的接口


// 获取sku列表
// GET /admin/product/list/{page}/{limit}
export const reqGetSkuList = (page, limit) => request({
    url:`/admin/product/list/${page}/${limit}`,
    method:'get'
})

// 上架
// GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => request({
    url:`/admin/product/onSale/${skuId}`,
    method:'get'
})

// 下架
// GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => request({
    url:`/admin/product/cancelSale/${skuId}`,
    method:'get'
})

// 查看按钮，查看sku详情
// GET /admin/product/getSkuById/{skuId}
export const reqGetSkuById = (skuId) => request({
    url:`/admin/product/getSkuById/${skuId}`,
    method:'get'
})