import { adjectivesList, nounsList } from './words'

function getRandomSample(arr: string[], count: number): string[] {
	const result: string[] = []
	const used = new Set<number>()

	while (result.length < count && used.size < arr.length) {
		const index = Math.floor(Math.random() * arr.length)
		if (!used.has(index)) {
			used.add(index)
			result.push(arr[index])
		}
	}

	return result
}

export function getWords(wordsPerRound: number): {
	nouns: string[]
	adjectives: string[]
} {
	const nouns = getRandomSample(nounsList, wordsPerRound)
	const adjectives = getRandomSample(adjectivesList, wordsPerRound)
	return { nouns, adjectives }
}
