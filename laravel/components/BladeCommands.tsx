import type { ComponentChildren } from "preact";
import { bladeVar } from "../blade/helpers";

export function BladeIf({value, children}: {value: string, children: ComponentChildren}) {
    return <> @if ({value}) {children} @endif </>
}

export function BladeIfElse({value, children}: {value: string, children: ComponentChildren}) {
    return <>@if ({value}) {children[0]} @else {children[1]} @endif</>
}


export function BladeForeach({value, children}: {value: string, testTimes?: number, children: ComponentChildren}) {
    return <>@foreach ({value})
        {children}
        @endforeach
    </>
}


export function BladeLinkTo({value, className}: {value: string, className?: string}) {
    return <a href={bladeVar(`${value}->url`)} className={className}>{bladeVar(`${value}->name`)}</a>
}
