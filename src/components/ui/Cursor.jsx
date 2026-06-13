import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e) => {
      cursor.style.transform = `
        translate(${e.clientX}px, ${e.clientY}px)
        translate(-50%, -50%)
      `
    }

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        cursor.classList.add('hovering')
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        cursor.classList.remove('hovering')
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <div ref={cursorRef} className="cursor">
      J
    </div>
  )
}