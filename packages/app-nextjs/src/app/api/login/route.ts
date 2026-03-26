import { NextRequest, NextResponse } from 'next/server';
import {
  loginUseCase,
  loginPresenter,
  getAllUsersUseCase,
  getAllUsersPresenter,
} from '@/di/container';

export async function GET() {
  const result = await getAllUsersUseCase.execute();
  const users = result.isOk ? getAllUsersPresenter.present(result.value) : [];
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  const result = await loginUseCase.execute({ userId });

  if (result.isErr) {
    return NextResponse.json({ error: result.error.message }, { status: 404 });
  }

  return NextResponse.json(loginPresenter.present(result.value));
}
