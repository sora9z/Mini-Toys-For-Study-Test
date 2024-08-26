import 'package:client/model/mode.quiz.dart';
import 'package:client/screen/screen_quiz.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Quiz> quizs = [
    Quiz.fromMap({
      'title': 'test1',
      'candidates': ['a', 'b', 'c', 'd'],
      'answer': 0
    }),
    Quiz.fromMap({
      'title': 'test2',
      'candidates': ['a', 'b', 'c', 'd'],
      'answer': 0
    }),
    Quiz.fromMap({
      'title': 'test3',
      'candidates': ['a', 'b', 'c', 'd'],
      'answer': 0
    }),
  ];

  @override
  Widget build(BuildContext context) {
    // MediaQuery를 사용하여 해당 기기의 여러 상태 정보를 알 수 있다.
    Size screenSize = MediaQuery.of(context).size;
    double width = screenSize.width;
    double height = screenSize.height;

    // SafeArea: 상단, 하단 안전한 영역 확보
    return PopScope(
      canPop: false, // false인 경우 기본 뒤로가기 버튼이 작동하지 않음
      onPopInvokedWithResult: (didPop, result) {
        if (didPop) {
          //뒤로가기 제스쳐가 감지되면 호출
          return;
        }
      },
      child: SafeArea(
        child: Scaffold(
          appBar: AppBar(
            title: const Text('My Quiz App'),
            backgroundColor: Colors.blue,
            // leading: Container()), // leading: 앱바 왼쪽에 위치하는 위젯으로 Container()를 해주면 페이지 이동시에 자동으로 생겨나는 뒤로가기 버튼을 지우는 효과가 있다.
          ),
          body: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Center(
                child: Image.asset('images/quiz.jpeg', width: width * 0.8),
              ),
              Padding(padding: EdgeInsets.all(width * 0.05)),
              Text(
                'Simple Quiz App',
                style: TextStyle(
                  fontSize: width * 0.065,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Text(
                "Before quiz start\npleas read notes.",
                textAlign: TextAlign.center,
              ),
              Padding(
                padding: EdgeInsets.all(width * 0.05),
              ),
              _buildStep(width, 'Step 1 : Solve the three random quiz'),
              _buildStep(
                  width, 'Step 2 : Push the "Next" button after read the quiz'),
              Padding(padding: EdgeInsets.all(width * 0.025)),
              // RaisedButton : 버튼 위젯
              Container(
                padding: EdgeInsets.only(bottom: width * 0.025),
                child: Center(
                  child: ButtonTheme(
                    minWidth: width * 0.8,
                    height: height * 0.05,
                    child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.deepPurple,
                        ),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => QuizScreen(
                                quizs: quizs,
                              ),
                            ),
                          );
                        },
                        child: const Text(
                          'START QUIZ',
                          style: TextStyle(color: Colors.white),
                        )),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStep(double width, String title) {
    return Container(
        padding: EdgeInsets.fromLTRB(
            width * 0.05, width * 0.025, width * 0.05, width * 0.025),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Icon(
              Icons.check_box_outline_blank,
              size: width * 0.05,
            ),
            Padding(
              padding: EdgeInsets.only(right: width * 0.025),
            ),
            Text(title)
          ],
        ));
  }
}
