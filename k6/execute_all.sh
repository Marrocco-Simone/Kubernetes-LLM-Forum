#!/bin/sh 
k6 run add_question.js;
k6 run add_answer.js;
k6 run add_vote.js;
k6 run open_course_page.js;
k6 run open_question_page.js;