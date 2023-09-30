package com.realfinal.toot.api.kis.util;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.LocalTime;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class OpenCronUtil {

  private boolean shouldRun = false;

  @PostConstruct
  public void init() {   // 프로젝트 용
    LocalTime now = LocalTime.now();
    if (now.isAfter(LocalTime.of(10, 0)) && now.isBefore(LocalTime.of(23, 00))) {
      shouldRun = true;
    }
  }

  // 매일 주중 9시부터 shouldRun 값을 true로 설정
  @Scheduled(cron = "0 0 9 ? * MON-FRI")
  public void startTasks() {
    shouldRun = true;
  }

  // 매일 주중 15시 30분에는 shouldRun 값을 false로 설정
  @Scheduled(cron = "0 30 15 ? * MON-FRI")
  public void stopTasks() {
    shouldRun = false;
  }

  public boolean shouldRun() {
    return shouldRun;
  }

}
