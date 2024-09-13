import 'dart:convert';
import 'model_quiz.dart';

List<Quiz> parseQuizs(String responseBody) {
  final parsed = json.decode(responseBody).cast<Map<String, dynamic>>();
  // parsed된 데이터를 모두 quiz model로 변환하여 List로 반환
  return parsed.map<Quiz>((json) => Quiz.formJson(json)).toList();
}
