import { Text, VStack, RadioGroup, Radio, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface QuizItemProps {
  quiz: {
    id: number;
    ques: string;
    img: string;
    ans: string;
    postId: number;
  };
  onAnswerSelect: (quizId: number, selectedAnswer: string) => void;
}

const QuizItem = ({ quiz, onAnswerSelect }: QuizItemProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    // 문제의 정답들을 랜덤하게 섞음
    const answersArray = JSON.parse(quiz.ans);
    const shuffledArray = answersArray.sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffledArray);
  }, [quiz.ans]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswerSelect(quiz.id, answer); // 선택한 답안 정보를 부모 컴포넌트로 전달
  };

  return (
    <VStack spacing={4} align="center" marginTop={8}>
      {/* <Image src={quiz.img} alt="Quiz Image" boxSize="200px" /> */}
      <Text fontSize="xl" fontWeight={"bold"}>{quiz.ques}</Text>
      <RadioGroup onChange={handleAnswerSelect} value={selectedAnswer}>
        <Flex justifyContent={"space-between"} align={"center"}>
          {shuffledAnswers.map((answer: string, index: number) => (
            <Radio key={index} value={answer}>
              {answer}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
      {/* <Button onClick={() => console.log("Selected Answer:", selectedAnswer)}>Submit</Button> */}
    </VStack>
  );
};

export default QuizItem;
