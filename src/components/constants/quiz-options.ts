export const AI_PROMPT = `
Given the following content about {subject}:

{content}

Generate 5 multiple-choice questions based on the key concepts from this content. 
Each question should have 4 options with one correct answer.
Format the output as a JSON array of question objects.
`;