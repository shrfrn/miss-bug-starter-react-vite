import { useState, useRef, useEffect } from 'react'
import { eventBusService } from '../services/event-bus.service.js'

export function UserMsg() {
	const [msg, setMsg] = useState(null)
	const timeoutIdRef = useRef()

	useEffect(() => {
		const unsubscribe = eventBusService.on('show-user-msg', msg => {
            if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
			}
            setMsg(msg)
			timeoutIdRef.current = setTimeout(closeMsg, 3000)
		})
		return unsubscribe
	}, [])

    function classList() {
        const classList = ['user-msg']

        if (msg) classList.push('msg-visible', msg.type)
        return classList.join(' ')
    }

	function closeMsg() {
		setMsg(null)
	}

	return <section className={classList()}>
        <button onClick={closeMsg}>x</button>
        <p>{msg && msg.txt}</p>
    </section>
}