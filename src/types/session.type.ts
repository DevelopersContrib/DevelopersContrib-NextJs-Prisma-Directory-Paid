type SessionType = {
	user: {
		name: string;
		email: string;
		userId: string;
		isAdmin: boolean;
	};
} | null;

export default SessionType;
