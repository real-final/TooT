package com.realfinal.toot.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.DynamicInsert;

@DynamicInsert
@Entity
@Table(name = "user")
@Getter
@NoArgsConstructor
public class User extends BaseEntity {

    //    provider_id    varchar(255)                       not null,
    @Column(name = "provider_id")
    @NotNull
    private String providerId;
    //    seed_money     bigint   default 1000000           not null,
    @Column(name = "seed_money")
    @NotNull
    private Long seedMoney = 1000000L;
    //    cash           bigint   default 1000000           not null,
    @Column(name = "cash")
    @NotNull
    private Long cash = 1000000L;
    //    profile_image  varchar(255)                       null,
    @Column(name = "profile_image")
    private String profileImage;
    //    name           varchar(255)                       not null,
    @Column(name = "name")
    @NotNull
    private String name;
    //    bankruptcy_no  int      default 0                 not null,
    @Column(name = "bankruptcy_no")
    @NotNull
    private Integer bankruptcyNo = 0;
    //    resign_no      int      default 0                 not null,
    @Column(name = "resign_no")
    @NotNull
    private Integer resignNo = 0;
    //    last_quiz_date date                               null,
    @Column(name = "last_quiz_date")
    private LocalDateTime lastQuizDate;
    //    join_at        datetime default CURRENT_TIMESTAMP not null,
    @Column(name = "join_at", insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private LocalDateTime joinAt;
    //    delete_at      datetime                           null
    @Column(name = "delete_at")
    private LocalDateTime deleteAt;


    @Builder
    public User(String providerId, String profileImage, String name) {
        this.providerId = providerId;
        this.profileImage = profileImage;
        this.name = name;

    }
}
