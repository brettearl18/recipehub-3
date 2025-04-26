import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Mock response for local dev if no API key is set
    return NextResponse.json({
      recipe: {
        name: 'AI Vegan Protein Bowl',
        category: 'Lunch',
        calories: 480,
        ingredients: [
          '1 cup cooked quinoa',
          '1/2 cup chickpeas',
          '1/2 avocado',
          '1 cup spinach',
          '2 tbsp tahini',
          'Lemon juice',
        ],
        instructions: [
          'Cook quinoa as per package instructions.',
          'Mix all ingredients in a bowl.',
          'Drizzle with tahini and lemon juice.',
          'Serve fresh.',
        ],
      },
    });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful nutritionist and recipe generator. Output recipes as JSON with fields: name, category, calories, ingredients (array), instructions (array).' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });
    const data = await openaiRes.json();
    // Try to parse the recipe from the response
    const text = data.choices?.[0]?.message?.content || '';
    let recipe;
    try {
      recipe = JSON.parse(text);
    } catch {
      recipe = { name: 'AI Recipe', category: '', calories: '', ingredients: [], instructions: [text] };
    }
    return NextResponse.json({ recipe });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate recipe.' }, { status: 500 });
  }
} 