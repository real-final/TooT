package com.realfinal.toot.api.stock.service;

public interface StockService {
    int buyStock(String accessToken, String stockId, int count);
}
