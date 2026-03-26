import { NextRequest, NextResponse } from 'next/server';
import { addToCartUseCase, addToCartPresenter } from '@/di/container';

export async function POST(request: NextRequest) {
  const { articleId, currentItems } = await request.json();

  const result = await addToCartUseCase.execute({
    newItem: { articleId, quantity: 1 },
    currentItems,
  });

  if (result.isErr) {
    return NextResponse.json({ error: result.error.message }, { status: 404 });
  }

  return NextResponse.json(addToCartPresenter.present(result.value));
}
