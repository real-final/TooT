package com.realfinal.toot.api.kis.service;

import com.realfinal.toot.api.kis.response.CurrentPriceRes;
import com.realfinal.toot.api.kis.response.PeriodPriceRes;
import com.realfinal.toot.api.kis.util.KisAccessTokenUtil;
import com.realfinal.toot.api.kis.util.TimeToStringUtil;
import com.realfinal.toot.config.KisConfig;
import com.realfinal.toot.config.Kospi32Config;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@EnableAsync
public class PeriodPriceService {

    private final KisConfig kisConfig;
    private final Kospi32Config kospi32Config;
    private final KisAccessTokenUtil kisAccessTokenUtil;
    private final String kisUri = "https://openapi.koreainvestment.com:9443";
    private final WebClient kisWebClient = WebClient.builder().baseUrl(kisUri).build();

    // 주중 매일 7시 0분 1초에 실행
    @Scheduled(cron = "1 0 7 ? * MON-FRI")
    public void fetchPeriodPriceForBatch1_D() {
        getPeriodPrice(kospi32Config.company1, "D");
    }

    // 주중 매일 7시 0분 2초에 실행
    @Scheduled(cron = "2 0 7 ? * MON-FRI")
    public void fetchPeriodPriceForBatch2_D() {
        getPeriodPrice(kospi32Config.company2, "D");
    }

    // 주중 매일 7시 0분 3초에 실행
    @Scheduled(cron = "3 0 7 ? * MON-FRI")
    public void fetchPeriodPriceForBatch3_D() {
        getPeriodPrice(kospi32Config.company3, "D");
    }

    // 주중 매일 7시 0분 4초에 실행
    @Scheduled(cron = "4 0 7 ? * MON-FRI")
    public void fetchPeriodPriceForBatch4_D() {
        getPeriodPrice(kospi32Config.company4, "D");
    }

    // 매주 토요일 7시 0분 1초에 실행
    @Scheduled(cron = "1 0 7 ? * SAT")
    public void fetchPeriodPriceForBatch1_W() {
        getPeriodPrice(kospi32Config.company1, "W");
    }

    // 매주 토요일 7시 0분 2초에 실행
    @Scheduled(cron = "2 0 7 ? * SAT")
    public void fetchPeriodPriceForBatch2_W() {
        getPeriodPrice(kospi32Config.company2, "W");
    }

    // 매주 토요일 7시 0분 3초에 실행
    @Scheduled(cron = "3 0 7 ? * SAT")
    public void fetchPeriodPriceForBatch3_W() {
        getPeriodPrice(kospi32Config.company3, "W");
    }

    // 매주 토요일 7시 0분 4초에 실행
    @Scheduled(cron = "4 0 7 ? * SAT")
    public void fetchPeriodPriceForBatch4_W() {
        getPeriodPrice(kospi32Config.company4, "W");
    }

    private void getPeriodPrice(List<String> companies, String div) {
        for (String company : companies) {
            PeriodPriceRes periodPriceRes = fetchPeriodPriceForCompany(company, div);
            // 여기에 배열에 넣는 작업 들어감
        }
    }

    private PeriodPriceRes fetchPeriodPriceForCompany(String companyId, String div) {
        PeriodPriceRes periodPriceRes = kisWebClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice")
                        .queryParam("FID_COND_MRKT_DIV_CODE", "J")
                        .queryParam("FID_INPUT_ISCD", companyId)
                        .queryParam("FID_INPUT_DATE_1", TimeToStringUtil.getTodayAsString())
                        .queryParam("FID_INPUT_DATE_2", TimeToStringUtil.getYearLaterDayAsString())
                        .queryParam("FID_PERIOD_DIV_CODE", div)
                        .queryParam("FID_ORG_ADJ_PRC", "0")
                        .build())
                .headers(httpHeaders -> {
                    httpHeaders.add("content-type", "application/json; charset=utf-8");
                    httpHeaders.add("authorization", "Bearer " + kisAccessTokenUtil.getAccessToken());
                    httpHeaders.add("appkey", kisConfig.getAppKey());
                    httpHeaders.add("appsecret", kisConfig.getAppSecret());
                    httpHeaders.add("tr_id", "FHKST03010200");
                })
                .retrieve()
                .bodyToMono(PeriodPriceRes.class)
                .block();
        periodPriceRes.setCorp(companyId);
        return periodPriceRes;
    }

}
