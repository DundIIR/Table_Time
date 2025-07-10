import { useState } from 'react'
import Phase from '../components/Phase'
import ResultPhase from '../components/ResultPhase'
import SettingsPanel from '../components/SettingsPanel'
import { getWords } from '../services/wordService'

type GamePhase = 'setup' | 'leader' | 'player' | 'result' | 'finished'

export default function Combinations() {
	const [phase, setPhase] = useState<GamePhase>('setup')
	const [round, setRound] = useState(1)
	const [score, setScore] = useState(0)
	const [totalRounds, setTotalRounds] = useState(8)
	const [wordsPerRound, setWordsPerRound] = useState(5)
	const [showSettings, setShowSettings] = useState(false)

	const [leaderPairs, setLeaderPairs] = useState<[string, string][]>([])
	const [playerPairs, setPlayerPairs] = useState<[string, string][]>([])
	const [shuffledNouns, setShuffledNouns] = useState<string[]>([])
	const [shuffledAdjectives, setShuffledAdjectives] = useState<string[]>([])
	let nouns: string[] = []
	let adjectives: string[] = []

	const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5)

	const startNewRound = () => {
		setLeaderPairs([])
		setPlayerPairs([])
		const data = getWords(wordsPerRound)
		nouns = data.nouns
		adjectives = data.adjectives
		setShuffledNouns(shuffle(nouns))
		setShuffledAdjectives(shuffle(adjectives))
		setPhase('leader')
	}

	const handlePhaseSubmit = (pairs: [string, string][]) => {
		if (phase === 'leader') {
			setLeaderPairs(pairs)
			setShuffledNouns(prev => shuffle(prev))
			setShuffledAdjectives(prev => shuffle(prev))
			setPhase('player')
		} else if (phase === 'player') {
			setPlayerPairs(pairs)
			setPhase('result')
		}
	}

	const handleNextRound = () => {
		const correct = leaderPairs.filter(([noun, adj]) => playerPairs.some(([pn, pa]) => pn === noun && pa === adj)).length

		setScore(prev => prev + correct)

		if (round < totalRounds) {
			setRound(prev => prev + 1)
			startNewRound()
		} else {
			setPhase('finished')
		}
	}

	return (
		<div className="h-screen bg-gray-50 p-6 overflow-hidden">
			<div className="container mx-auto">
				<header className="mb-8 flex justify-between items-center">
					<h1 className="w-80 text-3xl font-bold text-center text-gray-800" onClick={() => setPhase('setup')}>
						Угадай сочетание
					</h1>
					<h2 className="w-80 text-3xl font-bold text-center text-gray-800" onClick={() => setPhase('setup')}>
						{phase === 'leader'
							? 'Фаза ведущего'
							: phase === 'player'
							? 'Фаза игроков'
							: phase === 'result'
							? 'Результаты раунда'
							: ''}
					</h2>

					{phase !== 'setup' && phase !== 'finished' && (
						<div className="flex flex-col">
							<p className="w-80 text-center text-lg mt-2 text-gray-800">
								Раунд: <span className="font-bold">{round}</span> / {totalRounds}
							</p>
							<p className="w-80 text-center text-lg mt-2 text-gray-800">
								Счёт: <span className="font-bold">{score}</span> / {Math.ceil(totalRounds * wordsPerRound * 0.6)}
							</p>
						</div>
					)}
				</header>

				<main className="max-w-4xl mx-auto">
					{phase === 'leader' && <Phase nouns={shuffledNouns} adjectives={shuffledAdjectives} onSubmit={handlePhaseSubmit} />}

					{phase === 'player' && <Phase nouns={shuffledNouns} adjectives={shuffledAdjectives} onSubmit={handlePhaseSubmit} />}

					{phase === 'result' && (
						<ResultPhase leaderPairs={leaderPairs} playerPairs={playerPairs} onNextRound={handleNextRound} />
					)}

					{phase === 'finished' && (
						<div className="text-center mt-10">
							<h2 className="text-3xl font-bold mb-4">Игра окончена!</h2>
							<p className="text-xl">
								Итоговый счёт: {score} / {Math.ceil(totalRounds * wordsPerRound * 0.6)}
							</p>
							<p className="text-xl font-semibold mt-2">
								{score >= Math.ceil(totalRounds * wordsPerRound * 0.6) ? 'Поздравляем! Вы победили 🎉' : 'Увы, вы проиграли 😢'}
							</p>
							<button
								onClick={() => {
									setScore(0)
									setRound(1)
									setPhase('setup')
								}}
								className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
								Сыграть снова
							</button>
						</div>
					)}

					{phase === 'setup' && (
						<div className="text-center flex flex-col items-center gap-4">
							{!showSettings && (
								<>
									<button
										onClick={() => {
											setRound(1)
											setScore(0)
											startNewRound()
										}}
										className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 w-70 rounded-lg text-lg transition-colors">
										Начать игру
									</button>
									<button
										onClick={() => setShowSettings(true)}
										className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-8 w-70 rounded-lg text-lg transition-colors">
										Настройки
									</button>
								</>
							)}

							{showSettings && (
								<SettingsPanel
									totalRounds={totalRounds}
									setTotalRounds={setTotalRounds}
									wordsPerRound={wordsPerRound}
									setWordsPerRound={setWordsPerRound}
									onClose={() => setShowSettings(false)}
								/>
							)}
						</div>
					)}
				</main>
			</div>
		</div>
	)
}
