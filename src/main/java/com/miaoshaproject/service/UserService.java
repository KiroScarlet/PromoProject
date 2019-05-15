package com.miaoshaproject.service;

import com.miaoshaproject.service.model.UserModel;
import org.springframework.stereotype.Service;

/**
 * @author KiroScarlet
 * @date 2019-05-15  -15:50
 */
public interface UserService {
    UserModel getUserById(Integer id);

}
