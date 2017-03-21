import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserData } from "../services/user-data";

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {
  private ip = 'http://v401app.jingkoo.net';  // URL to web API
  constructor(public http: UserData) {
    console.log('Hello HttpService Provider');
  }
  getHomebanner(data?: Object) {//轮播图
    return this.http.get(this.ip + '/Index/ads/int_pos_id/3/int_size/10', data)
  }
  getCategoryAd(data?: Object) {//热门品类下的广告
    return this.http.get(this.ip + '/Index/ads/int_pos_id/27/int_size/10', data)
  }
  getCategoryRecommendGoods(data?: Object) {//新品
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/new', data)
  }
  getCategoryRecommendGoodsBest(data?: Object) {//精品商品
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/best', data)
  }
  getCategoryRecommendGoodsHot(data?: Object) {//精选专题下的商品列表
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/hot', data)
  }
  getBrands(data?: Object) {//热门品牌下的品牌列表
    return this.http.get(this.ip + '/Index/get_brands', data)
  }
  /*商品详情页*/
  getGoodsGallery(data?: Object) {//商品详情的相册图片轮播
    return this.http.get(this.ip + '/Goods/get_goods_gallery', data)
  }
  getPriceSection(data?: Object) {//商品价格优惠区间
    return this.http.get(this.ip + '/Goods/get_price_section', data)
  }
  getGoodsInfo(data?: Object) {//商品详情信息
    return this.http.get(this.ip + '/Goods/goods_info', data)
  }
  getGoodsParameter(data?: Object) {//获取商品参数
    return this.http.get(this.ip + '/Goods/get_goods_parameter', data)
  }
  getGoodsSaleCity(data?: Object) {//获取商品的销售区域
    return this.http.get(this.ip + '/Goods/get_goods_sale_city', data)
  }
  getSupplierInfo(data?: Object) {//获取供应商信息
    return this.http.get(this.ip + '/Goods/get_supplier_info', data)
  }
  getGoodsCollect(data?: Object) {//商品关注
    return this.http.get(this.ip + '/Goods/get_goods_collect', data)
  }
  collectDel(data?: Object) {//取消商品关注
    return this.http.get(this.ip + '/Goods/collect_del', data)
  }
  getBonus(data?: Object) {//优惠券列表
    return this.http.get(this.ip + '/Goods/get_bonus', data)
  }
  sendByUser(data?: Object) {//领取优惠券
    return this.http.get(this.ip + '/Goods/send_by_user', data)
  }
  getGoodsFittings(data?: Object) {//组合商品
    return this.http.get(this.ip + '/Goods/get_goods_fittings', data)
  }
  getLinkedGoods(data?: Object) {//（12）关联商品
    return this.http.get(this.ip + '/Goods/get_linked_goods', data)
  }
  searchGoods(data?: Object) {//商品搜索列表页
    return this.http.post(this.ip + '/Search/search_goods', data)
  }
  /**
   * 商品分类列表页
   */
  getCategorys(data?: Object) {//（1）获取九大分类
    return this.http.get(this.ip + '/Category/get_categorys', data)
  }
  getChildrenCaCtegory(data?: Object) {//（2）获取九大分类下的子分类
    return this.http.get(this.ip + '/Category/get_children_category', data)
  }
  categoryGoods(data?: Object) {//（3）商品分类列表页(筛选)
    return this.http.get(this.ip + '/Category/category_goods', data)
  }
  getGoodsAttribute(data?: Object) {//（13）获取初始商品属性
    return this.http.get(this.ip + '/Goods/get_goods_attribute', data)
  }
  getAttrList(data?: Object) {//如果返回的(good_type) 商品类型是goods_spectacles 根据所选球镜，获取柱镜列表
    return this.http.get(this.ip + '/Goods/get_attr_list', data)
  }
  getZhujing(data?: Object) {//如果返回的(good_type) 商品类型是goods再调用接口如下
    return this.http.get(this.ip + '/Goods/get_zhujing', data)
  }
  /**
   * 个人中心页
   */
   getCityJsonData(){
     return this.http.get('./assets/data/city-data.json')
   }
}