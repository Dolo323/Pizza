import { redirect } from 'next/navigation';
import { getUserSession } from '../../../shared/lib/get-user-session';
import { prisma } from '../../../prisma/prisma-client';
import { ProfileForm } from '../../../shared/components';

export default async function ProfilePage() {
  const session = await getUserSession();

  // Проверяем наличие сессии И id внутри сессии
  if (!session || !session.id) {
    return redirect('/not-auth');
  }

  // Теперь безопасно используем session.id, так как проверили его наличие выше
  const user = await prisma.user.findFirst({ 
    where: { id: Number(session.id) } 
  });

  if (!user) {
    return redirect('/not-auth');
  }

  return <ProfileForm data={user} />;
}
