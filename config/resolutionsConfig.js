module.exports = {
  read_books: {
    tags: ["#readmore", "#goals"],
    title: "Read Books",
    link: "/read_books",
    amount_text: "books",
    image: "/images/read-books.png",
    questions: [
      {
        label: "How many books do you want to read?",
        type: "number",
        name: "goal_amount",
        placeholder: "30",
      },
      {
        label: "How many books did you alredy read?",
        type: "number",
        name: "done_amount",
        placeholder: "1",
      },
      {
        label: "Any info you want to save?",
        type: "text",
        name: "notes",
        placeholder: "I want to read more books this year.",
      },
    ],
  },
  loose_weight: {
    tags: ["#loose_weight", "#goals"],
    title: "Loose Weight",
    link: "/loose_weight",
    image: "/images/loose-weight.png",
    amount_text: "lbs",
    questions: [
      {
        label: "How many lbs you want to loose?",
        type: "number",
        name: "goal_amount",
        placeholder: "30",
      },
      {
        label: "How many lbs did you alredy loose?",
        type: "number",
        name: "done_amount",
        placeholder: "1",
      },
      {
        label: "Any info you want to save?",
        type: "text",
        name: "notes",
        placeholder: "I want to read more books this year.",
      },
    ],
  },
};
