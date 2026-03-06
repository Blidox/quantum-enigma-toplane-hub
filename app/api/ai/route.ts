import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      enemyChampion,
      counterChampion,
      matchupReason,
      winCondition,
      matchupTips,
      runes,
      items,
      question
    } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        answer:
          'OPENAI_API_KEY is missing. Add it to .env.local and restart npm run dev.'
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `
You are a League of Legends coach specialized in top lane.
Be practical, concise, and matchup-specific.

Context:
- Enemy top: ${enemyChampion}
- Recommended counter: ${counterChampion}
- Why the counter works: ${matchupReason}
- Win condition: ${winCondition}

Runes:
${JSON.stringify(runes, null, 2)}

Items:
${JSON.stringify(items, null, 2)}

Known matchup tips:
${Array.isArray(matchupTips) ? matchupTips.map((t: string) => `- ${t}`).join('\n') : ''}

Player question:
${question}

Structure your answer like this:
1. Lane plan
2. Win condition
3. Trading and cooldown focus
4. Wave management
5. Rune or item focus if relevant

Stay focused on top lane only.
`;

    const response = await client.responses.create({
      model: 'gpt-5.2',
      input: prompt
    });

    return NextResponse.json({
      answer: response.output_text || 'No answer received from the model.'
    });
  } catch (error: any) {
    console.error('AI ROUTE ERROR:', error);

    const status = error?.status;
    const message = error?.message || '';

    if (status === 429) {
      return NextResponse.json({
        answer:
          'The AI is temporarily unavailable because your OpenAI API quota or billing limit was reached.'
      });
    }

    return NextResponse.json(
      {
        answer:
          message || 'Something went wrong in the AI route. Check your terminal for the real error.'
      },
      { status: 500 }
    );
  }
}