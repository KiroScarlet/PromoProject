package com.miaoshaproject.error;

/**
 * @author KiroScarlet
 * @date 2019-05-15  -21:33
 */
public interface CommonError {
    public int getErrCode();

    public String getErrMsg();

    public CommonError setErrMsg(String errMsg);
}
