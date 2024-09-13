class Quiz {
  String title;
  List<String> candidates;
  int answer;

  Quiz({required this.title, required this.candidates, required this.answer});

// Map<String, dynamic> 타입의 데이터를 이용하여 Quiz 인스턴스를 생성
// fromMap 생성자는 외부에서 제공된 Map 데이터를 기반으로 Quiz 인스턴스를 생성한다.
  Quiz.fromMap(Map<String, dynamic> map)
      : title = map['title'],
        candidates = map['candidates'],
        answer = map['answer'];

  Quiz.formJson(Map<String, dynamic> json)
      : title = json['title'],
        candidates = json['body'].toString().split('/'),
        answer = json['answer'];
}
