// import { GetStaticPaths, GetStaticPathsContext, GetStaticProps } from "next";
// import { BackendURL } from "../../../config";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { Center } from "@chakra-ui/react";

import Quiz from "../../components/Quiz"

// interface Quiz {
//   id: number;
//   ques: string;
//   img: string;
//   ans: string[];
//   postId: number;
// }

// interface Post {
//   id: number;
//   title: string;
//   des: string;
//   emb: string;
//   createdAt: string;
//   quiz: Quiz[];
// }

// // export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
// //   const fetchData = async () => {
// //     const res = await fetch(`${BackendURL}/dashboard`);
// //     const result = await res.json();
// //     return result;
// //   };
  
// //   let data: Post[] = [];
// //   await fetchData().then(res => data = res)

// //   const ids = data.flatMap((value) => {
// //     return value.id;
// //   })

// //   return {
// //     paths: ids.map(id => ({ params: { id: String(id) } })),
// //     fallback: true
// //   }
// // }


// // export const getStaticProps: GetStaticProps = async ({ params }) => {
// //   try {
// //       const fetchData = async () => {
// //       const res = await fetch(`${BackendURL}/dashboard`);
// //       const result = await res.json();
// //       return result;
// //     };
    
// //     let data: Post[] = [];
// //     await fetchData().then(res => data = res)

// //     const idIndex = Number(await params!.page as string);

// //     if(idIndex <= 0) {
// //       return { notFound: true };
// //     }

// //     return({
// //       props: {
// //         data
// //       },
// //       revalidate: 1
// //     })
// //   } catch (err) {
// //     console.error(err)
// //     return {notFound: true}
// //   }
// // }

// const Index = ({ postList }: { postList: Post[] }) => {
//   const router = useRouter();
//   const { id } = router.query;
  
//   const [data, setData] = useState<Post[] | null>(null);
//   const [items, setItems] = useState<Post | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(`${BackendURL}/dashboard`);
//       const result = await res.json();
//       setData(result);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data && id && !isNaN(Number(id))) {
//       const index = Number(id) - 1;
//       if (index >= 0 && index < data.length) {
//         setItems(data[index]);
//       }
//     }
//   }, [data, id]);

//   return (
//     <Center>
//       {items?.title}
//     </Center>
//   );
// };

// export default Index;

const Index = () => {
  return(
    <>
    <Quiz/>
    </>
  )
}

export default Index