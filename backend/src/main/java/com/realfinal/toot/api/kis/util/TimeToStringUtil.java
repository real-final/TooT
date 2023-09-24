package com.realfinal.toot.api.kis.util;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Component
public class TimeToStringUtil {

    public static String getCurrentTimeAsString() {
        LocalTime now = LocalTime.now();
        return String.format("%02d%02d%02d", now.getHour(), now.getMinute(), now.getSecond());
    }

    public static String getTodayAsString() {
        LocalDate today = LocalDate.now();
        DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");
        return today.format(FORMATTER);
    }

    public static String getYearLaterDayAsString() {
        LocalDate yearLater = LocalDate.now().plusYears(1);
        DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");
        return yearLater.format(FORMATTER);
    }

}
