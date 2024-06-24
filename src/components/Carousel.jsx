import '../styles/carousel.scss'
import { createSignal, onMount } from 'solid-js'

export default function Carousel(props) {
    const { entries } = props
    if (!Array.isArray(entries)) throw new Error('Expected an entries array')
    const [position, setPosition] = createSignal(0)
    onMount(() => {
        setPosition(0)
    })
    const goLeft = function () {
        const length = entries.length
        if (!isFinite(length)) throw new Error('Missing length')
        setPosition((position() - 1 + length) % length)
    }
    const goRight = function () {
        const length = entries.length
        if (!isFinite(length)) throw new Error('Missing length')
        setPosition((position() + 1) % length)
    }
    return (
        <div class="carousel">
            <div class="inner" innerHTML={entries[position()]} />
            <img
                class="left"
                alt="left"
                onClick={goLeft}
                src="/img/right-arrow.svg"
            />
            <img
                class="right"
                alt="right"
                onClick={goRight}
                src="/img/right-arrow.svg"
            />
        </div>
    )
}
