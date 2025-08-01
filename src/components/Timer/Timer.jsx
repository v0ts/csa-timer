import { useEffect, useRef, useState } from 'react'
import style from './Timer.module.scss'
import { ToastContainer, toast, Zoom, CloseButton } from 'react-toastify'
import timerSound from '../../sounds/timer.mp3'
import { useSound } from 'react-sounds'

export const Timer = () => {
	const { play } = useSound(timerSound)

	const [level, setLevel] = useState('')

	const [setup, setSetup] = useState(0)
	const [time, setTime] = useState(0)

	const [setupView, setSetupView] = useState('00:00')
	const [timeView, setTimeView] = useState('00:00')

	const [isSetupStart, setIsSetupStart] = useState(false)
	const [isSetupFinished, setIsSetupFinished] = useState(false)
	const [isTimeStart, setIsTimeStart] = useState(false)
	const [isFinished, setIsFinished] = useState(false)
	const [isCutted, setIsCutted] = useState(false)

	const setupCopyRef = useRef(null)
	const timeCopyRef = useRef(null)

	useEffect(() => {
		if (level === 'L4') {
			setTime(60 * 10)
		} else if (level === 'L3') {
			setTime(60 * 8)
		} else if (level === 'L2') {
			setTime(60 * 6)
		} else if (level === 'L1') {
			setTime(60 * 5)
		} else {
			setTime(0)
		}
	}, [level])

	useEffect(() => {
		if (isSetupStart) {
			const interval = setInterval(() => {
				setSetup(prev => prev + 1)
			}, 1000)

			const setupMinutes = Math.floor(setup / 60)
			const setupSeconds = setup % 60

			let outputSeconds = setupSeconds.toString()
			let outputMinutes = setupMinutes.toString()

			if (setupSeconds < 10) {
				outputSeconds = '0' + outputSeconds
			}
			if (setupMinutes < 10) {
				outputMinutes = '0' + outputMinutes
			}

			setSetupView(`${outputMinutes}:${outputSeconds}`)

			return () => clearInterval(interval)
		}
	}, [setup])

	useEffect(() => {
		if (isCutted) {
			const timeMinutes = Math.floor(time / 60)
			const timeSeconds = time - timeMinutes * 60

			let outputSeconds = timeSeconds.toString()
			let outputMinutes = timeMinutes.toString()

			if (timeSeconds < 10) {
				outputSeconds = '0' + outputSeconds
			}
			if (timeMinutes < 10) {
				outputMinutes = '0' + outputMinutes
			}

			setTimeView(`${outputMinutes}:${outputSeconds}`)
			return
		}

		if (time === 1) {
			setIsTimeStart(false)
			setIsFinished(true)
			play()
			setTimeout(() => {
				play()
				setTimeout(() => {
					play()
				}, 1000);
			}, 1000);
		}

		let interval
		if (isTimeStart) {
			interval = setInterval(() => {
				setTime(prev => prev - 1)
			}, 1000)
		}
		const timeMinutes = Math.floor(time / 60)
		const timeSeconds = time - timeMinutes * 60

		let outputSeconds = timeSeconds.toString()
		let outputMinutes = timeMinutes.toString()

		if (timeSeconds < 10) {
			outputSeconds = '0' + outputSeconds
		}
		if (timeMinutes < 10) {
			outputMinutes = '0' + outputMinutes
		}

		setTimeView(`${outputMinutes}:${outputSeconds}`)

		if (interval) {
			return () => clearInterval(interval)
		}
	}, [time])

	const runningCheck = () => {
		let output = false

		if (isSetupStart || isSetupFinished || isTimeStart || isFinished) {
			output = true
		} else {
			output = false
		}

		return output
	}

	const l4ClickHandle = () => {
		if (runningCheck()) {
			return toast.error(
				'You cant select another level. Reset previous one first',
				{
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'dark',
					transition: Zoom,
				}
			)
		}
		const l4Notify = () =>
			toast.info('L4 Selected', {
				position: 'top-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: 'dark',
				transition: Zoom,
			})
		l4Notify()

		setLevel('L4')
	}

	const l3ClickHandle = () => {
		if (runningCheck()) {
			return toast.error(
				'You cant select another level. Reset previous one first',
				{
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'dark',
					transition: Zoom,
				}
			)
		}
		const l3Notify = () =>
			toast.info('L3 Selected', {
				position: 'top-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: 'dark',
				transition: Zoom,
			})
		l3Notify()

		setLevel('L3')
	}

	const l2ClickHandle = () => {
		if (runningCheck()) {
			return toast.error(
				'You cant select another level. Reset previous one first',
				{
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'dark',
					transition: Zoom,
				}
			)
		}
		const l2Notify = () =>
			toast.info('L2 Selected', {
				position: 'top-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: 'dark',
				transition: Zoom,
			})
		l2Notify()

		setLevel('L2')
	}

	const l1ClickHandle = () => {
		if (runningCheck()) {
			return toast.error(
				'You cant select another level. Reset previous one first',
				{
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'dark',
					transition: Zoom,
				}
			)
		}
		const l1Notify = () =>
			toast.info('L1 Selected', {
				position: 'top-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: 'dark',
				transition: Zoom,
			})
		l1Notify()

		setLevel('L1')
	}

	const startSetupHandle = () => {
		if (time === 0) {
			const notify = () =>
				toast.error('Select level before starting timer', {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'dark',
					transition: Zoom,
				})

			return notify()
		}
		setIsSetupStart(true)
		setSetup(prev => prev + 1)
	}

	const endSetupHandle = () => {
		setIsSetupStart(false)
		setIsSetupFinished(true)
		setIsTimeStart(true)
		setTime(prev => prev - 1)
	}

	const resetHandle = () => {
		if (level === 'L4') {
			setTime(60 * 10)
		} else if (level === 'L3') {
			setTime(60 * 8)
		} else if (level === 'L2') {
			setTime(60 * 6)
		} else if (level === 'L1') {
			setTime(60 * 5)
		} else {
			setTime(0)
		}

		setSetup(0)
		setSetupView('00:00')
		setIsSetupStart(false)
		setIsSetupFinished(false)
		setIsTimeStart(false)
		setIsFinished(false)
		setIsCutted(false)

		const notify = () =>
			toast.success('Reset successfully', {
				position: 'top-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				theme: 'dark',
				transition: Zoom,
			})

		notify()
	}

	const cutoffHandle = () => {
		setIsCutted(true)
		setIsTimeStart(false)
		const currentTime = time
		let allTime = 0
		if (level === 'L4') {
			allTime = 60 * 10
		} else if (level === 'L3') {
			allTime = 60 * 8
		} else if (level === 'L2') {
			allTime = 60 * 6
		} else if (level === 'L1') {
			allTime = 60 * 5
		} else {
			allTime = 0
		}
		setTime(allTime - currentTime)
	}

	const copySetup = async () => {
		if (!setupCopyRef.current) {
			console.error('Nothing to copy')
			const notify = () =>
				toast.error('Nothing to copy', {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					theme: 'dark',
					transition: Zoom,
				})
			notify()
		}

		try {
			await navigator.clipboard.writeText(
				`00:${setupCopyRef.current.innerText}`
			)
			const notify = () =>
				toast.success('Copied successfully', {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					theme: 'dark',
					transition: Zoom,
				})
			notify()
		} catch (error) {
			console.error('Failed to copy', error)
			const notify = () =>
				toast.error("Can't copy the value", {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					theme: 'dark',
					transition: Zoom,
				})
			notify()
		}
	}

	const copytime = async () => {
		if (!setupCopyRef.current) {
			console.error('Nothing to copy')
			const notify = () =>
				toast.error('Nothing to copy', {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					theme: 'dark',
					transition: Zoom,
				})
			notify()
		}

		try {
			await navigator.clipboard.writeText(`00:${timeCopyRef.current.innerText}`)
			const notify = () =>
				toast.success('Copied successfully', {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					theme: 'dark',
					transition: Zoom,
				})
			notify()
		} catch (error) {
			console.error('Failed to copy', error)
			const notify = () =>
				toast.error("Can't copy the value", {
					position: 'top-right',
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					theme: 'dark',
					transition: Zoom,
				})
			notify()
		}
	}

	return (
		<>
			<section className={style.timer}>
				<ul className={style.levels}>
					<li className={style.levelItem}>
						<input
							type='radio'
							name='level'
							id='L4'
							className={style.small}
							onChange={l4ClickHandle}
						/>
						<label htmlFor='level' className={style.levelLabel}>
							L4
						</label>
						<p className={style.levelName}>
							<span className={style.levelValue}>10 </span>
							minutes
						</p>
						<p className={style.levelDescription}>2 minutes for setup</p>
					</li>
					<li className={style.levelItem}>
						<input
							type='radio'
							name='level'
							id='L3'
							className={style.small}
							onChange={l3ClickHandle}
						/>
						<label htmlFor='level' className={style.levelLabel}>
							L3
						</label>
						<p className={style.levelName}>
							<span className={style.levelValue}>8 </span>
							minutes
						</p>
						<p className={style.levelDescription}>2 minutes for setup</p>
					</li>
					<li className={style.levelItem}>
						<input
							type='radio'
							name='level'
							id='L2'
							className={style.small}
							onChange={l2ClickHandle}
						/>
						<label htmlFor='level' className={style.levelLabel}>
							L2
						</label>
						<p className={style.levelName}>
							<span className={style.levelValue}>6 </span>
							minutes
						</p>
						<p className={style.levelDescription}>3 minutes for setup</p>
					</li>
					<li className={style.levelItem}>
						<input
							type='radio'
							name='level'
							id='L1'
							className={style.small}
							onChange={l1ClickHandle}
						/>
						<label htmlFor='level' className={style.levelLabel}>
							L1
						</label>
						<p className={style.levelName}>
							<span className={style.levelValue}>5 </span>
							minutes
						</p>
						<p className={style.levelDescription}>2 minutes for setup</p>
					</li>
				</ul>
				<div className={style.timers}>
					<div className={style.setup}>
						<p
							ref={setupCopyRef}
							className={style.setupText}
							onClick={copySetup}
						>
							{setupView}
						</p>
						{isSetupStart ? (
							<button
								className={style.setupButton}
								type='button'
								onClick={endSetupHandle}
							>
								End setup
							</button>
						) : isSetupFinished ? (
							<button
								className={style.setupButton}
								type='button'
								onClick={resetHandle}
							>
								Reset
							</button>
						) : (
							<button
								className={style.setupButton}
								type='button'
								onClick={startSetupHandle}
							>
								Start setup
							</button>
						)}
					</div>
					<div className={style.setup}>
						<p ref={timeCopyRef} className={style.setupText} onClick={copytime}>
							{timeView}
						</p>
						{isTimeStart ? (
							<button
								className={style.setupButton}
								type='button'
								onClick={cutoffHandle}
							>
								Cut off
							</button>
						) : (
							<button
								className={style.setupButton}
								type='button'
								onClick={resetHandle}
							>
								Reset
							</button>
						)}
					</div>
				</div>
			</section>
			<ToastContainer
				position='top-right'
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				theme='dark'
				transition={Zoom}
			/>
		</>
	)
}
