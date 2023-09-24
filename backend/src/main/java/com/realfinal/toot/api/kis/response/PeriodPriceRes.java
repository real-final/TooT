package com.realfinal.toot.api.kis.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.realfinal.toot.api.kis.response.MinutePriceRes.Output1;
import com.realfinal.toot.api.kis.response.MinutePriceRes.Output2;
import java.util.List;
import lombok.Getter;

public class PeriodPriceRes {

  private MinutePriceRes.Output1 output1;
  private List<MinutePriceRes.Output2> output2 = null;
  private String corp; // 종목번호

  public void setCorp(String corp) {
    this.corp = corp;
  }

  @Getter
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Output1 {
  }

  @Getter
  @JsonIgnoreProperties(ignoreUnknown = true)
  public static class Output2 {

    private String stck_bsop_date; // 날짜
    private String stck_clpr; // 종가
    private String stck_oprc; // 시가
    private String stck_hgpr; // 최고가
    private String stck_lwpr; // 최저가
    private String acml_vol; // 누적 거래량
  }

}
