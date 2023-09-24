package com.realfinal.toot.api.kis.service;

import com.realfinal.toot.api.kis.response.CurrentPriceRes;
import com.realfinal.toot.api.kis.util.KisAccessTokenUtil;
import com.realfinal.toot.api.kis.util.OpenCronUtil;
import com.realfinal.toot.common.exception.kis.KisApiCallDeniedException;
import com.realfinal.toot.common.exception.kis.KisApiCallTooManyException;
import com.realfinal.toot.config.KisConfig;
import com.realfinal.toot.config.Kospi32Config;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CurrentPriceService {

    private final KisConfig kisConfig;
    private final Kospi32Config kospi32Config;
    private final OpenCronUtil openCronUtil;
    private final KisAccessTokenUtil kisAccessTokenUtil;
    private final String kisUri = "https://openapi.koreainvestment.com:9443";
    private final WebClient kisWebClient = WebClient.builder().baseUrl(kisUri).build();

    @Scheduled(fixedRate = 4000, initialDelay = 1000)
    public void fetchCurrentPriceForBatch1() {
        getCurrentPrice(kospi32Config.company1, "현재가 기업1");
    }

    @Scheduled(fixedRate = 4000, initialDelay = 2000)
    public void fetchCurrentPriceForBatch2() {
        getCurrentPrice(kospi32Config.company2, "현재가 기업2");
    }

    @Scheduled(fixedRate = 4000, initialDelay = 3000)
    public void fetchCurrentPriceForBatch3() {
        getCurrentPrice(kospi32Config.company3, "현재가 기업3");
    }

    @Scheduled(fixedRate = 4000, initialDelay = 4000)
    public void fetchCurrentPriceForBatch4() {
        getCurrentPrice(kospi32Config.company4, "현재가 기업4");
    }

    private void getCurrentPrice(List<String> companies, String logInfo) {
        if (!openCronUtil.shouldRun()) {
            return;
        }
        long start = System.currentTimeMillis();
        for (String company : companies) {
            CurrentPriceRes result = fetchCurrentPriceForCompany(company);
            // 여기에 배열에 넣는 작업 들어감
        }
        long end = System.currentTimeMillis();
        log.info(logInfo + " 수행시간: " + (end - start) + " ms");
    }

    private CurrentPriceRes fetchCurrentPriceForCompany(String companyId) {
        try {
            CurrentPriceRes currentPriceRes = kisWebClient
                    .get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/uapi/domestic-stock/v1/quotations/inquire-price")
                            .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                            .queryParam("FID_INPUT_ISCD", companyId)
                            .build())
                    .headers(httpHeaders -> {
                        httpHeaders.add("authorization", "Bearer " + kisAccessTokenUtil.getAccessToken());
                        httpHeaders.add("appkey", kisConfig.getAppKey());
                        httpHeaders.add("appsecret", kisConfig.getAppSecret());
                        httpHeaders.add("tr_id", "FHKST01010100");
                    })
                    .retrieve()
                    .bodyToMono(CurrentPriceRes.class)
                    .block();
            currentPriceRes.setCorp(companyId);
            return currentPriceRes;
        } catch (HttpServerErrorException.InternalServerError e) {
            log.info("호출 횟수 초과");
            throw new KisApiCallTooManyException();
        } catch (HttpClientErrorException.NotFound e) {
            log.info("접근 거부");
            throw new KisApiCallDeniedException();
        }
    }
}
