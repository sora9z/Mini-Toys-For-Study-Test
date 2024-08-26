import 'package:client/model/mode.quiz.dart';
import 'package:client/screen/screen_home.dart';
import 'package:flutter/material.dart';

class ResultScreen extends StatelessWidget {
  List<int> answers;
  List<Quiz> quizs;
  ResultScreen({super.key, required this.answers, required this.quizs});

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    double width = screenSize.width;
    double height = screenSize.height;

    int score = 0;
    for (int i = 0; i < quizs.length; i++) {
      score += 1;
    }

// PopScope 는 뒤로가기 적용이 되지 않도록 하기 위해 추가
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
            backgroundColor: Colors.deepPurple,
            leading: Container(),
          ),
          body: Center(
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.deepPurple),
                color: Colors.deepPurple,
              ),
              width: width * 0.85,
              height: height * 0.5,
              child: Column(
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(bottom: width * 0.048),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: Colors.deepPurple,
                      ),
                      color: Colors.white,
                    ),
                    width: width * 0.73,
                    height: height * 0.25,
                    child: Column(
                      children: <Widget>[
                        Container(
                          padding: EdgeInsets.fromLTRB(
                            0,
                            width * 0.048,
                            0,
                            width * 0.012,
                          ),
                          child: Text(
                            'Good Job',
                            style: TextStyle(
                              fontSize: width * 0.055,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        Text(
                          'Your score is',
                          style: TextStyle(
                            fontSize: width * 0.048,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Expanded(
                          // 위젝이 아래로 배치되도록 함
                          child: Container(),
                        ),
                        Text(
                          '$score/${quizs.length}',
                          style: TextStyle(
                            fontSize: width * 0.21,
                            fontWeight: FontWeight.bold,
                            color: Colors.red,
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(
                            width * 0.012,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Container(),
                  ),
                  Container(
                      padding: EdgeInsets.only(bottom: width * 0.048),
                      child: ButtonTheme(
                          minWidth: width * 0.73,
                          height: height * 0.05,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: ElevatedButton(
                            child: const Text(
                              'Go to Home',
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold),
                            ),
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) {
                                    return const HomeScreen();
                                  },
                                ),
                              );
                            },
                          )))
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
