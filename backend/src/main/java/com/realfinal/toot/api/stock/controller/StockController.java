package com.realfinal.toot.api.stock.controller;

import com.realfinal.toot.api.stock.service.StockService;
import com.realfinal.toot.common.model.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stock")
@RequiredArgsConstructor
public class StockController {
    private final StockService stockService;
    public CommonResponse<Integer> buyStock(@RequestParam String accessToken, @RequestParam String stockId,
                                            @RequestParam int count) {
        return CommonResponse.success(stockService.buyStock(accessToken, stockId, count));
    }
}
