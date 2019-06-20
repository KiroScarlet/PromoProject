package com.miaoshaproject.service;

import com.miaoshaproject.service.model.PromoModel;

/**
 * @author KiroScarlet
 * @date 2019-05-24  -21:26
 */
public interface PromoService {

    PromoModel getPromoByItemId(Integer itemId);
}
