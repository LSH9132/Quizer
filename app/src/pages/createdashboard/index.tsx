import { useState } from 'react';
import { Box, Button, Center, Flex, FormControl, FormLabel, Input, SimpleGrid, Textarea } from '@chakra-ui/react';
import { BackendURL } from '../../../config';

interface Quiz {
  ques: string;
  img: string;
  ans: string[];
}

interface FormData {
  title: string;
  des: string;
  emb: string;
  quiz: Quiz[];
}

const PostForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    des: '',
    emb: '',
    quiz: [{ ques: '', img: '', ans: [''] }]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement>, quizIndex: number) => {
    const { name, value } = e.target;
    const updatedQuiz = [...formData.quiz];
    updatedQuiz[quizIndex] = {
      ...updatedQuiz[quizIndex],
      [name as keyof Quiz]: value
    };
    setFormData(prevState => ({
      ...prevState,
      quiz: updatedQuiz
    }));
  };
  

  const handleAnsChange = (e: React.ChangeEvent<HTMLInputElement>, quizIndex: number, ansIndex: number) => {
    const { value } = e.target;
    const updatedQuiz = [...formData.quiz];
    updatedQuiz[quizIndex].ans[ansIndex] = value;
    setFormData(prevState => ({
      ...prevState,
      quiz: updatedQuiz
    }));
  };

  const handleAddQuiz = () => {
    setFormData(prevState => ({
      ...prevState,
      quiz: [...prevState.quiz, { ques: '', img: '', ans: [''] }]
    }));
  };

  const handleAddAnswer = (quizIndex: number) => {
    const updatedQuiz = [...formData.quiz];
    updatedQuiz[quizIndex].ans.push('');
    setFormData(prevState => ({
      ...prevState,
      quiz: updatedQuiz
    }));
  };

  const handleRemoveQuiz = (quizIndex: number) => {
    const updatedQuiz = [...formData.quiz];
    updatedQuiz.splice(quizIndex, 1);
    setFormData(prevState => ({
      ...prevState,
      quiz: updatedQuiz
    }));
  };

  const handleRemoveAnswer = (quizIndex: number, ansIndex: number) => {
    const updatedQuiz = [...formData.quiz];
    updatedQuiz[quizIndex].ans.splice(ansIndex, 1);
    setFormData(prevState => ({
      ...prevState,
      quiz: updatedQuiz
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isPostImage = false) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (isPostImage) {
          setFormData(prevState => ({
            ...prevState,
            emb: base64String || ''
          }));
        } else {
          // Handle the case where the image is related to a quiz
          // You may want to add additional logic here
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a PNG image.');
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BackendURL}/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        throw new Error(`Failed to submit: ${res.status}`);
      }
      // 폼 데이터 초기화 또는 다른 작업 수행
      setFormData({
        title: '',
        des: '',
        emb: '',
        quiz: [{ ques: '', img: '', ans: [''] }]
      });
      alert('Post submitted successfully!');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post. Please try again later.');
    }
  };

  return (
    <Center w={'100%'}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Box>
            <FormControl id="title" mb={4}>
              <FormLabel>타이틀</FormLabel>
              <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </FormControl>
            <FormControl id="des" mb={4}>
              <FormLabel>설명</FormLabel>
              <Textarea name="des" value={formData.des} onChange={handleChange} required />
            </FormControl>
            <FormControl id="emb" mb={4}>
              <FormLabel>배경 사진(PNG 만 지원합니다.)</FormLabel>
              <Input type="file" accept="image/png" onChange={(e) => handleFileChange(e, true)} />
            </FormControl>
          </Box>
          <Flex>
            <SimpleGrid>
              {formData.quiz.map((quiz, quizIndex) => (
                <Box key={quizIndex} mb={4} mx={2}>
                  <FormControl id={`ques-${quizIndex}`} mb={2}>
                    <FormLabel>퀴즈 {quizIndex + 1}</FormLabel>
                    <Input type="text" name="ques" value={quiz.ques} onChange={(e) => handleQuizChange(e, quizIndex)} required />
                  </FormControl>
                  <FormLabel>정답 설정 관련은 보기 1번이 정답이 됩니다.</FormLabel>
                  {quiz.ans.map((answer, ansIndex) => (
                    <FormControl key={ansIndex} id={`ans-${quizIndex}-${ansIndex}`} mb={2}>
                      <FormLabel>보기 {ansIndex + 1}</FormLabel>
                      <Flex>
                        <Input type="text" value={answer} onChange={(e) => handleAnsChange(e, quizIndex, ansIndex)} required />
                        <Button ml={2} onClick={() => handleRemoveAnswer(quizIndex, ansIndex)} colorScheme="red" size="sm">보기 삭제</Button>
                      </Flex>
                    </FormControl>
                  ))}
                  <Button onClick={() => handleAddAnswer(quizIndex)} mr={2}>보기 추가</Button>
                  <Button onClick={() => handleRemoveQuiz(quizIndex)} colorScheme="red" size="sm">퀴즈 삭제</Button>
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        </Box>
        <Center>
          <Button onClick={handleAddQuiz} mr={2}>퀴즈 추가</Button>
          <Button type="submit" colorScheme="blue">저장하기</Button>
        </Center>
      </form>
    </Center>
  );
};

export default PostForm;
