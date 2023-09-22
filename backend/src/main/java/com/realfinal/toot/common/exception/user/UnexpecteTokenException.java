package com.realfinal.toot.common.exception.user;

import com.realfinal.toot.common.exception.ErrorCode;
import com.realfinal.toot.common.model.BaseException;

public class UnexpecteTokenException extends BaseException {

    public UnexpecteTokenException() {super(ErrorCode.UNEXPECTED_ERROR);}

}
