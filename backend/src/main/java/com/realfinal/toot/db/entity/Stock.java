package com.realfinal.toot.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="stock")
@Getter
@NoArgsConstructor
public class Stock extends BaseEntity{

  @ManyToOne
  @JoinColumn(name="industry_id")
  private Industry industry;

  @Column(name="stock_name", nullable = false, length = 50)
  private String stockName;

  @Column(name="outline", nullable = false, length = 500)
  private String outline;

  @Column(name="per")
  private Float per;

  @Column(name="pbr")
  private Float pbr;

  @Column(name="roe")
  private Float roe;

  @Column(name="roa")
  private Float roa;

  @Column(name="dept_ratio")
  private Float deptRatio;

}
