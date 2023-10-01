package com.realfinal.toot.api.chatbot.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class Ibubble {

    private final String type;
    private final String message;
    private final String url;
    private final Boolean speaker;

    @Builder
    public Ibubble(String type, String message, String url, Boolean speaker) {
        this.type = type;
        this.message = message;
        this.url = url;
        this.speaker = speaker;
    }
}
