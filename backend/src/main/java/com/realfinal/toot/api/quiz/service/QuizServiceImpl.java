package com.realfinal.toot.api.quiz.service;

import com.realfinal.toot.api.quiz.mapper.QuizMapper;
import com.realfinal.toot.api.quiz.response.QuizQuestionRes;
import com.realfinal.toot.api.quiz.response.QuizRes;
import com.realfinal.toot.common.exception.quiz.NoWordException;
import com.realfinal.toot.common.exception.quiz.NotEnoughQuestion;
import com.realfinal.toot.common.exception.user.MySQLSearchException;
import com.realfinal.toot.common.util.JwtProviderUtil;
import com.realfinal.toot.db.entity.User;
import com.realfinal.toot.db.entity.Word;
import com.realfinal.toot.db.repository.UserRepository;
import com.realfinal.toot.db.repository.WordRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class QuizServiceImpl implements QuizService {

    private final WordRepository wordRepository;
    private final UserRepository userRepository;
    private final JwtProviderUtil jwtProviderUtil;

    /**
     * 오늘 퀴즈 풀 수 있는지 확인
     *
     * @param accessToken 멤버 추출
     * @return 풀 수 있다 없다.
     */
    @Override
    @Transactional
    public Boolean isQuizTodayAvailable(String accessToken) {
        log.info("QuizServiceImpl_isQuizTodayAvailable_start: " + accessToken);
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        LocalDate lastQuizDate = user.getLastQuizDate();
        LocalDate currentDate = LocalDate.now();
        if (lastQuizDate == null || !lastQuizDate.isEqual(currentDate)) {
            user.setLastQuizDate(currentDate);
            log.info("QuizServiceImpl_isQuizTodayAvailable_end: " + true);
            return true;
        } else {
            log.info("QuizServiceImpl_isQuizTodayAvailable_end: " + false);
            return false;
        }
    }

    /**
     * 문제 랜덤으로 가져오기
     *
     * @return QuizQuestionRes
     */
    @Override
    public QuizQuestionRes getQuestion() {
        log.info("QuizServiceImpl_getQuestion_start");
        int maxId = (int) wordRepository.count();
        List<QuizRes> quizResList = new ArrayList<>();
        if (maxId < 4) {
            throw new NotEnoughQuestion();
        }
        int count = 0;
        Random random = new Random();
        boolean[] arr = new boolean[maxId + 1];
        while (count < 4) {
            int randomId = 1 + random.nextInt(maxId);
            if (!arr[randomId]) {
                arr[randomId] = true;
                count += 1;
            }
        }
        for (int i = 1; i <= maxId; i++) {
            if (arr[i]) {
                Word word = wordRepository.findById((long) i).orElseThrow(NoWordException::new);
                QuizRes quizRes = QuizMapper.INSTANCE.wordToQuizRes(word);
                quizResList.add(quizRes);
            }
        }
        int answerIndex = random.nextInt(4);
        String answerString = quizResList.get(answerIndex).getWord();

        QuizQuestionRes quizQuestionRes = QuizMapper.INSTANCE.toQuizQuestionRes(answerIndex,
                answerString, quizResList);
        log.info("QuizServiceImpl_getQuestion_end: " + quizQuestionRes);
        return quizQuestionRes;
    }

    /**
     * 퀴즈 결과 저장. 맞은 경우에만 호출된다 가정.
     *
     * @param accessToken id 추출 위해
     * @param result      문자열.
     */
    @Override
    @Transactional
    public void saveQuizResult(String accessToken, String result) {
        log.info("QuizServiceImpl_saveQuizResult_start");
        Long userId = jwtProviderUtil.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId).orElseThrow(MySQLSearchException::new);
        user.updateQuizResult();
        log.info("QuizServiceImpl_saveQuizResult_end: saved");
    }
}
