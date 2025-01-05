# Quiz App

This is a quiz application that tests users' knowledge on the basics of programming, fundamentals of computer science, and software engineering.  
It is a timed test that takes ten (10) minutes.  
If the user does not complete the questions or user finishes answering the questions and submits, the user's test score will be returned with answers to the quiz

I built this app to try out building a `GraphQL API` with Next.js API. The GraphQL API was built using `apollo-server-micro` and consumed from the frontend using `SWR` and `graphql-request`

## Setting up the development environment

- First, could you fork this repo?
- Then clone your forked version.
- Create a mongodb database called `quiz` and add all the questions (check the `db/schemas/` folder for guidance)
  ````
  {
    "question": "Test question",
    "options": ["Option 1", "Option 1", "Correct Answer", "Option 3"],
    "answer": "Correct Answer"
  }
  ````
- Add your mongoDB URL to the .env.local file (check the .env.example for guidance)
- Run the following command on the CLI in the root directory of the project:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

### Updatting quiz question

All quiz questions are fetched from a mongoDB database and can be accessed via graphql [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). This endpoint can be edited in `pages/api/graphql.ts`.

## Live Demo

[Quiz App](https://programming-quiz-gules.vercel.app/)
