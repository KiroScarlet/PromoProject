package com.miaoshaproject.controller;

import com.miaoshaproject.dao.ItemDOMapper;
import com.miaoshaproject.dao.UserDOMapper;
import com.miaoshaproject.dataobject.ItemDO;
import com.miaoshaproject.dataobject.UserDO;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;

/**
 * @author KiroScarlet
 * @date 2019-05-20  -17:00
 */

@Service
public class ItemControllerTest {


    @Autowired
    private ItemDOMapper itemDOMapper;

    @Autowired
    private UserDOMapper userDOMapper;

    @Test
    public void test() {
    }
}
