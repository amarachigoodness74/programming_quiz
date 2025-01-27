import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { request, RequestDocument, Variables } from "graphql-request";
import { TQuiz, TSavedAnswer } from "../types/quiz";
import styles from "../styles/Quiz.module.css";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default function Result() {
  const router = useRouter();
  const getAnswers: string =
    (typeof window !== "undefined" && localStorage.getItem("quiz")) ||
    JSON.stringify({});

  const answers: TSavedAnswer = JSON.parse(getAnswers);

  const fetcher = (
    query: RequestDocument | TypedDocumentNode<any, Variables>
  ) => request("/api/graphql", query);

  const { data, error } = useSWR(
    `{
      quiz {
        _id
        question
        options
        answer
      }
    }`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (Object.keys(answers).length === 0 && answers.constructor === Object) {
    router.push("/");
  }

  let correctAnswers = 0;
  if (data?.quiz) {
    data.quiz.map((quiz: TQuiz) => {
      if (quiz.answer === answers[quiz._id]) {
        correctAnswers = correctAnswers + 1;
      }
    });
  }

  console.log("correctAnswers", correctAnswers);
  console.log("Mark", data.quiz.length);

  return (
    <>
      <div className={styles.centered}>
        <Link href="/">
          <a className={styles.startBtn}>Retake</a>
        </Link>
      </div>
      <h2>
        You answered {correctAnswers} questions correctly. You{" "}
        {correctAnswers > Number((data.quiz.length / 100) * 70)
          ? "Passed 😃"
          : "Failed 🥺"}{" "}
      </h2>
      <br />

      {data?.quiz &&
        data.quiz.map((quiz: TQuiz) => (
          <>
            <div key={quiz._id}>
              <p>{quiz.question}</p>
            </div>
            <ul className={styles.ul}>
              {quiz.options.map((option: string, i: number) => (
                <li className={styles.option} key={i}>
                  {option === quiz.answer ? (
                    quiz.answer === answers[quiz._id] ? (
                      <span>{option} &nbsp; ✅</span>
                    ) : (
                      <span>{option}</span>
                    )
                  ) : answers[quiz._id] === option ? (
                    <>
                      <s>{option}</s> &nbsp;❌
                    </>
                  ) : (
                    <s>{option}</s>
                  )}
                </li>
              ))}
            </ul>
          </>
        ))}
    </>
  );
}
