import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});
  @override
  Widget build(BuildContext context) {
    // material , cupertino app 둘 중 하나를 return해야함 구글과 애플의 디자인시스템임
    // 우리 앱이 어떻게 보여지고 싶은지를 정하는 것임
    // app의 루트라서 선택을 해주기 해야한다
    // flutter는 구글이 만들어서 materialApp이 더 보기 좋다

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Hellpo flutter!'),
        ),
        body: const Center(
          child: Text('Hello world!'),
        ),
      ),
    );
  }
}
