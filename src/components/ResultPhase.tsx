import type { Card } from '../types/card'
import GameCard from './GameCard'

type ResultPhaseProps = {
	nouns: Card[]
	leaderAdjectives: Card[]
	playerAdjectives: Card[]
	leaderOrder: number[]
	playerOrder: number[]
	onNextRound: () => void
}

export default function ResultPhase({
	nouns,
	leaderAdjectives,
	playerAdjectives,
	leaderOrder,
	playerOrder,
	onNextRound,
}: ResultPhaseProps) {
	// Подсчёт правильных ответов
	const correctMatches = leaderOrder.reduce((acc, leaderPos, index) => {
		return acc + (leaderPos === playerOrder[index] ? 1 : 0)
	}, 0)

	return (
		<div className="text-center">
			<h2 className="text-2xl font-bold mb-6">Результаты раунда</h2>
			<div className="mb-8">
				<p className="text-xl">
					Правильных совпадений: <span className="font-bold">{correctMatches} из 5</span>
				</p>
			</div>

			<div className="flex justify-center gap-8 mb-10">
				{nouns.map((noun, index) => {
					const leaderAdj = {
						...leaderAdjectives[leaderOrder[index]],
						isOpen: true, // Принудительно открываем
					}
					const playerAdj = {
						...playerAdjectives[playerOrder[index]],
						isOpen: true, // Принудительно открываем
					}
					const isCorrect = leaderOrder[index] === playerOrder[index]

					return (
						<div key={noun.id} className="flex flex-col items-center gap-4">
							<GameCard card={noun} />
							<div className="relative">
								<GameCard card={{ ...leaderAdj }} />
								<div
									className={`absolute -right-3 -top-3 w-6 h-6 rounded-full flex items-center justify-center text-white ${
										isCorrect ? 'bg-green-500' : 'bg-red-500'
									}`}>
									{isCorrect ? '✓' : '✗'}
								</div>
							</div>
							<div className="text-sm">
								Ваш выбор: <span className="font-medium">{playerAdj.word}</span>
							</div>
						</div>
					)
				})}
			</div>

			<button
				onClick={onNextRound}
				className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
				Следующий раунд
			</button>
		</div>
	)
}
