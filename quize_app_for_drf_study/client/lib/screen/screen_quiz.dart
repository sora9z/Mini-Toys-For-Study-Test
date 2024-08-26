import 'package:auto_size_text/auto_size_text.dart';
import 'package:client/model/mode.quiz.dart';
import 'package:client/screen/screen_result.dart';
import 'package:client/widget/widget_candidate.dart';
import 'package:flutter/material.dart';
import 'package:flutter_swiper_plus/flutter_swiper_plus.dart';

class QuizScreen extends StatefulWidget {
  final List<Quiz> quizs;
  const QuizScreen({super.key, required this.quizs});
  @override
  _QuizScreenState createState() => _QuizScreenState();
}

// 상태 관리
class _QuizScreenState extends State<QuizScreen> {
  final List<int> _answers = [-1, -1, -1];
  List<bool> _answerState = [false, false, false, false]; // 각 선택지 선택 유무
  int _currentIndex = 0; // 현재 문제 번호
  final SwiperController _controller = SwiperController();

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    double width = screenSize.width;
    double height = screenSize.height;

    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.deepPurple,
        body: Center(
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.deepPurple),
            ),
            width: width * 0.85,
            height: height * 0.5,
            child: Swiper(
              controller: _controller,
              physics:
                  const NeverScrollableScrollPhysics(), // Swipe 모션을 통해 넘어가지 않는다. quiz를 스킵할 수 없도록 작성
              loop: false,
              itemCount: widget.quizs.length,
              itemBuilder: (BuildContext context, int index) {
                return _buildQuizCard(
                  widget.quizs[index],
                  width,
                  height,
                );
              },
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildQuizCard(Quiz quiz, double width, double height) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: Colors.white),
          color: Colors.amber),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
            padding: EdgeInsets.fromLTRB(
              0,
              width * 0.024,
              0,
              width * 0.024,
            ),
            child: Text(
              'Q${_currentIndex + 1}.',
              style: TextStyle(
                fontSize: width * 0.06,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Container(
            width: 0.8 * width,
            padding: EdgeInsets.only(
              top: width * 0.012,
            ),
            child: AutoSizeText(
              quiz.title,
              textAlign: TextAlign.center,
              maxLines: 2,
              style: TextStyle(
                fontSize: width * 0.048,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Expanded(
            // 이후 배치될 children들이 아래에서부터 배치되도록 하는 교화가 있다
            child: Container(),
          ),
          Column(
            children: _buildCandidates(
              width,
              quiz,
            ),
          ),
          Container(
            padding: EdgeInsets.all(width * 0.024),
            child: Center(
              child: ButtonTheme(
                minWidth: width * 0.5,
                height: height * 0.05,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                    textStyle: const TextStyle(
                      color: Colors.white,
                    ),
                  ),
                  onPressed: _answers[_currentIndex] == -1
                      ? null
                      : () {
                          if (_currentIndex == widget.quizs.length - 1) {
                            // 결과 화면으로 이동
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => ResultScreen(
                                    answers: _answers,
                                    quizs: widget.quizs,
                                  ),
                                ));
                          } else {
                            // 다음 문제로 이동
                            _answerState = [false, false, false, false];
                            _currentIndex += 1;
                            // 다음문제로 이동하려면 Swiper의 controller를 이용하여 이동
                            _controller.next();
                          }
                        },
                  child: _currentIndex == widget.quizs.length - 1
                      ? const Text(
                          'Show Result',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        )
                      : const Text(
                          'Next Quiz',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildCandidates(double width, Quiz quiz) {
    List<Widget> children = [];
    for (int i = 0; i < 4; i++) {
      children.add(
        CandidateWidget(
          index: i,
          text: quiz.candidates[i],
          width: width,
          answerState: _answerState[i],
          tap: () {
            setState(
              () {
                for (int j = 0; j < 4; j++) {
                  if (j == i) {
                    _answerState[j] = true;
                    _answers[_currentIndex] = j;
                  } else {
                    _answerState[j] = false;
                  }
                }
              },
            );
          },
        ),
      );
      children.add(Padding(
        padding: EdgeInsets.all(width * 0.024),
      ));
    }
    return children;
  }
}
