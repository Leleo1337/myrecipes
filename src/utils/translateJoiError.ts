export function translateJoiError(type: string, field: string, limit?: number) {
	const messages: Record<string, string> = {
		'string.empty': `O campo ${field} é obrigatório.`,
		'string.email': `O campo ${field} deve ser um e-mail válido.`,
		'string.min': `O campo ${field} deve ter ao menos ${limit} caracteres`,
		'string.uri': `O campo ${field} deve ser um link valido`,
	};

	return messages[type] || 'Erro desconhecido';
}
