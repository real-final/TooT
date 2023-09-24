package com.realfinal.toot.api.kis.util;

import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class PeriodCronUtil {

    private boolean shouldRun = false;

    @PostConstruct
    public void init() {   // 프로젝트 용
        LocalTime now = LocalTime.now();
        if (now.isAfter(LocalTime.of(8, 0)) && now.isBefore(LocalTime.of(15, 59))) {
            shouldRun = true;
        }
    }

    // 매일 주중 7시에만 실행
    @Scheduled(cron = "0 0 7 ? * MON-FRI")
    public void startTasks() {
        shouldRun = true;
    }

    // 매주 토요일 7시에 실행
    @Scheduled(cron = "0 0 7 ? * SAT")
    public void stopTasks() {
        shouldRun = false;
    }

    public boolean shouldRun() {
        return shouldRun;
    }

}
