export type Card = {
	id: string
	word: string
	column: 'adjectives' | 'matches' | 'nouns' // В какой колонке находится
	position?: number // Позиция в колонке
}
