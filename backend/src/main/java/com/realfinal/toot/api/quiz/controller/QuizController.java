package com.realfinal.toot.api.quiz.controller;

import com.realfinal.toot.api.quiz.response.QuizQuestionRes;
import com.realfinal.toot.api.quiz.service.QuizService;
import com.realfinal.toot.common.model.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/quiz")
@RestController
public class QuizController {

    private final QuizService quizService;
    private final String SUCCESS = "success";

    /**
     * 리스트는 랜덤으로 뽑아서 4개 (쌍으로 묶어서) 그리고 문제 정답 인덱스(리스트에서의)랑 정답 단어(스트링) 이렇게 보내주기
     *
     * @return 문제리스트
     */
    @GetMapping("/")
    public CommonResponse<?> getQuestion() {
        log.info("QuizController_getQuestion_start");
        QuizQuestionRes quizQuestionRes = quizService.getQuestion();
        log.info("QuizController_getQuestion_end: "+quizQuestionRes);
        return CommonResponse.success(quizQuestionRes);
    }

    /**
     * 오늘 문제 풀었나 확인. 호출되면 바로 풀었다고 저장해버리니 주의
     *
     * @param accessToken id 추출 위해
     * @return 풀었나 안풀었나
     */
    @GetMapping("/today")
    public CommonResponse<?> isQuizTodayAvailable(
            @RequestHeader(value = "accesstoken", required = false) String accessToken) {
        log.info("QuizController_isQuizTodayAvailable_start: " + accessToken);
        Boolean isAvailable = quizService.isQuizTodayAvailable(accessToken);
        log.info("QuizController_isQuizTodayAvailable_end: " + isAvailable);
        return CommonResponse.success(isAvailable);
    }


    /**
     * 정답일때 호출되는 api. cash랑 seedmoney 10000원씩 증가
     *
     * @param accessToken id 추출 위해
     * @param result      결과 스트링. 추후 뺄지말지 정해야함
     * @return 성공 스트링.
     */
    @PostMapping("/")
    public CommonResponse<?> applyQuizResult(
            @RequestHeader(value = "accesstoken", required = false) String accessToken,
            @RequestBody String result) {
        log.info("QuizController_applyQuizResult_start: " + accessToken + " " + result);
        quizService.saveQuizResult(accessToken, result);
        log.info("QuizController_applyQuizResult_end: " + SUCCESS);
        return CommonResponse.success(SUCCESS);
    }
}
