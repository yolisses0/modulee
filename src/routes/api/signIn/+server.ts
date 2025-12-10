import { createSession } from '$lib/session/createSession';
import { generateSessionToken } from '$lib/session/generateSessionToken';
import { setSessionTokenCookie } from '$lib/session/setSessionTokenCookie';
import { getSession } from '$lib/user/getSession';
import { signIn } from '$lib/user/signIn';
import { type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
	// Get credential or code
	const { credential, code } = await request.json();
	if (!code && !credential) {
		throw new Error('Missing code or credential');
	}

	const currentSession = getSession(locals);

	// Get user data
	const userData = await signIn({
		code,
		credential,
		currentUserId: currentSession.userId,
	});

	// Set session
	const token = generateSessionToken();
	const session = await createSession(token, userData.id);
	setSessionTokenCookie(cookies, token, session.expiresAt);

	// Return user data
	return json(userData);
};
