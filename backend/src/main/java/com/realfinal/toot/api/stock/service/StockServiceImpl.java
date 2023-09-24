package com.realfinal.toot.api.stock.service;

import com.realfinal.toot.api.user.response.UserRes;
import com.realfinal.toot.api.user.service.UserService;
import com.realfinal.toot.common.util.Price;
import com.realfinal.toot.db.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional
@Service
public class StockServiceImpl implements StockService {
    private final UserService userService;

    public int buyStock(String accessToken, String stockId, int count) {
        UserRes user=userService.getUserInfo(accessToken);

        if(user == null) {
            return -1;
        }
        int totalPrice=Price.getCurrentPrice(stockId)*count;

        if(user.getCash()>=totalPrice) {
//            user.updateCash(user.getCash()-totalPrice);
            return 0;
        }
        return -1;
    }
}
