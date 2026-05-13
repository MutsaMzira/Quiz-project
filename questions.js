/* 
  BrainBlast Quiz - Questions
  Mixed general knowledge questions
  Added different formats to make the quiz less boring
*/

/* jshint esversion: 6 */

const QUESTIONS = [

  // =========================
  // Multiple Choice
  // =========================

  {
    type: "mc",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    explanation: "Mars looks red because of iron oxide found on its surface."
  },

  {
    type: "mc",
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
    answer: "Canberra",
    explanation: "Many people think it's Sydney, but Canberra is actually the capital."
  },

  {
    type: "mc",
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    answer: "6",
    explanation: "A hexagon is a shape with six sides."
  },

  {
    type: "mc",
    question: "Which ocean is the largest in the world?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
    explanation: "The Pacific Ocean is the biggest ocean on Earth."
  },

  {
    type: "mc",
    question: "Who painted the Mona Lisa?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Caravaggio"],
    answer: "Leonardo da Vinci",
    explanation: "Leonardo da Vinci painted the famous Mona Lisa."
  },

  {
    type: "mc",
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    answer: "Au",
    explanation: "Au comes from the Latin word Aurum, meaning gold."
  },

  {
    type: "mc",
    question: "In which year did the First World War begin?",
    options: ["1912", "1914", "1916", "1918"],
    answer: "1914",
    explanation: "World War One officially started in 1914."
  },

  {
    type: "mc",
    question: "What is the smallest country in the world?",
    options: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"],
    answer: "Vatican City",
    explanation: "Vatican City is the smallest independent country by size."
  },

  {
    type: "mc",
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    answer: "206",
    explanation: "Most adults have 206 bones in their bodies."
  },

  {
    type: "mc",
    question: "Which element has atomic number 1?",
    options: ["Helium", "Oxygen", "Carbon", "Hydrogen"],
    answer: "Hydrogen",
    explanation: "Hydrogen is the first element on the periodic table."
  },

  // =========================
  // True or False
  // =========================

  {
    type: "tf",
    question: "True or False: The Great Wall of China can be seen from space with the naked eye.",
    options: ["True", "False"],
    answer: "False",
    explanation: "This is actually a myth. The wall is too narrow to see from space."
  },

  {
    type: "tf",
    question: "True or False: Sound travels faster in water than in air.",
    options: ["True", "False"],
    answer: "True",
    explanation: "Sound moves much faster in water compared to air."
  },

  {
    type: "tf",
    question: "True or False: The Earth is perfectly round.",
    options: ["True", "False"],
    answer: "False",
    explanation: "Earth is slightly flattened at the poles."
  },

  {
    type: "tf",
    question: "True or False: Sharks are mammals.",
    options: ["True", "False"],
    answer: "False",
    explanation: "Sharks are fish, not mammals."
  },

  {
    type: "tf",
    question: "True or False: The Amazon River is the longest river in the world.",
    options: ["True", "False"],
    answer: "False",
    explanation: "The Nile is usually considered the longest river."
  },

  // =========================
  // Fill In The Blank
  // =========================

  {
    type: "fitb",
    question: "Fill in the blank: The currency used in Japan is the ___.",
    answer: "yen",
    explanation: "Japan uses the Yen as its official currency."
  },

  {
    type: "fitb",
    question: "Fill in the blank: Water's formula is H_O. What number fits in the blank?",
    answer: "2",
    explanation: "Water is written as H2O."
  },

  {
    type: "fitb",
    question: "Fill in the blank: The tallest mountain in the world is Mount ___.",
    answer: "everest",
    explanation: "Mount Everest is the highest mountain above sea level."
  },

  {
    type: "fitb",
    question: "Fill in the blank: Shakespeare wrote Romeo and ___.",
    answer: "juliet",
    explanation: "Romeo and Juliet is one of Shakespeare's best known plays."
  },

  {
    type: "fitb",
    question: "Fill in the blank: Plants make food through a process called ___.",
    answer: "photosynthesis",
    explanation: "Photosynthesis helps plants turn sunlight into energy."
  }

];
