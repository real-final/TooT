package com.realfinal.toot.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name="industry")
@Getter
@NoArgsConstructor
public class Industry extends BaseEntity{

  @Column(name="name", nullable = false, length = 50)
  private String industry_class;

  @Column(name="name", nullable = false, length = 50)
  private String wics;

}
