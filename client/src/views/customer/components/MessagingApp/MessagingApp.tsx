import React from 'react'

export const MessagingApp: (props: {
    onClick: () => void
    customerId: string
}) => JSX.Element = (props) => {
    return (
        <>
            <p>
                Hi {props.customerId}, I am message, click my{' '}
                <span onClick={props.onClick}>link</span>
            </p>
        </>
    )
}
