import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner, Box, Center, Text, Image, Button } from "@chakra-ui/react";
import QuizItem from "./QuizItem";
import { BackendURL } from "../../../config";

interface Quiz {
  id: number;
  ques: string;
  img: string;
  ans: string;
  postId: number;
}

interface Post {
  id: number;
  title: string;
  des: string;
  emb: string;
  createdAt: string;
  quiz: Quiz[];
}

const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState<Post[] | null>(null);
  const [item, setItem] = useState<Post | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${BackendURL}/dashboard`);
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data && id && !isNaN(Number(id))) {
      const index = Number(id) - 1;
      if (index >= 0 && index < data.length) {
        setItem(data[index]);
      }
    }
  }, [data, id]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleAnswerSelect = (quizId: number, selectedAnswer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [quizId]: selectedAnswer });
  };

  function calculateAccuracy(totalQuestions: number, incorrectQuestions: number): number {
    const correctQuestions = totalQuestions - incorrectQuestions;
    const accuracyPercentage = Math.round((correctQuestions / totalQuestions) * 100); // 반올림하여 정수형으로 변환
    if(isNaN(accuracyPercentage)) {
      return 100;
    }
    return accuracyPercentage;
  }


  const showABC = () => {
    setShowA(true)
    const wrongAnswers: number[] = [];

    item?.quiz.forEach(val => {
      if (selectedAnswers[val.id] !== JSON.parse(val.ans)[0]) {
        wrongAnswers.push(val.id);
      }
    });

    if (wrongAnswers.length > 0) {
      console.log("틀린 문제:", wrongAnswers);
      // 여기서 틀린 문제를 처리하거나 표시할 수 있습니다.

      let wrongData: {
        qus: string,
        ans: string
      }[] = [];
      wrongAnswers?.forEach(val => {
        item?.quiz.forEach(_val => {
          if(val == _val.id) {
            wrongData.push({
              qus: _val.ques,
              ans: JSON.parse(_val.ans)[0]
            })
          }
        })
      })

      const worngItems = wrongData.map((val) => {
        return (
          <Center>
            <Text>{val.qus}에 대한 답은 {val.ans}입니다.</Text>
          </Center>
        )
      })
      setWrong(worngItems);

      // const doneData = calculateAccuracy(item?.quiz.length!, wrong?.length!);
    
      // if(doneData) {
      //   setDone(`${doneData}%`);
      // } else {
      //   setDone("100%")
      // }

    } else {
      console.log("정답입니다!");
    }
  };

  const [wrong, setWrong] = useState<ReactElement[] | null>(null);

  const [showA, setShowA] = useState(false);

  const [done, setDone] = useState('');

  return (
    <Box>
      <Center display={"block"}>
        {item ? (
          <>
            <Center>
              <Text fontSize={"4xl"} fontWeight={"bold"}>{item.title}</Text>
            </Center>
            <Center>
              <Text fontSize={"md"}>{item.des}</Text>
            </Center>
            <Center>
              <Image src={`data:image/png;base64,${item.emb}`} alt="Quiz Image" />
            </Center>
            {item.quiz.map((val) => {
              return (
                <Box key={val.id} style={showA ? {pointerEvents: "none"} : {}}>
                  <QuizItem quiz={val} onAnswerSelect={handleAnswerSelect} />
                  {selectedAnswers[val.id] && (
                    <Center>
                      <Text>고른 정답: {selectedAnswers[val.id]}</Text>
                    </Center>
                  )}
                </Box>
              );
            })}
          </>
        ) : (
          <Spinner />
        )}
        <Box marginTop={8}>
          {showA ? 
          <>
            <Center>
              <Text>틀린 문제</Text>
            </Center>
            {wrong ?? <Center>"없습니다. 완벽하네요!!"</Center>}
            <Center>정확도 : {calculateAccuracy(item?.quiz.length!, wrong?.length!)}%</Center>
            <Center>
              <Button onClick={handleRefresh}>다시하기</Button>
            </Center>
          </> : <>
          <Center>
          <Button onClick={showABC}>정답 확인</Button>
          </Center>
          </>}
        </Box>
      </Center>
    </Box>
  );
};

export default Index;
