import { useState } from 'react'
import type { Card } from './types/card'
import type { GamePhase } from './types/game'
import LeaderPhase from './components/LeaderPhase'
import PlayerPhase from './components/PlayerPhase'
import ResultPhase from './components/ResultPhase'

const nouns = ['Кот', 'Дом', 'Солнце', 'Яблоко', 'Книга']
const adjectives = ['Красный', 'Быстрый', 'Красивый', 'Громкий', 'Мягкий']

function App() {
	const [phase, setPhase] = useState<GamePhase>('setup')
	const [nounsCards, setNounsCards] = useState<Card[]>([])
	const [adjectivesCards, setAdjectivesCards] = useState<Card[]>([])
	const [score, setScore] = useState(0)

	const [leaderOrder, setLeaderOrder] = useState<Card[]>([])
	const [playerOrder, setPlayerOrder] = useState<Card[]>([])

	const startNewRound = () => {
		// Существительные
		const newNouns = nouns.map(
			(word, i): Card => ({
				id: `noun_${i}`,
				word,
				column: 'nouns',
			}),
		)

		// Прилагательные
		const shuffledAdjectives = adjectives
			.sort(() => Math.random() - 0.5)
			.map(
				(word, i): Card => ({
					id: `adjective_${i}}`,
					word,
					column: 'adjectives',
				}),
			)

		setNounsCards(newNouns)
		setAdjectivesCards(shuffledAdjectives)
		setLeaderOrder([])
		setPlayerOrder([])
		setPhase('leader')
	}

	const handleLeaderSubmit = (matches: Card[]) => {
		setLeaderOrder(matches)
		setPhase('player')
	}

	const handlePlayerSubmit = (matches: Card[]) => {
		setPlayerOrder(matches)
		setPhase('result')
	}

	return (
		<div className="h-screen bg-gray-50 p-6 overflow-hidden">
			<div className="container mx-auto">
				<header className="mb-8 flex  justify-between">
					<h1 className="w-80 text-3xl font-bold text-center text-gray-800">Угадай сочетание</h1>
					<h2 className="text-2xl font-bold mb-6 text-gray-800">Фаза ведущего</h2>
					{phase !== 'setup' && (
						<p className="w-80 text-center text-lg mt-2 text-gray-800">
							Счёт: <span className="font-bold">{score}</span>
						</p>
					)}
				</header>

				<main className="max-w-4xl mx-auto">
					{phase === 'setup' && (
						<div className="text-center flex flex-col items-center gap-4">
							<button
								onClick={startNewRound}
								className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 w-70 rounded-lg text-lg transition-colors">
								Онлайн
							</button>
							<button
								onClick={startNewRound}
								className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 w-70 rounded-lg text-lg transition-colors">
								Оффлайн
							</button>
							<button
								onClick={startNewRound}
								className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 w-70 rounded-lg text-lg transition-colors">
								Настройки
							</button>
						</div>
					)}

					{phase === 'leader' && <LeaderPhase nouns={nounsCards} adjectives={adjectivesCards} onSubmit={handleLeaderSubmit} />}

					{/* {phase === 'player' && <PlayerPhase nouns={nounsCards} adjectives={adjectivesCards} onSubmit={handlePlayerSubmit} />} */}

					{/* {phase === 'result' && (
					<ResultPhase
						nouns={nounsCards}
						leaderAdjectives={adjectivesCards}
						playerAdjectives={adjectivesCards}
						leaderOrder={leaderOrder}
						playerOrder={playerOrder}
						onNextRound={() => {
							const newScore = leaderOrder.reduce((acc, pos, i) => acc + (pos === playerOrder[i] ? 1 : 0), 0)
							setScore(score + newScore)
							startNewRound()
						}}
					/>
				)} */}
				</main>
			</div>
		</div>
	)
}

export default App
