"use client";

import { FormEvent, useMemo, useState } from "react";

type Question = {
  id: number;
  name: string;
  text: string;
  votes: number;
  answer: string;
  status: "Pending" | "Answered";
};

const initialQuestions: Question[] = [
  {
    id: 1,
    name: "Ravi",
    text: "What is Artificial Intelligence?",
    votes: 5,
    answer:
      "Artificial Intelligence is technology that enables computers to perform tasks that normally require human intelligence.",
    status: "Answered"
  },
  {
    id: 2,
    name: "Priya",
    text: "How does cloud computing work?",
    votes: 3,
    answer: "",
    status: "Pending"
  }
];

export default function Home() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [filter, setFilter] = useState<"All" | "Pending" | "Answered">("All");

  const visibleQuestions = useMemo(() => {
    if (filter === "All") return questions;
    return questions.filter((item) => item.status === filter);
  }, [questions, filter]);

  function submitQuestion(event: FormEvent) {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanQuestion = question.trim();

    if (!cleanName || !cleanQuestion) {
      alert("Please enter your name and question.");
      return;
    }

    const newQuestion: Question = {
      id: Date.now(),
      name: cleanName,
      text: cleanQuestion,
      votes: 0,
      answer: "",
      status: "Pending"
    };

    setQuestions((current) => [newQuestion, ...current]);
    setQuestion("");
  }

  function vote(id: number) {
    setQuestions((current) =>
      current.map((item) =>
        item.id === id ? { ...item, votes: item.votes + 1 } : item
      )
    );
  }

  return (
    <main className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Internship Project
            </p>
            <h1 className="text-2xl font-bold">Live Q&A Tracker</h1>
          </div>
          <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            ● Live
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 rounded-2xl bg-indigo-700 p-8 text-white shadow-sm">
          <h2 className="text-3xl font-bold">Ask a Question</h2>
          <p className="mt-2 max-w-2xl text-indigo-100">
            Submit your question and track answers in one simple place.
          </p>

          <form onSubmit={submitQuestion} className="mt-7 grid gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-xl border-0 px-4 py-3 text-gray-900 outline-none ring-indigo-300 focus:ring-2"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-xl border-0 px-4 py-3 text-gray-900 outline-none ring-indigo-300 focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-xl bg-white px-6 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50"
              >
                Submit Question
              </button>
            </div>
          </form>
        </div>

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">Live Questions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Questions are listed for discussion and answering.
            </p>
          </div>

          <div className="flex gap-2">
            {(["All", "Pending", "Answered"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                  filter === item
                    ? "bg-indigo-700 text-white"
                    : "bg-white text-gray-600 ring-1 ring-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {visibleQuestions.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-600">
                    {item.name}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{item.text}</h3>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                    item.status === "Answered"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4 border-t pt-4">
                <button
                  onClick={() => vote(item.id)}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold hover:bg-gray-200"
                >
                  👍 {item.votes} Votes
                </button>
              </div>

              {item.answer && (
                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-bold text-gray-700">Answer</p>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {item.answer}
                  </p>
                </div>
              )}
            </article>
          ))}

          {visibleQuestions.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-500">
              No questions in this category.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}