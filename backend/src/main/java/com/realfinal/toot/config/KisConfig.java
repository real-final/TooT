package com.realfinal.toot.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "kis")
@Getter
public class KisConfig {
  private String appKey;
  private String appSecret;
}
