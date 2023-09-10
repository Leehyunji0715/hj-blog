export default function A({ href }: { href?: string }) {
    return <a href={href} target="__blank">{href}</a>
}