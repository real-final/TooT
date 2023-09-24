package com.realfinal.toot.api.kis.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
public class CurrentPriceRes {

  private Output output;
  private String corp; // 종목번호

  public void setCorp(String corp) {
    this.corp = corp;
  }

  @Getter
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Output {
    private String stck_prpr; // 현재가
    private String prdy_vrss; // 전일 대비 금액 변동
    private String prdy_ctrt; // 전일 대비율
    private String lstn_stcn; // 상장주식수
    private String hts_avls; // 시가총액
    private String per; // PER
    private String pbr; // PBR
    private String w52_hgpr; // 52주 최고가
    private String w52_lwpr; // 52주 최저가

    @Override
    public String toString() {
      return "Output{" +
          "stck_prpr='" + stck_prpr + '\'' +
          ", prdy_vrss='" + prdy_vrss + '\'' +
          ", prdy_ctrt='" + prdy_ctrt + '\'' +
          ", lstn_stcn='" + lstn_stcn + '\'' +
          ", hts_avls='" + hts_avls + '\'' +
          ", per='" + per + '\'' +
          ", pbr='" + pbr + '\'' +
          ", w52_hgpr='" + w52_hgpr + '\'' +
          ", w52_lwpr='" + w52_lwpr + '\'' +
          '}';
    }
  }
}