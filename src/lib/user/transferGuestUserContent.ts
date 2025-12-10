import prisma from '$lib/prisma';

type Params = {
	guestUserId: string;
	newUserId: string;
};

export async function transferGuestUserContent({ guestUserId, newUserId }: Params) {
	const guestUser = await prisma.user.findUniqueOrThrow({ where: { id: guestUserId } });
	if (!guestUser.isGuest) {
		throw new Error('Provided guestUserId does not belong to a guest user');
	}

	const data = { userId: newUserId };
	const where = { userId: guestUserId };
	await Promise.all([
		prisma.externalModule.updateMany({ where, data }),
		prisma.like.updateMany({ where, data }),
		prisma.project.updateMany({ where, data }),
	]);
}
