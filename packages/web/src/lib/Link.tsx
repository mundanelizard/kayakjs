import React, { AnchorHTMLAttributes, ReactChild, ReactChildren } from 'react'
import { useRouter } from './hooks'

interface LinkProps extends AnchorHTMLAttributes<any> {
  to: string
  children: ReactChild | ReactChildren | ReactChild[]
}

/**
 * Wraps the <a> tag and helps helper with local animation.
 * @param param0
 * @returns
 */
function Link({ to, children, onClick = () => {}, ...otherProps }: LinkProps) {
  const { push } = useRouter()

  function handleClick(e: any) {
    e.preventDefault()
    let shouldPush = true

    e.preventDefault = () => (shouldPush = false)

    const res: any = onClick(e)

    // Wait for the response if the onclick is a promise,
    // call push immediately if the response is a boolean
    if (typeof res == 'boolean' && res) {
      return push(to)
    } else if (res instanceof Promise) {
      return res
        .then(s => typeof s == "boolean" && s && push(to))
        .catch(err => console.error('@kayakjs/web', err))
    }

    if (shouldPush) {
      push(to)
    }
  }

  // todo => remove this once later
  // function handleClick(e: any) {
  //   e.preventDefault()
  //   onClick(e)
  //   push(to)
  // }

  return (
    <a {...otherProps} href={to} onClick={handleClick}>
      {children}
    </a>
  )
}

export default Link
