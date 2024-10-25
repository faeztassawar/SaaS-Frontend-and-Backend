"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We use Stripe for online transactions and we will use it for the payments.",
  },
  {
    question: "Can I buy multiple templates?",
    answer:
      "Yes. Some restaurants can have a variety of menu items, so if they want, they can get both types of templates.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We use Google Auth for all of our logins and sign-ups, so the data is completely secure.",
  },
  {
    question: "Can I customize my website?",
    answer:
      "Yes. With the dashboard provided within the website, you can customize your data according to your liking.",
  },
];

const ItemList = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="cursor-pointer py-7 border-b w-full border-white/30"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold flex-1">{question}</h2>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="text-white/70"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b flex flex-col items-center from-[#5d2ca8]/50 to-black py-[72px]">
      <div className="px-10 w-full flex items-center flex-col">
        <h1 className="text-5xl sm:text-6xl max-w-[648px] py-4 font-bold text-center tracking-tighter">
          Frequently Asked Questions
        </h1>
        <div className="mt-12 max-w-[648px] w-full mx-auto">
          {items.map(({ question, answer }, index) => (
            <ItemList key={index} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
